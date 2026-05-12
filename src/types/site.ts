export type NavItem = {
  label: string;
  href: string;
};

export type FeatureCard = {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  theme: "teal" | "gold" | "violet" | "blue";
};

export type ServerIP = {
  label: string;
  ip: string;
};

export type HeroData = {
  eyebrow: string;
  title: string;
  lead: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
};

export type HomeData = {
  hero: HeroData;
  featureCards: FeatureCard[];
  serverIPs: ServerIP[];
};

export type NewsPost = {
  id: string;
  date: string;
  title: string;
  content: string;
  tag: string;
  tagType: "important" | "event" | "update" | "general";
};

export type NewsData = {
  posts: NewsPost[];
};

export type ClassData = {
  slug: string;
  name: string;
  role: string;
  difficulty: string;
  color: "crimson" | "gold" | "violet" | "blue" | "green" | "gray" | "teal";
  image: string;
  description: string;
  features: string[];
};

export type EquipmentData = {
  slug: string;
  name: string;
  type: string;
  rarity: string;
  source: string;
  effect: string;
  description: string;
  color: "crimson" | "gold" | "violet" | "blue" | "green" | "gray" | "teal";
  image: string;
};

export type MonsterData = {
  slug: string;
  name: string;
  level: string;
  weakness: string;
  drops: string[];
  description: string;
  color: "crimson" | "gold" | "violet" | "blue" | "green" | "gray" | "teal";
  image: string;
};

export type CommandData = {
  command: string;
  category: string;
  description: string;
  cooldown: string;
};
