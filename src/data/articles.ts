export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export const articles: Article[] = [
  {
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications",
    excerpt: "Learn the architectural patterns and best practices for building React applications that scale with your team and codebase.",
    content: `
# Building Scalable React Applications

When building React applications that need to scale, architecture matters. Here's what I've learned from working on large-scale projects.

## Component Architecture

The key to scalable React apps is a well-thought-out component architecture. I recommend organizing components into three categories:

1. **UI Components** - Pure presentational components with no business logic
2. **Feature Components** - Components tied to specific features
3. **Layout Components** - Structural components for page layouts

## State Management

For state management, consider:

- **Local State** - Use useState for component-specific state
- **Context** - For sharing state across a subtree
- **External Libraries** - TanStack Query for server state, Zustand for client state

## Code Splitting

Implement code splitting at the route level using React.lazy() and Suspense. This reduces initial bundle size significantly.

## Performance Optimization

- Memoize expensive computations with useMemo
- Prevent unnecessary re-renders with React.memo
- Use virtualization for long lists

## Testing Strategy

A solid testing strategy includes:
- Unit tests for utilities and hooks
- Integration tests for features
- E2E tests for critical user flows
    `,
    publishedAt: "2024-12-15",
    readTime: "8 min read",
    category: "React",
    tags: ["React", "Architecture", "Performance"],
    featured: true,
  },
  {
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics",
    excerpt: "A deep dive into TypeScript generics - from basic concepts to advanced patterns that will level up your type safety.",
    content: `
# Mastering TypeScript Generics

Generics are one of TypeScript's most powerful features. Let's explore how to use them effectively.

## Why Generics?

Generics allow you to write reusable code that works with multiple types while maintaining type safety.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## Constraints

Use constraints to limit what types can be passed:

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## Utility Types

TypeScript provides built-in utility types using generics:

- \`Partial<T>\` - Makes all properties optional
- \`Required<T>\` - Makes all properties required
- \`Pick<T, K>\` - Picks specific properties
- \`Omit<T, K>\` - Omits specific properties

## Advanced Patterns

### Conditional Types

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`

### Mapped Types

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\`
    `,
    publishedAt: "2024-11-28",
    readTime: "6 min read",
    category: "TypeScript",
    tags: ["TypeScript", "Generics", "Types"],
    featured: true,
  },
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques for 2024",
    excerpt: "Explore the latest CSS features including container queries, cascade layers, and the :has() selector.",
    content: `
# Modern CSS Techniques for 2024

CSS has evolved significantly. Here are the modern techniques you should be using.

## Container Queries

Finally, we can style elements based on their container's size:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

## Cascade Layers

Control specificity with @layer:

\`\`\`css
@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}
\`\`\`

## The :has() Selector

The parent selector we've always wanted:

\`\`\`css
.card:has(img) {
  display: grid;
}
\`\`\`

## Subgrid

Align nested grids with their parent:

\`\`\`css
.grid-item {
  display: grid;
  grid-template-columns: subgrid;
}
\`\`\`
    `,
    publishedAt: "2024-10-20",
    readTime: "5 min read",
    category: "CSS",
    tags: ["CSS", "Frontend", "Design"],
  },
  {
    slug: "api-design-best-practices",
    title: "REST API Design Best Practices",
    excerpt: "Design APIs that developers love - covering naming conventions, error handling, pagination, and versioning.",
    content: `
# REST API Design Best Practices

Good API design makes integration seamless. Here are the practices I follow.

## Resource Naming

Use nouns, not verbs:
- ✅ GET /users
- ❌ GET /getUsers

Use plural names for collections:
- ✅ /users, /posts, /comments
- ❌ /user, /post, /comment

## HTTP Methods

- GET - Retrieve resources
- POST - Create resources
- PUT - Replace resources
- PATCH - Partial updates
- DELETE - Remove resources

## Error Handling

Return consistent error responses:

\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "field": "email"
  }
}
\`\`\`

## Pagination

Support pagination for list endpoints:

\`\`\`
GET /users?page=1&limit=20
\`\`\`

Response should include metadata:

\`\`\`json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
\`\`\`

## Versioning

Version your APIs:
- URL: /api/v1/users
- Header: Accept: application/vnd.api+json;version=1
    `,
    publishedAt: "2024-09-15",
    readTime: "7 min read",
    category: "Backend",
    tags: ["API", "REST", "Backend"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((article) => article.featured);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(articles.map((article) => article.category))];
}
