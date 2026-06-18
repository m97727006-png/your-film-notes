import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo } from "react";
import { z } from "zod";

import {
  MediaGrid,
  SiteFooter,
  SiteHeader,
} from "@/components/site-chrome";
import { ALL_GENRES, getByType, searchMedia } from "@/data/movies";

const searchSchema = z.object({
  q: z.string().optional(),
  genero: z.string().optional(),
});

export const Route = createFileRoute("/filmes")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Filmes — CineAtlas" },
      {
        name: "description",
        content: "Explore o catálogo de filmes do CineAtlas por gênero ou busca.",
      },
    ],
  }),
  component: FilmesPage,
});

function FilmesPage() {
  const { q, genero } = Route.useSearch();
  const navigate = useNavigate();

  const movies = useMemo(() => {
    let base = q ? searchMedia(q) : getByType("filme");
    if (q) base = base.filter((m) => m.type === "filme");
    if (genero) {
      base = base.filter((m) =>
        m.genres.some((g) => g.toLowerCase() === genero.toLowerCase()),
      );
    }
    return base;
  }, [q, genero]);

  const updateSearch = (next: { q?: string; genero?: string }) => {
    navigate({
      to: "/filmes",
      search: { q: next.q || undefined, genero: next.genero || undefined },
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="px-6 pt-10 md:px-12 lg:px-16">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Catálogo
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
              Filmes
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {movies.length} {movies.length === 1 ? "título" : "títulos"}
              {q && ` para “${q}”`}
              {genero && ` em ${genero}`}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              updateSearch({
                q: String(fd.get("q") ?? ""),
                genero,
              });
            }}
            className="relative w-full max-w-sm"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="q"
              defaultValue={q ?? ""}
              type="search"
              placeholder="Buscar por título, diretor, ator..."
              className="h-10 w-full rounded-full border border-border bg-secondary pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </form>
        </header>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Chip
            active={!genero}
            onClick={() => updateSearch({ q, genero: undefined })}
          >
            Todos
          </Chip>
          {ALL_GENRES.map((g) => (
            <Chip
              key={g}
              active={genero?.toLowerCase() === g.toLowerCase()}
              onClick={() => updateSearch({ q, genero: g })}
            >
              {g}
            </Chip>
          ))}
          {(q || genero) && (
            <button
              onClick={() => updateSearch({})}
              className="ml-2 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" /> Limpar filtros
            </button>
          )}
        </div>

        <MediaGrid movies={movies} />
      </main>
      <SiteFooter />
    </div>
  );
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-secondary text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
