import { HydrateClient } from "~/trpc/server";
import Details from "../_components/details";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen bg-zinc-700 p-2 text-white">
        <div className="container mx-auto flex min-h-screen flex-col">
          {/* <Details /> */}
        </div>
      </main>
    </HydrateClient>
  );
}
