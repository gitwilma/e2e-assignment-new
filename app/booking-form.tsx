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
    <form action={action} className="space-y-2">
      <label className="block">
        Class
        <select
          name="classId"
          data-cy="class-select"
          className="border p-2 ml-2"
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

      <label className="block">
        Name
        <input
          name="name"
          data-cy="name-input"
          className="border p-2 ml-2"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <button
        data-cy="submit-booking"
        className="border px-3 py-1 rounded"
        disabled={!isValid}
      >
        Book
      </button>
    </form>
  );
}
