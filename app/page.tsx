import { db } from "@/prisma/db";

export default async function Home() {
  const classes = await db.pilatesClass.findMany({
    orderBy: { startsAt: "asc" },
  });

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Studio Pilates Co</h1>

      <form className="space-y-2">
        <label className="block">
          Class
          <select data-cy="class-select" className="border p-2 ml-2">
            <option value="">Choose your class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Name
          <input
            data-cy="name-input"
            className="border p-2 ml-2"
            placeholder="Your name"
          />
        </label>

        <button
          disabled
          data-cy="submit-booking"
          className="border px-3 py-1 rounded"
        >
          Book
        </button>
      </form>
    </main>
  );
}
