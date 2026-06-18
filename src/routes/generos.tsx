import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";

import {
  MediaGrid,
  SiteFooter,
  SiteHeader,
} from "@/components/site-chrome";
import { ALL_GENRES, getByGenre, MEDIA } from "@/data/movies";

const searchSchema = z.object({
  g: z.string().optional(),
});

export const Route = createFileRoute("/generos")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Gêneros — CineAtlas" },
      {
        name: "description",
        content: "Navegue o acervo do CineAtlas por gênero cinematográfico.",
      },
    ],
  }),
  component: GenresPage,
});

function GenresPage() {
  const { g } = Route.useSearch();
  const navigate = useNavigate();

  const selected = g ?? ALL_GENRES[0];

  const movies = useMemo(() => getByGenre(selected), [selected]);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const genre of ALL_GENRES) {
      map[genre] = MEDIA.filter((m) =>
        m.genres.some((x) => x.toLowerCase() === genre.toLowerCase()),
      ).length;
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="px-6 pt-10 md:px-12 lg:px-16">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Explorar
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
            Gêneros
          </h1>
        </header>

        <div className="grid gap-8 md:grid-cols-[260px_1fr]">
          <aside className="rounded-xl border border-border/60 bg-card/40 p-3">
            <ul className="flex flex-row flex-wrap gap-1 md:flex-col md:flex-nowrap">
              {ALL_GENRES.map((genre) => {
                const active = genre.toLowerCase() === selected.toLowerCase();
                return (
                  <li key={genre} className="md:w-full">
                    <button
                      onClick={() => navigate({ to: "/generos", search: { g: genre } })}
                      className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground/85 hover:bg-secondary"
                      }`}
                    >
                      <span>{genre}</span>
                      <span
                        className={`text-xs ${
                          active ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {counts[genre]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <section>
            <h2 className="mb-4 font-display text-2xl font-semibold md:text-3xl">
              {selected}{" "}
              <span className="text-base font-normal text-muted-foreground">
                · {movies.length} {movies.length === 1 ? "título" : "títulos"}
              </span>
            </h2>
            <MediaGrid movies={movies} />
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
