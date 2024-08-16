export default function Card() {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-600 p-3">
      <img src="" alt="" className="h-44 w-full" />
      <table>
        <tr className="bg-slate-600">
          <td className="px-2">Name </td>
          <td className="px-2">British Shorthair</td>
        </tr>
        <tr className="bg-gray-600">
          <td className="px-2">Origin </td>
          <td className="px-2">England</td>
        </tr>
        <tr className="bg-zinc-600">
          <td className="px-2">Temperment</td>
          <td className="px-2">Affectionate, Sweet, Loyal, Quiet, Peaceful</td>
        </tr>
      </table>
    </div>
  );
}
