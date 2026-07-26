import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getRazorpayClient } from "@/lib/razorpay";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { courseIds } = (await request.json()) as { courseIds: string[] };
  if (!Array.isArray(courseIds) || courseIds.length === 0) {
    return NextResponse.json({ error: "No courses in cart" }, { status: 400 });
  }

  const courses = await prisma.course.findMany({
    where: { id: { in: courseIds }, published: true },
  });
  if (courses.length !== courseIds.length) {
    return NextResponse.json({ error: "Some courses are no longer available" }, { status: 400 });
  }

  const alreadyEnrolled = await prisma.enrollment.findMany({
    where: { userId: session.user.id, courseId: { in: courseIds } },
  });
  if (alreadyEnrolled.length > 0) {
    return NextResponse.json({ error: "You're already enrolled in one of these courses" }, { status: 400 });
  }

  const totalAmount = courses.reduce((sum, c) => sum + c.price, 0);

  const razorpay = getRazorpayClient();
  if (!razorpay) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env." },
      { status: 503 }
    );
  }

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      totalAmount,
      status: "PENDING",
      items: {
        create: courses.map((c) => ({ courseId: c.id, price: c.price })),
      },
    },
  });

  const razorpayOrder = await razorpay.orders.create({
    amount: totalAmount,
    currency: "INR",
    receipt: order.id,
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { razorpayOrderId: razorpayOrder.id },
  });

  return NextResponse.json({
    orderId: order.id,
    razorpayOrderId: razorpayOrder.id,
    amount: totalAmount,
    currency: "INR",
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
