import { api, HydrateClient } from "~/trpc/server";
import Card from "../_components/card";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-zinc-700 p-2 text-white">
        <div className="container mx-auto grid min-h-screen grid-cols-1 flex-col gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <Card />
        </div>
      </main>
    </HydrateClient>
  );
}
