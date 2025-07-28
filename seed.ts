import configPromise from "@payload-config";
import { getPayload } from "payload";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Fiction",
    color: "#FFB347",
    slug: "fiction",
    subcategories: [
      { name: "Literary Fiction", slug: "literary-fiction" },
      { name: "Contemporary Fiction", slug: "contemporary-fiction" },
      { name: "Historical Fiction", slug: "historical-fiction" },
      { name: "Thriller & Suspense", slug: "thriller-suspense" },
      { name: "Mystery & Crime", slug: "mystery-crime" },
      { name: "Adventure", slug: "adventure" },
      { name: "Action", slug: "action" },
    ],
  },
  {
    name: "Fantasy",
    color: "#7EC8E3",
    slug: "fantasy",
    subcategories: [
      { name: "Epic Fantasy", slug: "epic-fantasy" },
      { name: "Urban Fantasy", slug: "urban-fantasy" },
      { name: "Dark Fantasy", slug: "dark-fantasy" },
      { name: "High Fantasy", slug: "high-fantasy" },
      { name: "Fantasy Romance", slug: "fantasy-romance" },
      { name: "Sword & Sorcery", slug: "sword-sorcery" },
    ],
  },
  {
    name: "Science Fiction",
    color: "#D8B5FF",
    slug: "science-fiction",
    subcategories: [
      { name: "Space Opera", slug: "space-opera" },
      { name: "Cyberpunk", slug: "cyberpunk" },
      { name: "Dystopian", slug: "dystopian" },
      { name: "Time Travel", slug: "time-travel" },
      { name: "Hard Sci-Fi", slug: "hard-sci-fi" },
      { name: "Alternate History", slug: "alternate-history" },
    ],
  },
  {
    name: "Romance",
    color: "#FF9AA2",
    slug: "romance",
    subcategories: [
      { name: "Contemporary Romance", slug: "contemporary-romance" },
      { name: "Historical Romance", slug: "historical-romance" },
      { name: "Paranormal Romance", slug: "paranormal-romance" },
      { name: "Romantic Comedy", slug: "romantic-comedy" },
      { name: "LGBTQ+ Romance", slug: "lgbtq-romance" },
    ],
  },
  {
    name: "Young Adult",
    color: "#FFE066",
    slug: "young-adult",
    subcategories: [
      { name: "YA Fantasy", slug: "ya-fantasy" },
      { name: "YA Romance", slug: "ya-romance" },
      { name: "YA Contemporary", slug: "ya-contemporary" },
      { name: "YA Dystopian", slug: "ya-dystopian" },
      { name: "Coming of Age", slug: "coming-of-age" },
    ],
  },
  {
    name: "Manga",
    color: "#96E6B3",
    slug: "manga",
    subcategories: [
      { name: "Shonen", slug: "shonen" },
      { name: "Shoujo", slug: "shoujo" },
      { name: "Seinen", slug: "seinen" },
      { name: "Josei", slug: "josei" },
      { name: "Isekai", slug: "isekai" },
      { name: "Slice of Life", slug: "slice-of-life" },
      { name: "Mecha", slug: "mecha" },
    ],
  },
  {
    name: "Horror",
    color: "#B5B9FF",
    slug: "horror",
    subcategories: [
      { name: "Psychological Horror", slug: "psychological-horror" },
      { name: "Supernatural Horror", slug: "supernatural-horror" },
      { name: "Gothic Horror", slug: "gothic-horror" },
      { name: "Body Horror", slug: "body-horror" },
      { name: "Cosmic Horror", slug: "cosmic-horror" },
    ],
  },
  {
    name: "Non-Fiction",
    color: "#FFCAB0",
    slug: "non-fiction",
    subcategories: [
      { name: "Biography & Memoir", slug: "biography-memoir" },
      { name: "Self-Help", slug: "self-help" },
      { name: "History", slug: "history" },
      { name: "Science & Nature", slug: "science-nature" },
      { name: "Philosophy", slug: "philosophy" },
      { name: "Psychology", slug: "psychology" },
    ],
  },
  {
    name: "Children's Books",
    color: "#FFD700",
    slug: "childrens-books",
    subcategories: [
      { name: "Picture Books", slug: "picture-books" },
      { name: "Early Readers", slug: "early-readers" },
      { name: "Middle Grade", slug: "middle-grade" },
      { name: "Children's Fantasy", slug: "childrens-fantasy" },
      { name: "Educational", slug: "educational" },
    ],
  },
  {
    name: "Light Novels",
    color: "#FF6B6B",
    slug: "light-novels",
    subcategories: [
      { name: "Isekai", slug: "ln-isekai" },
      { name: "Romance", slug: "ln-romance" },
      { name: "Fantasy", slug: "ln-fantasy" },
      { name: "Sci-Fi", slug: "ln-sci-fi" },
      { name: "School Life", slug: "ln-school-life" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
];

const seed = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  process.exit(0);
} catch (error) {
  console.error("Seeding failed:", error);
  process.exit(1);
}
