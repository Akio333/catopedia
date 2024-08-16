import { PostCard } from "~/types";

export default function Card(card: PostCard) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-600 p-3">
      <img src={card.image} alt="" className="h-52 w-full" />
      <table>
        <tr className="bg-slate-600">
          <td className="px-2">Name </td>
          <td className="px-2">{card.name}</td>
        </tr>
        <tr className="bg-gray-600">
          <td className="px-2">Origin </td>
          <td className="px-2">{card.origin}</td>
        </tr>
        <tr className="bg-zinc-600">
          <td className="px-2">Temperment</td>
          <td className="px-2">{card.temperment}</td>
        </tr>
      </table>
    </div>
  );
}
