export type BlogFaq = {
  question: string;
  answer: string;
};

export type RelatedPost = {
  label: string;
  title: string;
  description: string;
  href: string;
};

export type InternalLink = {
  href: string;
  label: string;
};

export type BlogBlock =
  | {
      type: "intro";
      id: string;
      label: string;
      headline: string;
      paragraphs: string[];
    }
  | {
      type: "paragraphs";
      paragraphs: string[];
      lead?: boolean;
      dropcap?: boolean;
    }
  | {
      type: "quote";
      text: string;
    }
  | {
      type: "section";
      id: string;
      label: string;
      title: string;
      paragraphs: string[];
    }
  | {
      type: "split-note";
      items: {
        title: string;
        body: string;
        emphasis?: boolean;
      }[];
    }
  | {
      type: "visual-break";
      id?: string;
      label?: string;
      heading?: boolean;
      title: string;
      items: {
        title: string;
        bullets: string[];
      }[];
    }
  | {
      type: "inline-cta";
      title: string;
      body: string;
      button: string;
    }
  | {
      type: "numbered-list";
      id: string;
      label: string;
      title: string;
      paragraphs: string[];
      items: {
        title: string;
        body: string;
      }[];
    }
  | {
      type: "dark-checklist";
      id: string;
      label: string;
      title: string;
      paragraphs: string[];
      items: {
        title: string;
        body: string;
      }[];
    }
  | {
      type: "example";
      id: string;
      label: string;
      title: string;
      paragraphs: string[];
      items: {
        title: string;
        body: string;
        emphasis?: boolean;
      }[];
    }
  | {
      type: "comparison-table";
      id: string;
      label: string;
      title: string;
      paragraph: string;
      rows: {
        element: string;
        google: string;
        meta: string;
      }[];
    }
  | {
      type: "mid-cta";
      title: string;
      body: string;
      button: string;
    }
  | {
      type: "takeaway";
      id: string;
      label: string;
      title: string;
      paragraphs: string[];
      subheading: string;
      checklist: string[];
    };

export type BlogPost = {
  slug: string;
  path: string;
  category: string;
  breadcrumbTitle?: string;
  title: string;
  h1: string;
  metaTitle: string;
  description: string;
  schemaType?: "Article";
  schemaHeadline?: string;
  schemaDescription?: string;
  schemaDatePublished?: string;
  schemaDateModified?: string;
  schemaIncludeGlobal?: boolean;
  schemaBreadcrumbs?: { name: string; path: string }[] | false;
  schemaFaq?: BlogFaq[] | false;
  searchIntent: string;
  excerpt: string;
  author: string;
  authorBio: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  ogImage: string;
  featuredImage: string;
  featuredImageAlt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  toc: { label: string; id: string }[];
  blocks: BlogBlock[];
  faq: BlogFaq[];
  source: {
    label: string;
    url: string;
    body: string;
  };
  cta: {
    title: string;
    body: string;
    button: string;
  };
  internalLinks: InternalLink[];
  relatedPosts: RelatedPost[];
  pillarPage?: string;
};
