import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Lock, Plus, Star } from "lucide-react";
import { useState } from "react";

import {
  PosterRow,
  SiteFooter,
  SiteHeader,
} from "@/components/site-chrome";
import { getBySlug, getByGenre } from "@/data/movies";
import { useMyList, useReviews } from "@/lib/storage";

export const Route = createFileRoute("/filme/$slug")({
  loader: ({ params }) => {
    const movie = getBySlug(params.slug);
    if (!movie) throw notFound();
    return { movie };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.movie.title} — CineAtlas` },
      {
        name: "description",
        content: loaderData?.movie.synopsis ?? "Detalhes do título no CineAtlas.",
      },
      {
        property: "og:title",
        content: `${loaderData?.movie.title} — CineAtlas`,
      },
      { property: "og:description", content: loaderData?.movie.synopsis ?? "" },
      { property: "og:image", content: loaderData?.movie.poster ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Título não encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          O filme ou série que você procura não está no nosso catálogo.
        </p>
        <Link
          to="/filmes"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para o catálogo
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-destructive">{error.message}</div>
  ),
  component: MovieDetail,
});

const FEELINGS = ["Incrível", "Emocionante", "Impactante", "Profundo"] as const;

function MovieDetail() {
  const { movie } = Route.useLoaderData();
  const { has, toggle } = useMyList();
  const { reviews, addReview } = useReviews();
  const existing = reviews.find((r) => r.slug === movie.slug);

  const [rating, setRating] = useState<number>(existing?.rating ?? 0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [text, setText] = useState<string>(existing?.text ?? "");
  const [feelings, setFeelings] = useState<string[]>(existing?.feelings ?? []);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const distribution = [62, 24, 9, 3, 2]; // 5,4,3,2,1 stars (%)
  const related = getByGenre(movie.genres[0]).filter((m) => m.slug !== movie.slug);

  const inList = has(movie.slug);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1) return;
    addReview({
      slug: movie.slug,
      rating,
      text,
      feelings,
      createdAt: Date.now(),
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  }

  function toggleFeeling(f: string) {
    setFeelings((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie.poster}
            alt=""
            className="h-full w-full object-cover opacity-20 blur-2xl"
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-[260px_1fr] md:px-10 md:py-16">
          <div className="mx-auto w-[200px] md:w-full">
            <img
              src={movie.poster}
              alt={`Pôster de ${movie.title}`}
              width={400}
              height={600}
              className="aspect-[2/3] w-full rounded-lg object-cover shadow-[var(--shadow-poster)]"
            />
          </div>

          <div>
            <Link
              to="/filmes"
              className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" /> Voltar
            </Link>
            <h1 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
              {movie.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.genres.join(", ")}</span>
              <span>•</span>
              <span>{movie.duration}</span>
            </div>

            <p className="mt-5 max-w-2xl leading-relaxed text-foreground/90">
              {movie.synopsis}
            </p>

            <div className="mt-6 grid max-w-md grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-accent font-semibold">Direção</p>
                <p className="text-foreground/85">{movie.director}</p>
              </div>
              <div>
                <p className="text-accent font-semibold">Elenco</p>
                <p className="text-foreground/85">{movie.cast.join(", ")}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => toggle(movie.slug)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  inList
                    ? "bg-accent text-accent-foreground hover:opacity-90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {inList ? (
                  <>
                    <Check className="h-4 w-4" /> Na minha lista
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Adicionar à lista
                  </>
                )}
              </button>
              <a
                href="#avaliar"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/70"
              >
                <Star className="h-4 w-4" /> Avaliar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Rating + Review */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Review form */}
          <form
            id="avaliar"
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border/60 bg-card p-6 md:p-8"
          >
            <h2 className="font-display text-2xl font-semibold">Sua avaliação</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Dê sua nota e compartilhe sua opinião sobre o filme.
            </p>

            <div className="mt-5">
              <p className="text-sm font-medium">Sua nota</p>
              <div
                className="mt-2 flex items-center gap-2"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = (hoverRating || rating) >= n;
                  return (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHoverRating(n)}
                      aria-label={`${n} estrelas`}
                      className="transition hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          active
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="ml-2 rounded-md bg-secondary px-2 py-1 text-xs text-foreground/80">
                  {rating || 0}/5
                </span>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="text"
                className="text-sm font-medium text-foreground"
              >
                Escreva sua avaliação (opcional)
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 1000))}
                rows={5}
                placeholder="Conta pra gente o que achou do filme..."
                className="mt-2 w-full rounded-lg border border-border bg-secondary/60 p-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="mt-1 text-right text-xs text-muted-foreground">
                {text.length}/1000
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium">
                Marque seus sentimentos (opcional)
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {FEELINGS.map((f) => {
                  const active = feelings.includes(f);
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggleFeeling(f)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        active
                          ? "border-accent bg-accent/15 text-accent"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                Sua avaliação será pública e ajudará outros usuários.
              </p>
              <button
                type="submit"
                disabled={rating < 1}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Star className="h-4 w-4 fill-current" />
                {submitted ? "Publicado!" : existing ? "Atualizar avaliação" : "Publicar avaliação"}
              </button>
            </div>
          </form>

          {/* Rating distribution */}
          <aside className="rounded-2xl border border-border/60 bg-card p-6">
            <p className="text-sm text-muted-foreground">Nota média dos usuários</p>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-5xl font-bold text-accent">
                {movie.rating.toFixed(1).replace(".", ",")}
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={`h-4 w-4 ${
                      n <= Math.round(movie.rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {movie.ratingCount.toLocaleString("pt-BR")} avaliações
            </p>

            <ul className="mt-5 space-y-2 text-sm">
              {distribution.map((pct, i) => {
                const stars = 5 - i;
                return (
                  <li key={stars} className="flex items-center gap-3">
                    <span className="w-16 text-foreground/80">{stars} estrelas</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-xs text-muted-foreground">
                      {pct}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>

        {related.length > 0 && (
          <PosterRow
            title={`Mais em ${movie.genres[0]}`}
            movies={related}
          />
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
