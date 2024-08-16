import { api, HydrateClient } from "~/trpc/server";
import Card from "./_components/card";

export default async function Home() {
  const data = await api.cats.images({ page: 0, limit: 10 });
  return (
    <HydrateClient>
      <main className="min-h-screen bg-zinc-700 p-2 text-white">
        <div className="container mx-auto grid min-h-screen grid-cols-1 flex-col gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {data.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              image={card.image}
              name={card.name}
              origin={card.origin}
              temperment={card.temperment}
            />
          ))}
        </div>
      </main>
    </HydrateClient>
  );
}
