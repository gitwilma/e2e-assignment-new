"use client";

import { useState } from "react";

type ClassOption = { id: string; name: string; disabled?: boolean };
type Props = {
  classes: ClassOption[];
  action: (formData: FormData) => void; // server action
};

export default function BookingForm({ classes, action }: Props) {
  const [classId, setClassId] = useState("");
  const [name, setName] = useState("");

  const isValid = classId !== "" && name.trim().length >= 2;

  return (
    <form action={action} className="space-y-6 flex flex-col items-center">
      <label className="block w-full max-w-sm mx-auto">
        <select
          name="classId"
          data-cy="class-select"
          className="w-full rounded-xl border p-3
                     bg-transparent text-center transition
                     hover:bg-white/10 hover:shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-white/30"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        >
          <option value="">Choose a class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id} disabled={c.disabled}>
              {c.name}
              {c.disabled ? " (Fully booked)" : ""}
            </option>
          ))}
        </select>
      </label>

      {/* same wrapper + centered input/placeholder */}
      <label className="block w-full max-w-sm mx-auto">
        <input
          name="name"
          data-cy="name-input"
          className="w-full rounded-xl border p-3
                     bg-transparent text-center
                     placeholder:text-center placeholder:opacity-70
                     focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      {/* put the button in the same width wrapper so it lines up */}
      <div className="block w-full max-w-sm mx-auto">
        <button
          data-cy="submit-booking"
          className="w-full rounded-xl border p-3
                     transition will-change-transform
                     hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5
                     focus:outline-none focus:ring-2 focus:ring-white/30
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:shadow-none disabled:hover:translate-y-0"
          disabled={!isValid}
        >
          Book
        </button>
      </div>
    </form>
  );
}
