import { spawn } from "child_process";
import { defineConfig } from "cypress";
import { MongoMemoryReplSet } from "mongodb-memory-server";
import waitOn from "wait-on";
import { seedTodos } from "./prisma/seed/todo";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost3100",
    async setupNodeEvents(on, config) {
      // implement node event listeners here

      // 1. Skapa en in-memory databas (replica set, prisma gnäller annars)
      const mongo = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
      const dbUri = mongo.getUri("cypress-test");

      // 2. Starta Next.js servern (på en annan port som ansluter till 1.)
      const server = spawn("npx", ["next", "dev", "--turbopack", "-p", "3100"], {
        env: {
          NODE_ENV: "test", 
          DATABASE_URL: dbUri
        },
        stdio: "inherit",
      });

      // 3. Vänta på att Next.js servern är igång innan cypress kör vidare
        await waitOn({ "resources": ["http://localhost:3100"], timeout: 60_000 });

      // 4. Städa upp processerna dvs Mongo databasen och Next.s-servern
      const cleanup = async () => {
        server.kill();
        await mongo.stop();
      };
      process.on("exit", cleanup);

      // 5. Reseeda om databasen så att testerna blir obereonde av varandra.
      process.env.DATABASE_URL = dbUri;
      on("task", {
        async reseed() {
          const { db } = await import("./prisma/db");
          await db.todo.deleteMany();
          await seedTodos();

          return null;
        },
      });
    },
  },
});
