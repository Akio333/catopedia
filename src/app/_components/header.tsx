export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-pink-700 to-violet-400 p-2 text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
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
