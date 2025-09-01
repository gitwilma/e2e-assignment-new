import { db } from "../db";

export async function seedPilates() {
  // tre klasser, kapacitet=1
  const classes = [
    { id: "66f100000000000000000001", name: "Reformer Basic 18:00", startsAt: new Date("2099-01-01T18:00:00Z"), capacity: 1 },
    { id: "66f100000000000000000002", name: "Matwork 07:00",        startsAt: new Date("2099-01-01T07:00:00Z"), capacity: 1 },
    { id: "66f100000000000000000003", name: "Stretch 12:00",       startsAt: new Date("2099-01-01T12:00:00Z"), capacity: 1 },
  ];

  for (const { id, ...rest } of classes) {
    await db.pilatesClass.upsert({
      where: { id },
      update: rest,
      create: { id, ...rest },
    });
  }
}
