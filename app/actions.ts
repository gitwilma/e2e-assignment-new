"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
  const classId = String(formData.get("classId") || "");
  const name = String(formData.get("name") || "").trim();

  if (!classId) throw new Error("Välj en klass.");
  if (name.length < 2) throw new Error("Ange ditt namn (minst 2 tecken).");

  // försök skapa unikt på classId => kastar om redan finns
  await db.booking.create({ data: { classId, name } });

  revalidatePath("/"); // uppdatera sidan
}
