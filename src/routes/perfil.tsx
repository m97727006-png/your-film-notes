import { createFileRoute, Link } from "@tanstack/react-router";
import { Lightbulb, RotateCcw, Save, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { AvatarBadge } from "@/components/avatar-badge";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getBySlug, MEDIA } from "@/data/movies";
import {
  type Avatar,
  DEFAULT_AVATAR,
  useAvatar,
  useMyList,
  useReviews,
} from "@/lib/storage";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — CineAtlas" },
      {
        name: "description",
        content:
          "Monte seu avatar, gerencie sua lista de filmes para assistir e revise suas avaliações.",
      },
    ],
  }),
  component: ProfilePage,
});

const SKIN_TONES = [
  "#fde2c8",
  "#f1c79b",
  "#dba27c",
  "#b5825c",
  "#8b5a3c",
  "#5a3a25",
];
const BACKGROUNDS = ["#7c5cff", "#0ea5e9", "#ec4899", "#22c55e", "#f59e0b", "#1f2937"];
const ACCENTS = ["#ffd166", "#ef4444", "#06b6d4", "#a855f7", "#10b981", "#f97316"];
const HAIR_OPTIONS: Avatar["hair"][] = [
  "curto",
  "ondulado",
  "longo",
  "moicano",
  "careca",
];
const ACCESSORY_OPTIONS: Avatar["accessory"][] = [
  "nenhum",
  "oculos",
  "chapeu",
  "fone",
];
const EXPRESSIONS: Avatar["expression"][] = [
  "feliz",
  "neutro",
  "serio",
  "surpreso",
];

