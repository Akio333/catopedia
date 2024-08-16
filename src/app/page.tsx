import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-violet-400 to-purple-700 p-2">
        <div className="container mx-auto flex min-h-screen flex-col">
          Cat Pedia
        </div>
      </main>
    </HydrateClient>
  );
}
