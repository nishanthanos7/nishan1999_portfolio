export type ProjectCategory = "Product" | "Web" | "Brand";

export type Project = {
  number: string;
  title: string;
  description: string;
  category: ProjectCategory;
  color: string;
  tag: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Vaccine Flow",
    description: "Making a national vaccination operation easier to see and act on.",
    category: "Product",
    color: "coral",
    tag: "Trigonal Technology / Apr 2025—Jul 2026",
  },
  {
    number: "02",
    title: "Rasan Commerce",
    description: "A faster storefront for 20,000+ monthly users.",
    category: "Web",
    color: "blue",
    tag: "Vacker360 / 2025",
  },
  {
    number: "03",
    title: "MoviePred + ReeView",
    description: "Two projects built around search, taste, and useful recommendations.",
    category: "Brand",
    color: "yellow",
    tag: "Django · React · NLP",
  },
];

export const projectFilters = ["All", "Product", "Web", "Brand"] as const;

export const experience = [
  {
    period: "Apr 2025—Jul 2026",
    company: "Trigonal Technology",
    description: "Built 7 Odoo modules for 10+ businesses. Also built a vaccine dashboard for 10+ vaccines across all 7 provinces.",
  },
  {
    period: "Jan—Mar 2025",
    company: "Vacker360",
    description: "Improved the Rasan e-commerce frontend for 20,000+ monthly users.",
  },
  {
    period: "May 2023—Jan 2025",
    company: "Decorum Technology and Research Center",
    description: "Built news and community products with Next.js, Node.js, Prisma, and Redis.",
  },
];

export const tools = ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Redis"];
