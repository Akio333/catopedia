import Image from "next/image";
import type { CatDetails } from "~/types";

export default function Details({ catDetails }: { catDetails: CatDetails }) {
  return (
    <div className="flex min-h-screen flex-col gap-4 rounded-2xl border-2 border-transparent bg-neutral-700 p-2">
      <Image
        src={catDetails.image}
        alt="Cat image"
        className="h-auto min-h-96 w-full rounded-xl object-contain"
        height={1024}
        width={1024}
      />
      <div className="overflow-hidden rounded-xl">
        <table>
          <tbody>
            <tr className="bg-slate-600 p-2">
              <td className="w-1/3 p-2">Name</td>
              <td className="w-2/3 p-2">{catDetails.breed}</td>
            </tr>
            <tr className="bg-zinc-600 p-2">
              <td className="w-1/3 p-2">Description</td>
              <td className="w-2/3 p-2">{catDetails.description}</td>
            </tr>
            <tr className="bg-slate-600 p-2">
              <td className="w-1/3 p-2">Country of Origin</td>
              <td className="w-2/3 p-2">{catDetails.origin}</td>
            </tr>
            <tr className="bg-zinc-600 p-2">
              <td className="w-1/3 p-2">Temperment</td>
              <td className="w-2/3 p-2">{catDetails.temperment}</td>
            </tr>
            <tr className="bg-slate-600 p-2">
              <td className="w-1/3 p-2">Alternative Names</td>
              <td className="w-2/3 p-2">{catDetails.alt_names}</td>
            </tr>
            <tr className="bg-zinc-600 p-2">
              <td className="w-1/3 p-2">Life Span</td>
              <td className="w-2/3 p-2">{catDetails.life_span} years</td>
            </tr>
            <tr className="bg-slate-600 p-2">
              <td className="w-1/3 p-2">Adaptability</td>
              <td className="w-2/3 p-2">{catDetails.adaptability}</td>
            </tr>
            <tr className="bg-zinc-600 p-2">
              <td className="w-1/3 p-2">Affection level</td>
              <td className="w-2/3 p-2">{catDetails.affection_level}</td>
            </tr>
            <tr className="bg-slate-600 p-2">
              <td className="w-1/3 p-2">Child Friendly</td>
              <td className="w-2/3 p-2">{catDetails.child_friendly}</td>
            </tr>
            <tr className="bg-zinc-600 p-2">
              <td className="w-1/3 p-2">Dog Friendly</td>
              <td className="w-2/3 p-2">{catDetails.dog_friendly}</td>
            </tr>
            <tr className="bg-slate-600 p-2">
              <td className="w-1/3 p-2">Shedding Level</td>
              <td className="w-2/3 p-2">{catDetails.shedding_level}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
