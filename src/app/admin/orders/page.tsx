import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/format";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: true, items: { include: { course: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-(--color-border)">
        <table className="w-full text-left text-sm">
          <thead className="bg-(--color-surface) text-xs uppercase text-(--color-muted)">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Courses</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-(--color-border)">
                <td className="px-4 py-3 text-(--color-muted)">
                  {o.createdAt.toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3">{o.user.email}</td>
                <td className="px-4 py-3">{o.items.map((i) => i.course.title).join(", ")}</td>
                <td className="px-4 py-3">{formatINR(o.totalAmount)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      o.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : o.status === "FAILED"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-6 text-center text-(--color-muted)">No orders yet.</p>}
      </div>
    </div>
  );
}
