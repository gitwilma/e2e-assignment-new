import { db } from "@/prisma/db";
import { createBooking } from "./actions";
import BookingForm from "./booking-form";

export default async function Home() {
  const classes = await db.pilatesClass.findMany({
    orderBy: { startsAt: "asc" },
  });
  const bookings = await db.booking.findMany();
  const bookedIds = new Set(bookings.map((b) => b.classId));

  const options = classes.map((c) => ({
    id: c.id,
    name: c.name,
    disabled: bookedIds.has(c.id),
  }));

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Studio Pilates Co</h1>

      <BookingForm classes={options} action={createBooking} />

      {bookings.length > 0 && (
        <div data-cy="booking-success" className="mt-4">
          Senaste bokning: {bookings[bookings.length - 1].name}
        </div>
      )}
    </main>
  );
}
