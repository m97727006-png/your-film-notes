import { createFileRoute } from "@tanstack/react-router";
import { Search, Menu, ChevronDown, Play, Plus, Star } from "lucide-react";

import heroBackdrop from "@/assets/hero-backdrop.jpg";
import posterInterstellar from "@/assets/poster-interstellar.jpg";
import posterShining from "@/assets/poster-shining.jpg";
import posterPulp from "@/assets/poster-pulpfiction.jpg";
import posterFantasy from "@/assets/poster-fantasy.jpg";
import posterMadMax from "@/assets/poster-madmax.jpg";
import posterCidade from "@/assets/poster-cidade.jpg";
import posterParasite from "@/assets/poster-parasite.jpg";
import posterSpirited from "@/assets/poster-spirited.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CineAtlas — Descubra, avalie e compartilhe filmes" },
      {
        name: "description",
        content:
          "CineAtlas é a sua biblioteca cinematográfica: descubra clássicos, organize seus favoritos e compartilhe avaliações.",
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

type Movie = {
  title: string;
  year: number;
  genre: string;
  poster: string;
};

const recommended: Movie[] = [
  { title: "Interestelar", year: 2014, genre: "Ficção Científica", poster: posterInterstellar },
  { title: "O Iluminado", year: 1980, genre: "Terror", poster: posterShining },
  { title: "Pulp Fiction", year: 1994, genre: "Crime", poster: posterPulp },
  { title: "A Sociedade do Anel", year: 2001, genre: "Fantasia", poster: posterFantasy },
  { title: "Mad Max: Estrada da Fúria", year: 2015, genre: "Ação", poster: posterMadMax },
  { title: "Cidade de Deus", year: 2002, genre: "Drama", poster: posterCidade },
  { title: "Parasita", year: 2019, genre: "Suspense", poster: posterParasite },
  { title: "A Viagem de Chihiro", year: 2001, genre: "Animação", poster: posterSpirited },
];

const trending: Movie[] = [
  recommended[2],
  recommended[6],
  recommended[4],
  recommended[7],
  recommended[1],
  recommended[5],
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <section className="px-6 pb-24 pt-6 md:px-12 lg:px-16">
          <PosterRow title="Recomendado para você" movies={recommended} />
          <PosterRow title="Em alta esta semana" movies={trending} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const links = ["Início", "Séries", "Filmes"];
  return (
    <header className="sticky top-0 z-40 bg-navbar text-navbar-foreground shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
      <div className="flex h-16 items-center gap-6 px-6 md:px-10">
        <a href="/" className="flex items-baseline gap-1">
          <span className="font-display text-3xl font-semibold italic tracking-tight">
            CineAtlas
          </span>
          <span aria-hidden className="text-base">✦</span>
        </a>

        <nav className="ml-6 hidden items-center gap-7 text-sm md:flex">
          {links.map((l, i) => (
            <a
              key={l}
              href="#"
              className={`relative font-medium tracking-wide transition hover:text-white ${
                i === 0 ? "text-white" : "text-white/85"
              }`}
            >
              {l}
              {i === 0 && (
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-white" />
              )}
            </a>
          ))}
          <button className="flex items-center gap-1 text-sm font-medium text-white/85 transition hover:text-white">
            Gêneros <ChevronDown className="h-4 w-4" />
          </button>
        </nav>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3">
          <div className="relative hidden w-full max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navbar/60" />
            <input
              type="search"
              placeholder="Buscar filmes, diretores, atores..."
              className="h-9 w-full rounded-full border-0 bg-white/95 pl-9 pr-4 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/60"
            />
          </div>
          <button
            aria-label="Perfil"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-sm font-semibold transition hover:bg-white/25"
          >
            VC
          </button>
          <button
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-md text-white/90 transition hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroBackdrop}
        alt="Cena de Interestelar"
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
            <span>Ficção Científica</span>
          </div>

          <h1 className="font-display text-6xl font-semibold leading-[0.95] text-white md:text-7xl">
            Interestelar
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-white/75">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-white">4,6</span>
              <span className="text-white/55">/ 5</span>
            </span>
            <span>2014</span>
            <span>2h 49m</span>
            <span>Christopher Nolan</span>
          </div>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/85">
            Um grupo de exploradores viaja através de um buraco de minhoca recém-descoberto
            no espaço, na tentativa de garantir a sobrevivência da humanidade.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90">
              <Play className="h-4 w-4 fill-current" />
              Assistir trailer
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
              <Plus className="h-4 w-4" />
              Minha lista
            </button>
            <button className="text-sm font-medium text-white/75 underline-offset-4 transition hover:text-white hover:underline">
              Ver mais
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PosterRow({ title, movies }: { title: string; movies: Movie[] }) {
  return (
    <div className="mt-10">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
          {title}
        </h2>
        <a
          href="#"
          className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition hover:text-foreground"
        >
          Ver tudo →
        </a>
      </div>
      <div className="scrollbar-none -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4">
        {movies.map((m) => (
          <PosterCard key={m.title + m.year} movie={m} />
        ))}
      </div>
    </div>
  );
}

function PosterCard({ movie }: { movie: Movie }) {
  return (
    <a
      href="#"
      className="group relative w-[180px] flex-none snap-start overflow-hidden rounded-md bg-card shadow-[var(--shadow-poster)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.8)] sm:w-[200px] md:w-[220px]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/0" />
        <span className="absolute left-2 top-2 rounded-sm bg-black/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
          {movie.genre}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="font-display text-lg font-semibold leading-tight text-white">
            {movie.title}
          </h3>
          <p className="text-xs text-white/70">{movie.year}</p>
        </div>
      </div>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p className="font-display text-lg italic">
          CineAtlas <span className="text-accent">✦</span>
        </p>
        <p>© {new Date().getFullYear()} CineAtlas — Trabalho escolar inspirado no Letterboxd.</p>
      </div>
    </footer>
  );
}
