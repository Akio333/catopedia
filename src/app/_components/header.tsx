import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-zinc-900 to-zinc-700 p-4 text-white">
      <div className="ga container mx-auto flex flex-wrap items-center justify-between">
        <h1 className="text-4xl font-bold tracking-widest">Catopedia</h1>
        {/* <input
          type="search"
          name="Search"
          id="cat-search"
          placeholder="Search"
        /> */}

        <Link href="/upload" about="Upload" title="Upload">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
