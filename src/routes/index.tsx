import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Plus, Star, Check } from "lucide-react";

import heroBackdrop from "@/assets/hero-backdrop.jpg";
import { MEDIA, getByGenre, getByType } from "@/data/movies";
import { useMyList } from "@/lib/storage";
import { PosterRow, SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineAtlas — Descubra, avalie e compartilhe filmes" },
      {
        name: "description",
        content:
          "CineAtlas é sua biblioteca cinematográfica: descubra clássicos, organize favoritos e compartilhe avaliações.",
      },
      { property: "og:title", content: "CineAtlas" },
      {
        property: "og:description",
        content: "Descubra, avalie e compartilhe filmes no CineAtlas.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = MEDIA.find((m) => m.slug === "interestelar")!;
  const { has, toggle } = useMyList();
  const inList = has(featured.slug);

  const filmes = getByType("filme");
  const series = getByType("serie");
  const ficcao = getByGenre("Ficção Científica");
  const drama = getByGenre("Drama");
  const terror = getByGenre("Terror");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        <section className="relative isolate overflow-hidden">
          <img
            src={heroBackdrop}
            alt="Cenário cósmico em destaque"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 hero-fade-right" aria-hidden />
          <div className="absolute inset-0 hero-fade-bottom" aria-hidden />

          <div className="relative grid min-h-[80vh] grid-cols-1 px-6 py-20 md:px-12 lg:px-16">
            <div className="max-w-xl">
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                <span className="rounded-sm bg-accent px-2 py-0.5 text-accent-foreground">
                  Destaque
                </span>
                <span>{featured.genres[0]}</span>
              </div>

              <h1 className="font-display text-6xl font-semibold leading-[0.95] text-white md:text-7xl">
                {featured.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/75">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold text-white">
                    {featured.rating.toFixed(1)}
                  </span>
                  <span className="text-white/55">/ 5</span>
                </span>
                <span>{featured.year}</span>
                <span>{featured.duration}</span>
                <span>{featured.director}</span>
              </div>

              <p className="mt-6 max-w-md text-base leading-relaxed text-white/85">
                {featured.synopsis}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/filme/$slug"
                  params={{ slug: featured.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Assistir trailer
                </Link>
                <button
                  onClick={() => toggle(featured.slug)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {inList ? (
                    <>
                      <Check className="h-4 w-4" />
                      Na minha lista
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Minha lista
                    </>
                  )}
                </button>
                <Link
                  to="/filme/$slug"
                  params={{ slug: featured.slug }}
                  className="text-sm font-medium text-white/75 underline-offset-4 transition hover:text-white hover:underline"
                >
                  Ver mais
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 pt-2 md:px-12 lg:px-16">
          <PosterRow title="Recomendado para você" movies={filmes.slice(0, 10)} />
          <PosterRow title="Séries em destaque" movies={series} />
          <PosterRow title="Ficção Científica" movies={ficcao} />
          <PosterRow title="Dramas premiados" movies={drama} />
          <PosterRow title="Para uma noite de terror" movies={terror} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
