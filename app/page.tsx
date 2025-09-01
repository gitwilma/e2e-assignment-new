// import TodoList from "./ui/todo-list";  //

export default async function Home() {
  // const todos = await db.todo.findMany(); // behåller som exempel
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Studio Pilates Co</h1>
      {/* <TodoList defaultTodos={todos} /> */}
    </main>
  );
}
