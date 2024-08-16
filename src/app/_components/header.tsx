export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-zinc-900 to-zinc-700 p-4 text-white">
      <div className="ga container mx-auto flex flex-wrap items-center justify-between">
        <h1 className="text-4xl font-bold tracking-widest">Catopedia</h1>
        <input
          type="search"
          name="Search"
          id="cat-search"
          placeholder="Search"
        />
      </div>
    </header>
  );
}
