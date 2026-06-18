import posterInterstellar from "@/assets/poster-interstellar.jpg";
import posterShining from "@/assets/poster-shining.jpg";
import posterPulp from "@/assets/poster-pulpfiction.jpg";
import posterFantasy from "@/assets/poster-fantasy.jpg";
import posterMadMax from "@/assets/poster-madmax.jpg";
import posterCidade from "@/assets/poster-cidade.jpg";
import posterParasite from "@/assets/poster-parasite.jpg";
import posterSpirited from "@/assets/poster-spirited.jpg";
import posterMatrix from "@/assets/poster-matrix.jpg";
import posterCoringa from "@/assets/poster-coringa.jpg";
import posterHereditario from "@/assets/poster-hereditario.jpg";
import posterLaLaLand from "@/assets/poster-lalaland.jpg";
import posterChefao from "@/assets/poster-chefao.jpg";
import posterBreakingBad from "@/assets/poster-breakingbad.jpg";
import posterStranger from "@/assets/poster-strangerthings.jpg";
import posterDark from "@/assets/poster-dark.jpg";
import posterPeaky from "@/assets/poster-peaky.jpg";
import posterLastOfUs from "@/assets/poster-lastofus.jpg";

export type ContentType = "filme" | "serie";

export interface MediaItem {
  slug: string;
  title: string;
  year: number;
  duration: string;
  type: ContentType;
  genres: string[];
  director: string;
  cast: string[];
  synopsis: string;
  rating: number; // average 0-5
  ratingCount: number;
  poster: string;
}

export const ALL_GENRES = [
  "Ação",
  "Aventura",
  "Animação",
  "Comédia",
  "Crime",
  "Drama",
  "Fantasia",
  "Ficção Científica",
  "Mistério",
  "Musical",
  "Romance",
  "Suspense",
  "Terror",
] as const;