function ProfilePage() {
  const { avatar, setAvatar, reset } = useAvatar();
  const { list, toggle } = useMyList();
  const { reviews, removeReview } = useReviews();

  // local working copy so editing feels responsive
  const [draft, setDraft] = useState<Avatar>(avatar);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(avatar);
  }, [avatar]);

  function save() {
    setAvatar(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  const myListItems = list
    .map((slug) => getBySlug(slug))
    .filter((m): m is NonNullable<typeof m> => !!m);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="px-6 pt-10 md:px-12 lg:px-16">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Personalização do perfil
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold md:text-5xl">
            Crie um avatar que é a sua cara ✨
          </h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* Preview card */}
          <aside className="rounded-2xl border border-border/60 bg-card p-6">
            <div
              className="mx-auto grid aspect-square w-full place-items-center rounded-2xl"
              style={{ background: `radial-gradient(circle at 50% 30%, ${draft.background}, ${draft.background}dd)` }}
            >
              <AvatarBadge avatar={draft} size={240} />
            </div>

            <label className="mt-5 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Nome de exibição
            </label>
            <input
              value={draft.name}
              onChange={(e) =>
                setDraft({ ...draft, name: e.target.value.slice(0, 24) })
              }
              className="mt-1 w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />

            <div className="mt-5 flex gap-2">
              <button
                onClick={save}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Save className="h-4 w-4" />
                {saved ? "Salvo!" : "Salvar avatar"}
              </button>
              <button
                onClick={() => {
                  reset();
                  setDraft(DEFAULT_AVATAR);
                }}
                className="inline-flex items-center justify-center gap-1 rounded-full border border-border px-3 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3 w-3" /> Redefinir
              </button>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/10 p-3 text-xs text-foreground/85">
              <Lightbulb className="h-4 w-4 shrink-0 text-accent" />
              Misture diferentes estilos para criar um avatar único!
            </div>
          </aside>

          {/* Editor */}
          <section className="space-y-6">
            <Group label="Tom de pele">
              <div className="flex flex-wrap gap-3">
                {SKIN_TONES.map((c) => (
                  <Swatch
                    key={c}
                    color={c}
                    active={draft.skin === c}
                    onClick={() => setDraft({ ...draft, skin: c })}
                  />
                ))}
              </div>
            </Group>

            <Group label="Cor de fundo">
              <div className="flex flex-wrap gap-3">
                {BACKGROUNDS.map((c) => (
                  <Swatch
                    key={c}
                    color={c}
                    active={draft.background === c}
                    onClick={() => setDraft({ ...draft, background: c })}
                  />
                ))}
              </div>
            </Group>

            <Group label="Cor de destaque">
              <div className="flex flex-wrap gap-3">
                {ACCENTS.map((c) => (
                  <Swatch
                    key={c}
                    color={c}
                    active={draft.accent === c}
                    onClick={() => setDraft({ ...draft, accent: c })}
                  />
                ))}
              </div>
            </Group>

            <Group label="Cabelo">
              <div className="flex flex-wrap gap-2">
                {HAIR_OPTIONS.map((h) => (
                  <Pill
                    key={h}
                    active={draft.hair === h}
                    onClick={() => setDraft({ ...draft, hair: h })}
                  >
                    {h}
                  </Pill>
                ))}
              </div>
            </Group>

            <Group label="Acessório">
              <div className="flex flex-wrap gap-2">
                {ACCESSORY_OPTIONS.map((a) => (
                  <Pill
                    key={a}
                    active={draft.accessory === a}
                    onClick={() => setDraft({ ...draft, accessory: a })}
                  >
                    {a}
                  </Pill>
                ))}
              </div>
            </Group>

            <Group label="Expressão">
              <div className="flex flex-wrap gap-2">
                {EXPRESSIONS.map((e) => (
                  <Pill
                    key={e}
                    active={draft.expression === e}
                    onClick={() => setDraft({ ...draft, expression: e })}
                  >
                    {e}
                  </Pill>
                ))}
              </div>
            </Group>
          </section>
        </div>

        {/* My list */}
        <section className="mt-16">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              Minha lista
            </h2>
            <span className="text-sm text-muted-foreground">
              {myListItems.length} {myListItems.length === 1 ? "item" : "itens"}
            </span>
          </div>
          {myListItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
              Você ainda não salvou nenhum título.{" "}
              <Link to="/filmes" className="text-accent underline-offset-4 hover:underline">
                Explorar catálogo →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {myListItems.map((m) => (
                <div
                  key={m.slug}
                  className="group relative overflow-hidden rounded-lg bg-card shadow-[var(--shadow-poster)]"
                >
                  <Link to="/filme/$slug" params={{ slug: m.slug }}>
                    <img
                      src={m.poster}
                      alt={m.title}
                      loading="lazy"
                      className="aspect-[2/3] w-full object-cover transition group-hover:scale-105"
                    />
                  </Link>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
                    <p className="font-display text-sm font-semibold text-white line-clamp-2">
                      {m.title}
                    </p>
                  </div>
                  <button
                    onClick={() => toggle(m.slug)}
                    className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100 hover:bg-destructive"
                    aria-label="Remover da lista"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reviews */}
        <section className="mt-16">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              Minhas avaliações
            </h2>
            <span className="text-sm text-muted-foreground">
              {reviews.length} {reviews.length === 1 ? "avaliação" : "avaliações"}
            </span>
          </div>
          {reviews.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
              Avalie algum filme para vê-lo aqui.
            </div>
          ) : (
            <ul className="space-y-3">
              {reviews.map((r) => {
                const m = getBySlug(r.slug);
                if (!m) return null;
                return (
                  <li
                    key={r.slug}
                    className="flex gap-4 rounded-xl border border-border/60 bg-card p-4"
                  >
                    <Link to="/filme/$slug" params={{ slug: m.slug }}>
                      <img
                        src={m.poster}
                        alt=""
                        className="h-24 w-16 shrink-0 rounded-md object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Link
                          to="/filme/$slug"
                          params={{ slug: m.slug }}
                          className="font-display text-lg font-semibold hover:text-accent"
                        >
                          {m.title}
                        </Link>
                        <button
                          onClick={() => removeReview(r.slug)}
                          className="text-xs text-muted-foreground hover:text-destructive"
                        >
                          Apagar
                        </button>
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`h-3.5 w-3.5 ${
                              n <= r.rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-muted-foreground">
                          {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      {r.text && (
                        <p className="mt-2 text-sm text-foreground/85">{r.text}</p>
                      )}
                      {r.feelings.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {r.feelings.map((f) => (
                            <span
                              key={f}
                              className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Quick stats */}
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Estatísticas
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Stat label="Catálogo total" value={MEDIA.length} />
            <Stat label="Na minha lista" value={list.length} />
            <Stat label="Avaliações" value={reviews.length} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      {children}
    </div>
  );
}

function Swatch({
  color,
  active,
  onClick,
}: {
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={color}
      className={`h-10 w-10 rounded-full transition ${
        active
          ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-110"
          : "hover:scale-105"
      }`}
      style={{ backgroundColor: color }}
    />
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium capitalize transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-secondary text-foreground/85 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl font-semibold text-accent">
        {value}
      </p>
    </div>
  );
}
