export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-pink-700 to-violet-400 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
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
