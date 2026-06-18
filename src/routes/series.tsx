import { createFileRoute } from "@tanstack/react-router";

import {
  MediaGrid,
  SiteFooter,
  SiteHeader,
} from "@/components/site-chrome";
import { getByType } from "@/data/movies";

export const Route = createFileRoute("/series")({
  head: () => ({
    meta: [
      { title: "Séries — CineAtlas" },
      {
        name: "description",
        content: "Maratone as séries selecionadas pela curadoria do CineAtlas.",
      },
    ],
  }),
  component: SeriesPage,
});

function SeriesPage() {
  const series = getByType("serie");
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="px-6 pt-10 md:px-12 lg:px-16">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Para maratonar
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
            Séries
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {series.length} séries selecionadas pela curadoria do CineAtlas.
          </p>
        </header>
        <MediaGrid movies={series} />
      </main>
      <SiteFooter />
    </div>
  );
}