export const MEDIA: MediaItem[] = [
  {
    slug: "interestelar",
    title: "Interestelar",
    year: 2014,
    duration: "2h 49m",
    type: "filme",
    genres: ["Ficção Científica", "Aventura", "Drama"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    synopsis:
      "Em um futuro onde a Terra está morrendo, um piloto e uma equipe de cientistas atravessam um buraco de minhoca em busca de um novo lar para a humanidade.",
    rating: 4.6,
    ratingCount: 2845,
    poster: posterInterstellar,
  },
  {
    slug: "o-iluminado",
    title: "O Iluminado",
    year: 1980,
    duration: "2h 26m",
    type: "filme",
    genres: ["Terror", "Mistério"],
    director: "Stanley Kubrick",
    cast: ["Jack Nicholson", "Shelley Duvall", "Danny Lloyd"],
    synopsis:
      "Um escritor aceita cuidar de um hotel isolado durante o inverno e, aos poucos, o lugar começa a revelar segredos que ameaçam sua sanidade e sua família.",
    rating: 4.5,
    ratingCount: 1980,
    poster: posterShining,
  },
  {
    slug: "pulp-fiction",
    title: "Pulp Fiction: Tempo de Violência",
    year: 1994,
    duration: "2h 34m",
    type: "filme",
    genres: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    synopsis:
      "Histórias entrelaçadas de gângsteres, boxeadores e assaltantes em Los Angeles, contadas fora de ordem, com diálogos icônicos e violência estilizada.",
    rating: 4.7,
    ratingCount: 3120,
    poster: posterPulp,
  },
  {
    slug: "senhor-dos-aneis",
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    year: 2001,
    duration: "2h 58m",
    type: "filme",
    genres: ["Fantasia", "Aventura"],
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
    synopsis:
      "Um jovem hobbit recebe a missão de destruir um anel maligno e parte em uma jornada épica acompanhado por uma improvável sociedade.",
    rating: 4.8,
    ratingCount: 4210,
    poster: posterFantasy,
  },
  {
    slug: "mad-max-fury-road",
    title: "Mad Max: Estrada da Fúria",
    year: 2015,
    duration: "2h 0m",
    type: "filme",
    genres: ["Ação", "Aventura", "Ficção Científica"],
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    synopsis:
      "Em um deserto pós-apocalíptico, um andarilho silencioso e uma comandante rebelde fogem juntos em uma perseguição feroz pela liberdade.",
    rating: 4.4,
    ratingCount: 2670,
    poster: posterMadMax,
  },
  {
    slug: "cidade-de-deus",
    title: "Cidade de Deus",
    year: 2002,
    duration: "2h 10m",
    type: "filme",
    genres: ["Drama", "Crime"],
    director: "Fernando Meirelles",
    cast: ["Alexandre Rodrigues", "Leandro Firmino", "Phellipe Haagensen"],
    synopsis:
      "A ascensão do crime organizado em uma comunidade do Rio de Janeiro vista pelos olhos de um jovem que sonha em ser fotógrafo.",
    rating: 4.7,
    ratingCount: 3490,
    poster: posterCidade,
  },
  {
    slug: "parasita",
    title: "Parasita",
    year: 2019,
    duration: "2h 12m",
    type: "filme",
    genres: ["Suspense", "Drama", "Comédia"],
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    synopsis:
      "Uma família pobre se infiltra, um a um, na vida de uma família muito rica — até que um segredo no porão muda tudo.",
    rating: 4.6,
    ratingCount: 3010,
    poster: posterParasite,
  },
  {
    slug: "a-viagem-de-chihiro",
    title: "A Viagem de Chihiro",
    year: 2001,
    duration: "2h 5m",
    type: "filme",
    genres: ["Animação", "Fantasia", "Aventura"],
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    synopsis:
      "Uma menina de dez anos se perde em um mundo mágico habitado por espíritos e precisa trabalhar em uma casa de banhos para salvar seus pais.",
    rating: 4.8,
    ratingCount: 2890,
    poster: posterSpirited,
  },
  {
    slug: "matrix",
    title: "Matrix",
    year: 1999,
    duration: "2h 16m",
    type: "filme",
    genres: ["Ficção Científica", "Ação"],
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    synopsis:
      "Um programador descobre que a realidade é uma simulação criada por máquinas e se junta a um grupo de rebeldes para libertar a humanidade.",
    rating: 4.6,
    ratingCount: 3760,
    poster: posterMatrix,
  },
  {
    slug: "coringa",
    title: "Coringa",
    year: 2019,
    duration: "2h 2m",
    type: "filme",
    genres: ["Drama", "Suspense", "Crime"],
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    synopsis:
      "Um comediante fracassado e solitário desce gradualmente à loucura em uma Gotham hostil, dando origem ao mais icônico vilão dos quadrinhos.",
    rating: 4.4,
    ratingCount: 2980,
    poster: posterCoringa,
  },
  {
    slug: "hereditario",
    title: "Hereditário",
    year: 2018,
    duration: "2h 7m",
    type: "filme",
    genres: ["Terror", "Mistério", "Drama"],
    director: "Ari Aster",
    cast: ["Toni Collette", "Alex Wolff", "Milly Shapiro"],
    synopsis:
      "Após a morte da matriarca, uma família começa a descobrir segredos sombrios que revelam uma herança aterrorizante.",
    rating: 4.2,
    ratingCount: 1640,
    poster: posterHereditario,
  },
  {
    slug: "la-la-land",
    title: "La La Land: Cantando Estações",
    year: 2016,
    duration: "2h 8m",
    type: "filme",
    genres: ["Musical", "Romance", "Drama"],
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend"],
    synopsis:
      "Uma aspirante a atriz e um pianista de jazz se apaixonam em Los Angeles enquanto perseguem seus sonhos artísticos.",
    rating: 4.3,
    ratingCount: 2210,
    poster: posterLaLaLand,
  },
  {
    slug: "o-poderoso-chefao",
    title: "O Poderoso Chefão",
    year: 1972,
    duration: "2h 55m",
    type: "filme",
    genres: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    synopsis:
      "O patriarca de uma família mafiosa italiana transfere lentamente o controle do império criminoso para seu filho mais relutante.",
    rating: 4.9,
    ratingCount: 5180,
    poster: posterChefao,
  },

  // Séries
  {
    slug: "breaking-bad",
    title: "Breaking Bad",
    year: 2008,
    duration: "5 temporadas",
    type: "serie",
    genres: ["Drama", "Crime", "Suspense"],
    director: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
    synopsis:
      "Um professor de química diagnosticado com câncer terminal começa a fabricar metanfetamina para garantir o futuro da família.",
    rating: 4.9,
    ratingCount: 6100,
    poster: posterBreakingBad,
  },
  {
    slug: "stranger-things",
    title: "Stranger Things",
    year: 2016,
    duration: "4 temporadas",
    type: "serie",
    genres: ["Ficção Científica", "Terror", "Mistério"],
    director: "Duffer Brothers",
    cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    synopsis:
      "Em uma pequena cidade dos anos 80, um grupo de crianças investiga o desaparecimento de um amigo e descobre um universo paralelo aterrorizante.",
    rating: 4.5,
    ratingCount: 4720,
    poster: posterStranger,
  },
  {
    slug: "dark",
    title: "Dark",
    year: 2017,
    duration: "3 temporadas",
    type: "serie",
    genres: ["Ficção Científica", "Mistério", "Suspense"],
    director: "Baran bo Odar",
    cast: ["Louis Hofmann", "Lisa Vicari", "Karoline Eichhorn"],
    synopsis:
      "O desaparecimento de duas crianças expõe segredos entrelaçados de quatro famílias ao longo de três gerações em uma cidade alemã.",
    rating: 4.7,
    ratingCount: 2850,
    poster: posterDark,
  },
  {
    slug: "peaky-blinders",
    title: "Peaky Blinders: Sangue, Apostas e Navalhas",
    year: 2013,
    duration: "6 temporadas",
    type: "serie",
    genres: ["Crime", "Drama"],
    director: "Steven Knight",
    cast: ["Cillian Murphy", "Helen McCrory", "Paul Anderson"],
    synopsis:
      "Uma família de gângsteres do pós-guerra em Birmingham expande seu império enquanto enfrenta inimigos cada vez mais poderosos.",
    rating: 4.6,
    ratingCount: 3340,
    poster: posterPeaky,
  },
  {
    slug: "the-last-of-us",
    title: "The Last of Us",
    year: 2023,
    duration: "1 temporada",
    type: "serie",
    genres: ["Drama", "Aventura", "Suspense"],
    director: "Craig Mazin, Neil Druckmann",
    cast: ["Pedro Pascal", "Bella Ramsey", "Anna Torv"],
    synopsis:
      "Vinte anos após uma pandemia devastadora, um sobrevivente endurecido leva uma adolescente especial por uma América em ruínas.",
    rating: 4.6,
    ratingCount: 2410,
    poster: posterLastOfUs,
  },
];

export const getBySlug = (slug: string): MediaItem | undefined =>
  MEDIA.find((m) => m.slug === slug);

export const getByGenre = (genre: string): MediaItem[] =>
  MEDIA.filter((m) =>
    m.genres.some((g) => g.toLowerCase() === genre.toLowerCase()),
  );

export const getByType = (type: ContentType): MediaItem[] =>
  MEDIA.filter((m) => m.type === type);

export const searchMedia = (query: string): MediaItem[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return MEDIA.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.director.toLowerCase().includes(q) ||
      m.cast.some((c) => c.toLowerCase().includes(q)) ||
      m.genres.some((g) => g.toLowerCase().includes(q)),
  );
};
