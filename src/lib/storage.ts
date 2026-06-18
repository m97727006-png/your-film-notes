import { useCallback, useEffect, useState } from "react";

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(`ls:${key}`));
  } catch {
    // ignore quota errors
  }
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    setValue(readLS<T>(key, initial));
    const handler = () => setValue(readLS<T>(key, initial));
    window.addEventListener(`ls:${key}`, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(`ls:${key}`, handler);
      window.removeEventListener("storage", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        writeLS(key, v);
        return v;
      });
    },
    [key],
  );

  return [value, update] as const;
}

// ---- App-specific hooks ----

export function useMyList() {
  const [list, setList] = useLocalStorage<string[]>("cineatlas:mylist", []);
  const has = (slug: string) => list.includes(slug);
  const toggle = (slug: string) =>
    setList((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  return { list, has, toggle };
}

export type RatingMap = Record<string, number>;
export function useRatings() {
  const [ratings, setRatings] = useLocalStorage<RatingMap>(
    "cineatlas:ratings",
    {},
  );
  const setRating = (slug: string, value: number) =>
    setRatings((prev) => ({ ...prev, [slug]: value }));
  const clearRating = (slug: string) =>
    setRatings((prev) => {
      const { [slug]: _omit, ...rest } = prev;
      return rest;
    });
  return { ratings, setRating, clearRating };
}

export type Review = {
  slug: string;
  rating: number;
  text: string;
  feelings: string[];
  createdAt: number;
};
export function useReviews() {
  const [reviews, setReviews] = useLocalStorage<Review[]>(
    "cineatlas:reviews",
    [],
  );
  const addReview = (r: Review) =>
    setReviews((prev) => [r, ...prev.filter((x) => x.slug !== r.slug)]);
  const removeReview = (slug: string) =>
    setReviews((prev) => prev.filter((r) => r.slug !== slug));
  return { reviews, addReview, removeReview };
}

export type Avatar = {
  name: string;
  skin: string; // hex
  background: string; // hex
  accent: string; // hex
  hair: "curto" | "ondulado" | "longo" | "careca" | "moicano";
  accessory: "nenhum" | "oculos" | "chapeu" | "fone";
  expression: "feliz" | "neutro" | "serio" | "surpreso";
};

export const DEFAULT_AVATAR: Avatar = {
  name: "Cinéfilo",
  skin: "#f1c79b",
  background: "#7c5cff",
  accent: "#ffd166",
  hair: "ondulado",
  accessory: "nenhum",
  expression: "feliz",
};

export function useAvatar() {
  const [avatar, setAvatar] = useLocalStorage<Avatar>(
    "cineatlas:avatar",
    DEFAULT_AVATAR,
  );
  const reset = () => setAvatar(DEFAULT_AVATAR);
  return { avatar, setAvatar, reset };
}
