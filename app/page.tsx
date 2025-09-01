import { db } from "@/prisma/db";

export default async function Home() {
  const classes = await db.pilatesClass.findMany({
    orderBy: { startsAt: "asc" },
  });
  const booked = await db.booking.findMany();
  const bookedIds = new Set(booked.map((b) => b.classId));

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Studio Pilates Co</h1>

      <form className="space-y-2">
        <label className="block">
          Class
          <select
            name="classId"
            data-cy="class-select"
            className="border p-2 ml-2"
          >
            <option value="">Choose a class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id} disabled={bookedIds.has(c.id)}>
                {c.name}
                {bookedIds.has(c.id) ? " (Fully booked)" : ""}
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
      {booked.length > 0 && (
        <div data-cy="booking-success" className="mt-4">
          Senaste bokning: {booked[booked.length - 1].name}
        </div>
      )}
    </main>
  );
}
