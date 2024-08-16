import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-zinc-700 p-2 text-white">
        <div className="container mx-auto grid min-h-screen grid-cols-1 flex-col gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          TODO: Details Page
        </div>
      </main>
    </HydrateClient>
  );
}
