import { db } from "../db";
import { seedPilates } from "./pilates";

async function main() {
  await db.booking.deleteMany();
  await db.pilatesClass.deleteMany();
  await seedPilates();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
