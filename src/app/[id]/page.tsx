import { HydrateClient } from "~/trpc/server";
import Details from "../_components/details";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const catDetails = await api.cats.findCat({ id: params.id });
  return (
    <HydrateClient>
      <main className="min-h-screen bg-zinc-700 p-2 text-white">
        <div className="container mx-auto flex min-h-screen flex-col">
          {catDetails && <Details catDetails={catDetails} />}
        </div>
      </main>
    </HydrateClient>
  );
}
