import { prisma } from "@/lib/prisma";
import { deleteContactMessage, markContactMessageRead } from "./actions";
import { AdminSearchBox } from "@/components/admin/AdminSearchBox";

export default async function AdminContactPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold">Contact messages</h1>
      <p className="mt-1 text-sm text-(--color-muted)">
        Submissions from the public /contact form.
      </p>

      <AdminSearchBox scope="contact" placeholder="Search messages..." />

      <div className="mt-4 space-y-3" data-search-scope="contact">
        {messages.length === 0 && (
          <p className="text-sm text-(--color-muted)">No messages yet.</p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            data-search-row
            className={`rounded-2xl border p-4 ${
              m.read ? "border-(--color-border)" : "border-(--color-primary) bg-(--color-primary)/5"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">
                  {m.name} <span className="font-normal text-(--color-muted)">— {m.email}</span>
                </p>
                <p className="mt-1 text-xs text-(--color-muted)">
                  {m.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
              <div className="flex shrink-0 gap-3 text-sm">
                {!m.read && (
                  <form action={markContactMessageRead.bind(null, m.id)}>
                    <button type="submit" className="text-(--color-primary) hover:underline">
                      Mark read
                    </button>
                  </form>
                )}
                <form action={deleteContactMessage.bind(null, m.id)}>
                  <button type="submit" className="text-red-500 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-3 text-sm">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
