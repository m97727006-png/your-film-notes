import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ALL_GENRES, type MediaItem } from "@/data/movies";
import { useAvatar } from "@/lib/storage";
import { AvatarBadge } from "@/components/avatar-badge";

export function SiteHeader() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { avatar } = useAvatar();
  const [genreOpen, setGenreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setGenreOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate({ to: "/filmes", search: { q: query.trim(), genero: undefined } });
  }

  const isActive = (p: string) =>
    p === "/" ? pathname === "/" : pathname.startsWith(p);

  const links: { to: string; label: string }[] = [
    { to: "/", label: "Início" },
    { to: "/series", label: "Séries" },
    { to: "/filmes", label: "Filmes" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-navbar text-navbar-foreground shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
      <div className="flex h-16 items-center gap-4 px-4 md:gap-6 md:px-10">
        <Link to="/" className="flex shrink-0 items-baseline gap-1">
          <span className="font-display text-2xl font-semibold italic tracking-tight md:text-3xl">
            CineAtlas
          </span>
          <span aria-hidden className="text-base">✦</span>
        </Link>

        <nav className="ml-2 hidden items-center gap-7 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative font-medium tracking-wide transition hover:text-white ${
                isActive(l.to) ? "text-white" : "text-white/80"
              }`}
            >
              {l.label}
              {isActive(l.to) && (
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-white" />
              )}
            </Link>
          ))}

          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setGenreOpen((v) => !v)}
              className={`flex items-center gap-1 font-medium transition hover:text-white ${
                pathname.startsWith("/generos") ? "text-white" : "text-white/80"
              }`}
            >
              Gêneros
              <ChevronDown
                className={`h-4 w-4 transition ${genreOpen ? "rotate-180" : ""}`}
              />
            </button>
            {genreOpen && (
              <div className="absolute left-0 top-full z-50 mt-3 grid w-[420px] grid-cols-2 gap-1 rounded-lg border border-border/40 bg-popover p-2 text-popover-foreground shadow-2xl">
                <Link
                  to="/generos"
                  onClick={() => setGenreOpen(false)}
                  className="col-span-2 rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  Ver todos os gêneros →
                </Link>
                {ALL_GENRES.map((g) => (
                  <Link
                    key={g}
                    to="/generos"
                    search={{ g }}
                    onClick={() => setGenreOpen(false)}
                    className="rounded-md px-3 py-1.5 text-sm text-foreground/85 hover:bg-secondary hover:text-foreground"
                  >
                    {g}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <form
          onSubmit={submitSearch}
          className="relative ml-auto hidden w-full max-w-md md:block"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Buscar filmes, diretores, atores..."
            className="h-9 w-full rounded-full border-0 bg-white/95 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            to="/perfil"
            aria-label="Perfil"
            className="grid h-10 w-10 place-items-center rounded-full transition hover:scale-105"
          >
            <AvatarBadge avatar={avatar} size={36} />
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md text-white/90 transition hover:bg-white/10 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/15 bg-navbar md:hidden">
          <form onSubmit={submitSearch} className="relative px-4 py-3">
            <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Buscar..."
              className="h-10 w-full rounded-full border-0 bg-white/95 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-500"
            />
          </form>
          <div className="flex flex-col px-2 pb-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/generos"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              Gêneros
            </Link>
            <Link
              to="/perfil"
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-4 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              Meu perfil
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="font-display text-lg italic">
          CineAtlas <span className="text-accent">✦</span>
        </p>
        <p>
          © {new Date().getFullYear()} CineAtlas — Trabalho escolar inspirado no Letterboxd.
        </p>
      </div>
    </footer>
  );
}

export function PosterCard({ movie }: { movie: MediaItem }) {
  return (
    <Link
      to="/filme/$slug"
      params={{ slug: movie.slug }}
      className="group relative w-[160px] flex-none snap-start overflow-hidden rounded-md bg-card shadow-[var(--shadow-poster)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.85)] sm:w-[180px] md:w-[200px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={`Pôster de ${movie.title}`}
          loading="lazy"
          width={400}
          height={600}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/0" />
        <span className="absolute left-2 top-2 rounded-sm bg-black/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
          {movie.type === "serie" ? "Série" : movie.genres[0]}
        </span>
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-sm bg-black/55 px-1.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {movie.rating.toFixed(1)}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="font-display text-base font-semibold leading-tight text-white line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-xs text-white/70">{movie.year}</p>
        </div>
      </div>
    </Link>
  );
}

export function PosterRow({
  title,
  movies,
  emptyLabel,
}: {
  title: string;
  movies: MediaItem[];
  emptyLabel?: string;
}) {
  return (
    <div className="mt-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
          {title}
        </h2>
      </div>
      {movies.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border/60 bg-card/40 p-6 text-sm text-muted-foreground">
          {emptyLabel ?? "Nada por aqui ainda."}
        </p>
      ) : (
        <div className="scrollbar-none -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4">
          {movies.map((m) => (
            <PosterCard key={m.slug} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}

export function MediaGrid({ movies }: { movies: MediaItem[] }) {
  if (movies.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/60 bg-card/40 p-10 text-center text-muted-foreground">
        Nenhum título encontrado.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((m) => (
        <div key={m.slug} className="w-full">
          <PosterCard movie={m} />
        </div>
      ))}
    </div>
  );
}
