import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-zinc-700 p-2 text-white">
        <div className="container mx-auto flex min-h-screen flex-col">
          Cat Pedia
        </div>
      </main>
    </HydrateClient>
  );
}
