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
When I first started building React applications, I made the classic mistake of throwing everything into one component. It worked for small projects, but as soon as the codebase grew, things became a nightmare to maintain. Over the years, I have learned that good architecture is not about following rules blindly, it is about understanding why those patterns exist.

The Foundation of Component Design

React components should ideally do one thing well. When a component starts handling too many responsibilities, it becomes difficult to test, reuse, and reason about. I typically organize my components into three buckets.

First, there are UI components. These are purely presentational. They receive props, render UI, and that is it. No business logic, no data fetching. Think of buttons, cards, modals. They are like Lego blocks that you can assemble anywhere.

Second, feature components tie specific UI to business logic. A user profile card that fetches and displays user data falls into this category. These components know about your application domain.

Third, layout components handle structure. They define how pages are organized, where the sidebar goes, how the main content flows. Keeping these separate means you can change layouts without touching your features.

State Management That Actually Works

State management in React has a reputation for being complicated, but it does not have to be. The key is using the right tool for the job.

For component-specific state, useState is your friend. If state only matters to one component and its children, keep it local. Fighting this by putting everything in global state leads to unnecessary complexity.

React Context works beautifully for state that needs to be shared across a subtree. Theme preferences, user authentication status, locale settings, these are perfect candidates. But Context is not meant for frequently changing data since every update triggers re-renders in all consuming components.

For server state, I have completely switched to TanStack Query. Managing loading states, caching, refetching, and error handling manually is tedious and error-prone. TanStack Query handles all of this elegantly. Your components simply declare what data they need, and the library takes care of the rest.

Performance Is Not an Afterthought

Performance optimization should be thoughtful, not premature. The React Profiler is invaluable for identifying actual bottlenecks instead of guessing.

Memoization with useMemo and useCallback helps, but only when used appropriately. Wrapping every function in useCallback creates overhead. Use it when passing callbacks to child components that rely on reference equality for optimization.

Code splitting at the route level makes a significant difference for initial load time. Users should not download your entire application just to see the landing page. React.lazy with Suspense makes this straightforward.

For long lists, virtualization is essential. Rendering a thousand items when only twenty are visible wastes resources. Libraries like react-window or TanStack Virtual solve this elegantly.

Testing Without the Pain

Testing React applications used to feel like a chore, but modern tools have made it much more pleasant. I follow a practical pyramid approach.

Unit tests cover utilities, custom hooks, and pure functions. These are fast and reliable. If your date formatting function breaks, you want to know immediately.

Integration tests verify that features work correctly when components interact. Testing a form submission flow gives confidence that the pieces fit together.

End-to-end tests with Playwright or Cypress cover critical user journeys. These are slower but catch issues that other tests miss, like a broken checkout flow or authentication problems.

The goal is confidence in your code, not a specific coverage number. I would rather have meaningful tests at 70% coverage than trivial tests at 95%.
    `,
    publishedAt: "2024-12-15",
    readTime: "12 min read",
    category: "React",
    tags: ["React", "Architecture", "Performance"],
    featured: true,
  },
  {
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics",
    excerpt: "A deep dive into TypeScript generics - from basic concepts to advanced patterns that will level up your type safety.",
    content: `
Generics confused me for the longest time. I could read generic code, but writing it felt like speaking a foreign language. The breakthrough came when I stopped thinking of generics as a complex feature and started seeing them as variables for types.

The Basic Idea

Consider a function that returns whatever you pass to it. Without generics, you might use any, but that defeats the purpose of TypeScript. You lose all type information.

With generics, you declare a type parameter, often called T by convention, that gets filled in when the function is called. If you call the function with a string, T becomes string. If you call it with a number, T becomes number. The function definition stays the same, but it works correctly with any type.

This is incredibly powerful for writing reusable code. You write once, and the type system ensures correctness everywhere the code is used.

Constraining Your Types

Sometimes you need to restrict what types can be passed. Say you want a function that works with anything that has a length property. You can constrain the generic to only accept types that meet this requirement.

This prevents someone from passing a number, which has no length, while still allowing strings, arrays, or any custom object with a length property. The constraint makes your function both flexible and safe.

The Built-in Utility Types

TypeScript provides utility types that are implemented using generics. Understanding them opens up powerful patterns.

Partial takes all properties of a type and makes them optional. This is perfect for update functions where you only want to change some fields.

Required does the opposite, making all properties mandatory. Useful when you need to ensure completeness.

Pick lets you select specific properties from a type. When you only need a subset of a larger type, Pick creates exactly what you need.

Omit removes specific properties. If you have a user type and want everything except the password, Omit handles that cleanly.

Record creates an object type with specified keys and value types. Great for dictionaries and lookup tables.

Conditional Types

This is where things get interesting. Conditional types let you choose different types based on conditions, similar to if-else but for types.

You can create types that evaluate conditions at compile time. Is T a string? Return one type. Otherwise, return another. This enables incredibly precise type definitions that adapt to their inputs.

Mapped Types

Mapped types transform existing types into new ones. You iterate over keys and transform each property.

Want to make every property of an object readonly? Map over the keys and add the readonly modifier. Want to make every property a function that returns the original type? Mapped types handle that too.

Practical Patterns

In real applications, I use generics constantly. API response wrappers that preserve the data type while adding metadata. Form libraries that infer field types from the initial values. State management hooks that know exactly what shape the state has.

The pattern I find most valuable is typing functions that work with objects of unknown shape but need to preserve type information. When you pluck a property from an object, generics ensure the return type matches the actual property type, not just any.

Getting Comfortable

The best way to learn generics is to read generic code in libraries you use. Look at how array methods are typed, how React hooks work, how utility libraries define their functions. You will start recognizing patterns and understanding the reasoning behind them.

Start simple. Make a function generic when you notice you are duplicating code for different types. Add constraints when you need specific capabilities. Reach for conditional and mapped types when the simpler approaches fall short.

Generics are not magic. They are just a way to write flexible, reusable code while keeping the type checker happy. Once it clicks, you will wonder how you ever worked without them.
    `,
    publishedAt: "2024-11-28",
    readTime: "10 min read",
    category: "TypeScript",
    tags: ["TypeScript", "Generics", "Types"],
    featured: true,
  },
  {
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques for 2024",
    excerpt: "Explore the latest CSS features including container queries, cascade layers, and the powerful has selector.",
    content: `
CSS has transformed dramatically over the past few years. Features we begged for are now shipping in browsers, and they are changing how we think about styling. If you have not kept up, you are missing out on tools that make CSS genuinely enjoyable.

Container Queries Changed Everything

For years, we had media queries that respond to viewport size. But components do not care about the viewport. A card in a wide sidebar behaves differently than the same card in a narrow sidebar, regardless of screen size.

Container queries finally let us style elements based on their container's size. You mark an element as a container, and then child elements can query its dimensions. A card component can now adapt to wherever it is placed without knowing anything about the page layout.

This is the responsive component dream we have waited for. Build once, let it adapt everywhere. No more duplicate components or complex JavaScript solutions.

Cascade Layers Bring Order

CSS specificity has always been a pain point. You write a style, someone else writes a more specific one, things break. Cascade layers let you organize styles into explicit layers with clear precedence.

You define your layers upfront and assign styles to them. Styles in later layers always win over earlier ones, regardless of selector specificity. Your utility classes can always override component styles because you said so, not because you made them more specific.

This is particularly powerful for design systems. Base styles go in one layer, component styles in another, utilities at the top. No more important hacks or overly specific selectors.

The Has Selector We Deserved

For the longest time, CSS could only select downward. You could style children based on parents, but not the other way around. The has selector changes that completely.

Now you can style a parent based on what it contains. A form group can look different when it contains an invalid input. A card can change layout when it has an image. A navigation item can highlight when it contains the current page link.

This eliminates so many JavaScript-based solutions. Things that required adding classes with JavaScript are now pure CSS. The styling stays where it belongs.

Subgrid for Real Alignment

CSS Grid was revolutionary, but nested grids could not align with their parents. You would define a beautiful grid, nest a component inside, and its internal grid was completely separate.

Subgrid allows nested grids to use their parent's grid tracks. Finally, form labels can align across different form groups. Card content can align across a row of cards. The alignment problems that required workarounds or compromises now have a proper solution.

Native Nesting

If you have used Sass or other preprocessors, you know the convenience of nesting selectors. Native CSS now supports this. You can write your hover states, media queries, and child selectors nested right inside the parent rule.

This makes CSS files more scannable. Related styles stay together instead of being scattered. No preprocessor needed for this basic convenience anymore.

Color Improvements

Working with colors in CSS used to be awkward. RGB values are not intuitive, and manipulating colors required preprocessors or JavaScript.

The oklch color space makes colors more predictable. Hue, chroma, and lightness are intuitive to adjust. Relative color syntax lets you derive new colors from existing ones, darken, lighten, adjust saturation, all in CSS.

This means your color system can be more dynamic. Hover states can be calculated from base colors. Dark mode can use the same hues with adjusted lightness.

View Transitions

Page transitions used to require JavaScript animation libraries and careful coordination. The View Transitions API allows you to animate between page states with minimal code.

Click a link, and the browser captures the current state, renders the new state, and animates between them. You control the animation with CSS. This works for both single-page and multi-page applications.

Simple crossfades are trivial. With a bit more CSS, you can achieve shared element transitions where a thumbnail morphs into a hero image as you navigate.

Practical Adoption

Not every browser supports all these features yet, but support is growing rapidly. Start using them in projects where you control the browser requirements. For broader support, progressive enhancement works well since older browsers get the basic experience while modern browsers get the enhanced version.

CSS is no longer the weak link in web development. It is a powerful, expressive language that deserves respect. The features landing now solve real problems elegantly. Learning them is one of the best investments you can make as a web developer.
    `,
    publishedAt: "2024-10-20",
    readTime: "9 min read",
    category: "CSS",
    tags: ["CSS", "Frontend", "Design"],
  },
  {
    slug: "api-design-best-practices",
    title: "REST API Design Best Practices",
    excerpt: "Design APIs that developers love - covering naming conventions, error handling, pagination, and versioning strategies.",
    content: `
I have worked with APIs that were a joy to use and others that made me want to throw my computer out the window. The difference often comes down to thoughtful design decisions made early in the development process. Good API design is not about following trends, it is about creating an interface that developers can understand and use correctly without constantly consulting documentation.

Resource Naming That Makes Sense

URLs should read like a description of what you are accessing. Use nouns that represent resources, not verbs that describe actions. The HTTP method already tells us the action.

Fetching users should be GET /users, not GET /getUsers or GET /fetchAllUsers. Creating a user should be POST /users, not POST /createUser. This consistency means developers can guess endpoints without looking them up.

Use plural nouns for collections. Even when fetching a single item, the collection is /users and a specific item is /users/123. Mixing singular and plural creates confusion about which to use where.

Hierarchical relationships belong in the URL path. Comments on a post would be /posts/456/comments. This makes the relationship explicit and enables intuitive navigation of your API.

HTTP Methods Mean Something

Each HTTP method has semantics that clients and infrastructure understand. Respect them.

GET retrieves resources without side effects. Calling it multiple times produces the same result. Caching layers know they can cache GET requests.

POST creates new resources. The request body contains the data for the new resource. The response should include the created resource and its location.

PUT replaces a resource entirely. Send the complete new state of the resource. Missing fields become null or default values.

PATCH partially updates a resource. Only the included fields change, others stay as they were.

DELETE removes a resource. It should be idempotent, meaning deleting something already deleted should not error, just confirm it is gone.

Error Responses That Help

Nothing frustrates developers more than unhelpful error messages. A 400 Bad Request with no explanation leaves them guessing.

Error responses should include a machine-readable code that client code can handle programmatically. They should also include a human-readable message explaining what went wrong. If possible, indicate which field caused the problem and what would fix it.

Different error types deserve different HTTP status codes. 400 for client mistakes in the request format. 401 when authentication is missing. 403 when authenticated but not authorized. 404 when the resource does not exist. 422 when the request is well-formed but semantically invalid. 500 for genuine server errors.

Pagination Done Right

When a collection can grow large, pagination is essential. Returning ten thousand records in one response is not practical.

Offer limit and offset parameters or cursor-based pagination. Include metadata about the total count, current page, and links to next and previous pages.

Cursor-based pagination performs better for large datasets. Instead of "skip 1000 records," you say "give me records after this cursor." This scales regardless of how deep you paginate.

Filtering and Sorting

Let clients ask for exactly what they need. Query parameters work well for filtering. To get active users, /users?status=active is clear and composable.

Support sorting with a sort parameter. Let clients specify field and direction, like sort=created_at:desc for newest first.

For complex filtering, consider a structured query parameter rather than inventing a custom query language. GraphQL exists partly because REST filtering can get unwieldy.

Versioning Without Pain

APIs evolve. How do you make changes without breaking existing clients?

URL versioning like /api/v1/users is simple and explicit. Clients see exactly which version they are using. The downside is that URLs change between versions.

Header versioning keeps URLs clean but requires clients to set headers correctly. It is less discoverable but more flexible.

Whatever you choose, commit to backward compatibility within a version. Adding new fields is fine. Removing fields or changing types breaks clients. When breaking changes are necessary, introduce a new version and give clients time to migrate.

Documentation Is Not Optional

An undocumented API might as well not exist. Developers should not need to read your source code to use your API.

OpenAPI specifications let you document your API in a standard format that generates interactive documentation automatically. Keep it updated as the API evolves.

Include examples. Show complete requests and responses for common use cases. Explain the business logic, not just the technical structure. Why would someone use this endpoint? What happens after they do?

Authentication and Security

Secure your API appropriately for what it handles. OAuth 2 is the standard for APIs that act on behalf of users. API keys work for server-to-server communication.

Use HTTPS exclusively. No exceptions. Transmitting credentials over unencrypted connections is irresponsible.

Rate limiting protects your infrastructure and encourages efficient client behavior. Return clear headers indicating limits, remaining quota, and reset times.

The Human Element

APIs are interfaces between humans, mediated by code. The developers using your API will thank you for consistency, clarity, and thoughtful design. Invest time in getting it right, and you save everyone time in the long run.
    `,
    publishedAt: "2024-09-15",
    readTime: "11 min read",
    category: "Backend",
    tags: ["API", "REST", "Backend"],
  },
  {
    slug: "understanding-nodejs-event-loop",
    title: "Understanding the Node.js Event Loop",
    excerpt: "Demystifying how Node.js handles asynchronous operations and why understanding the event loop matters for performance.",
    content: `
When I first started with Node.js, the event loop was this mysterious thing that documentation mentioned but never quite explained in a way that clicked. I knew JavaScript was single-threaded, I knew callbacks existed, but how did it all fit together? It took building a few applications that behaved unexpectedly before I really sat down to understand it.

The Single Thread Reality

Node.js runs your JavaScript in a single thread. One piece of code executes at a time, start to finish. This sounds limiting until you realize that most of what servers do is wait. Wait for the database. Wait for the file system. Wait for network responses.

If Node.js actually waited, blocking the single thread, one slow database query would freeze everything. Instead, Node.js delegates waiting to the operating system and continues executing other code. When the wait is over, a callback runs to handle the result.

This is the heart of the event loop. It is the mechanism that checks if there is more code to run, executes it, checks if any waiting operations completed and have callbacks ready, executes those, and repeats forever.

The Phases of the Loop

The event loop is not a single queue. It is a series of phases, each with its own queue of callbacks to process.

The timers phase handles callbacks from setTimeout and setInterval. When a timer expires, its callback gets queued here.

The I/O callbacks phase handles most callbacks from asynchronous operations like file system reads, network requests, and database queries.

The idle and prepare phases are internal housekeeping.

The poll phase is where the event loop spends most of its time. It processes I/O events and will wait here for new events if nothing else is pending.

The check phase handles setImmediate callbacks, which run after the poll phase completes.

The close callbacks phase handles cleanup like socket close events.

Understanding this order explains some surprising behaviors. A setTimeout with zero delay does not run immediately, it waits for the timers phase of the next loop iteration. A setImmediate in an I/O callback runs before a zero-delay setTimeout because the check phase comes before the next timers phase.

Microtasks Jump the Queue

Promises and process.nextTick callbacks are special. They run between phases, after the current operation completes but before the event loop continues. This makes them faster but also means a continuous stream of microtasks can starve the event loop, preventing timers and I/O from processing.

Understanding this helps when debugging unexpected ordering. If your promise callbacks are not running when expected, check if something is blocking the microtask queue or if you are expecting them to run in a specific loop phase.

Blocking the Event Loop

Since everything runs on one thread, any code that takes a long time to execute blocks the entire server. No I/O processing, no handling other requests, nothing.

CPU-intensive operations are the usual culprits. Parsing a huge JSON file synchronously, complex calculations, image processing without offloading. The rule is simple, never block the event loop.

For CPU-heavy work, use worker threads. They run in separate threads with their own event loops. Send them work, get results back, keep the main loop responsive.

Practical Implications

Knowing the event loop changes how you write code. You understand why callback hell emerged and why promises and async await make code cleaner while maintaining non-blocking behavior.

You understand why some libraries have sync and async versions of the same function, and why the sync version exists only for specific use cases like startup scripts.

You can reason about timing. If you set a timer for 100 milliseconds and then run a synchronous loop for 200 milliseconds, the timer callback will be late. It cannot fire while your code is running.

Error handling makes more sense too. An uncaught exception in a callback crashes the process because there is no call stack to catch it. The code that initiated the async operation finished long ago.

Profiling and Debugging

When applications become slow, understanding the event loop helps identify issues. Event loop lag, the delay between when work is queued and when it runs, indicates blocking operations.

Clinic.js and similar tools visualize event loop behavior. You can see which phases are taking too long, identify blocking operations, and understand where your application spends time.

Sometimes the solution is batching work. Instead of processing a million items in one synchronous loop, process them in chunks, yielding to the event loop between chunks.

The Mental Model

Think of the event loop as your application's heartbeat. Each iteration pumps through pending work. Blocking code is like clogging an artery. Async operations are like delegating tasks so the heart can keep beating.

Your code registers interest in future events, file will be read, request will complete, timer will fire. The event loop checks for completed events and runs your callbacks. Your callbacks do work and possibly register interest in more events. The cycle continues.

Once this model clicks, Node.js stops being mysterious. The behavior that seemed random becomes predictable. You can trace exactly what happens when and why. That understanding is what separates developers who use Node.js from developers who truly know it.
    `,
    publishedAt: "2024-08-22",
    readTime: "10 min read",
    category: "Node.js",
    tags: ["Node.js", "JavaScript", "Backend", "Performance"],
    featured: true,
  },
  {
    slug: "postgresql-indexing-deep-dive",
    title: "PostgreSQL Indexing Deep Dive",
    excerpt: "Everything you need to know about indexes in PostgreSQL - when to use them, which types exist, and how to avoid common pitfalls.",
    content: `
Indexes are one of those things that seem simple until you actually need to optimize a slow query. You add an index, queries go faster, right? Sometimes. But understanding why indexes work, when they help, and when they hurt makes the difference between random performance improvements and intentional optimization.

What Indexes Actually Do

A database without indexes must scan every row to find matches. With millions of rows, this takes seconds or minutes. An index creates a separate data structure that allows the database to find relevant rows quickly.

Think of a book's index. Instead of reading every page to find mentions of a topic, you look up the topic in the index, get page numbers, and go directly there. Database indexes work similarly, though the data structures are more sophisticated.

The default index type in PostgreSQL is B-tree, a balanced tree structure that stays relatively shallow even with millions of entries. Looking up a value traverses maybe four or five nodes rather than scanning millions of rows.

When Indexes Help

Indexes shine when queries need to find a small subset of rows. Looking up a user by email address in a million-user table goes from scanning all million rows to traversing a handful of tree nodes.

They help with sorting too. If you frequently order results by a column, an index on that column provides results already sorted.

Range queries benefit as well. Finding orders from the last week on an indexed date column is fast because the B-tree structure keeps adjacent values near each other.

Indexes can also speed up joins. When joining tables on specific columns, indexes on those columns help PostgreSQL find matching rows efficiently.

When Indexes Hurt

Indexes are not free. Every insert, update, or delete must update the index too. Tables with heavy write loads can slow down significantly with too many indexes.

Indexes take disk space. A table with six indexes might have more storage used by indexes than by the table itself.

Sometimes the optimizer ignores your index entirely. If you are selecting most rows from a table, a sequential scan is actually faster than index lookups. The optimizer makes this call based on statistics it maintains about your data.

Indexes on low-cardinality columns rarely help. An index on a boolean column with roughly equal true and false values provides little benefit since half the rows match either value.

Choosing Index Types

B-tree is the default and works for equality and range comparisons on most data types. When in doubt, start here.

Hash indexes optimize equality comparisons only. No range queries, but faster for exact matches. PostgreSQL has improved these significantly in recent versions.

GiST indexes support complex data types like geometric shapes, full-text search, and ranges. They allow overlapping entries, which B-trees cannot handle.

GIN indexes are excellent for values that contain multiple elements, like arrays or JSONB documents. They index each element separately, making containment queries fast.

BRIN indexes are tiny and work well for naturally ordered data like timestamps on append-only tables. They store summary information about ranges of rows rather than individual values.

Composite Indexes

Indexes can include multiple columns. A composite index on last name and first name helps queries that filter on both columns.

Column order matters significantly. The index is primarily sorted by the first column, then by the second within equal values of the first. A query filtering only on the second column cannot use this index effectively.

For queries with a mix of equality and range conditions, put equality columns first in the index.

Partial Indexes

You can index only rows matching a condition. If you frequently query active users, an index on email where status equals active is smaller and faster than indexing all users.

This is powerful for tables where queries focus on a subset. Unshipped orders, pending reviews, recent records. Index just what you query.

Expression Indexes

Indexes can include expressions, not just columns. If you query by lowercase email for case-insensitive matching, index the lowercase expression rather than forcing the database to compute it for every row during queries.

This extends to function calls, date extractions, any deterministic expression.

Covering Indexes

An index can include extra columns to satisfy queries entirely from the index without touching the table. If you always select name and email when looking up users by ID, include name and email in the index.

PostgreSQL calls these covering indexes, using the INCLUDE clause. The extra columns are not part of the search key but are stored in the index for retrieval.

Monitoring and Maintenance

Check if indexes are being used. PostgreSQL tracks index usage statistics. An unused index costs write performance and storage for no benefit.

Watch for bloat. Indexes can become fragmented over time, especially with heavy updates. REINDEX rebuilds them cleanly.

Use EXPLAIN ANALYZE to understand query plans. It shows whether indexes are used, how many rows are examined, and where time goes.

The Practical Approach

Start without indexes except on primary keys. Run your application, identify slow queries. Add indexes specifically for those queries. Verify the index is used and improves performance.

Do not guess. Measure. An index you think will help might not. An index on a column you overlook might be exactly what is needed.

Indexing is not set-and-forget. As your data grows and query patterns evolve, revisit your indexes. Remove unused ones, add new ones for new query patterns. Your index strategy should evolve with your application.
    `,
    publishedAt: "2024-07-18",
    readTime: "11 min read",
    category: "Database",
    tags: ["PostgreSQL", "Database", "Performance", "SQL"],
  },
  {
    slug: "docker-containerization-guide",
    title: "Docker Containerization From Scratch",
    excerpt: "A practical guide to containerizing applications with Docker - from basic concepts to production-ready configurations.",
    content: `
The first time I used Docker, I followed a tutorial, copied some commands, and somehow ended up with a working container. I had no idea what I had actually done. It took building several projects and breaking things in interesting ways before I really understood containerization. Here is what I wish someone had explained clearly from the start.

Why Containers Exist

Before containers, deploying applications meant setting up servers with the right operating system, installing dependencies, configuring services, and hoping everything worked the same in production as it did on your machine. Spoiler: it often did not.

Containers package your application with everything it needs to run. The operating system libraries, runtime, dependencies, configuration. You build an image once, and it runs the same everywhere. No more works on my machine excuses.

This is different from virtual machines, which virtualize entire computers with their own operating systems. Containers share the host's kernel and are much lighter weight. You can run hundreds of containers on a single machine where you might run a dozen VMs.

Images and Containers

An image is a read-only template containing everything needed to run an application. A container is a running instance of an image. You can run multiple containers from the same image.

Images are built in layers. Each instruction in your Dockerfile creates a layer. Layers are cached, so if you change your application code but not your dependencies, Docker reuses the cached dependency layers. This makes builds fast.

Writing Good Dockerfiles

A Dockerfile is a recipe for building an image. Each instruction becomes a layer. Order matters for caching.

Start with a base image appropriate for your application. Node applications might use node:20-alpine. Python might use python:3.12-slim. Alpine variants are smaller but sometimes have compatibility issues.

Copy dependency files first, then install dependencies. This way, dependencies are cached until the dependency files change. Copy your application code last since it changes most frequently.

Use multi-stage builds for compiled languages or when build tools are not needed at runtime. One stage installs dependencies and builds, another stage starts fresh and copies only the build artifacts.

Be explicit about what runs as what user. Running as root inside containers is unnecessary and risky. Create a non-root user and switch to it.

Networking Between Containers

Containers are isolated by default but can communicate through Docker networks. Create a network, attach containers to it, and they can reach each other by container name.

Port mapping exposes container ports to the host. A container listening on port 3000 internally can be mapped to port 80 externally.

Docker Compose defines multi-container applications in a single file. Your web application, database, and cache each get their own container, connected by a network, started with one command. This is invaluable for local development.

Persistent Data

Containers are ephemeral. When a container stops, any data written inside it disappears. For persistent data, use volumes.

Named volumes are managed by Docker and persist independently of containers. Bind mounts connect host directories to container paths, useful for development when you want changes on your machine reflected immediately in the container.

Database containers should always use volumes. Losing your database when restarting a container would be catastrophic.

Environment Configuration

Applications need configuration that varies between environments. Database URLs, API keys, feature flags. Environment variables are the standard approach.

Pass environment variables when running containers or define them in Compose files. For sensitive values, use Docker secrets or external secret management rather than putting them in Compose files that might be committed to version control.

Optimization Matters

Image size affects pull times and storage costs. Use slim or alpine base images when possible. Remove unnecessary files. Combine commands to reduce layers.

The docker history command shows layer sizes. You might be surprised what is taking up space. That one RUN command that installs build tools, compiles something, and leaves the tools behind. Clean up in the same layer.

The docker system prune command removes unused images, containers, and networks. Docker can accumulate significant disk usage over time.

Production Considerations

Development and production configurations differ. Dev might mount source code for hot reloading, prod copies code into the image. Dev might expose debugging ports, prod locks things down.

Health checks let orchestrators know if your container is actually working. A container can be running but the application inside crashed. Health checks catch this.

Resource limits prevent containers from consuming all host resources. Set memory and CPU limits appropriate for your application.

Logging should go to stdout and stderr. Docker captures these streams and can forward them to logging systems. Do not write logs to files inside the container.

The Bigger Picture

Docker is often just the first step. In production, you need orchestration to manage multiple containers across multiple hosts, handle failures, scale up and down. Kubernetes is the dominant solution, though simpler options like Docker Swarm exist.

But you do not need Kubernetes to benefit from Docker. Consistent development environments, reproducible builds, simplified deployment. Even deploying a single container to a single server improves over traditional approaches.

Start simple. Containerize one application. Get comfortable with the concepts. Add Compose for multi-container development. Move toward orchestration when the need arises. Each step builds on the previous one.
    `,
    publishedAt: "2024-06-10",
    readTime: "12 min read",
    category: "DevOps",
    tags: ["Docker", "DevOps", "Containers", "Deployment"],
  },
  {
    slug: "git-advanced-workflows",
    title: "Git Workflows Beyond the Basics",
    excerpt: "Level up your Git skills with advanced techniques for rebasing, cherry-picking, and managing complex project histories.",
    content: `
Most developers know the basics of Git. Clone, add, commit, push, pull. That gets you through most days. But when things go wrong, when history gets messy, when you need to coordinate complex changes across teams, the basics are not enough. These advanced techniques have saved me countless hours.

Rebasing for Clean History

Merge commits clutter history. When you merge a feature branch, you get a commit that just says Merge branch feature into main. Multiply this across dozens of branches and your history becomes unreadable.

Rebasing replays your commits on top of another branch. Instead of merging main into your feature branch, you rebase your branch onto main. Your commits appear as if they were written against the latest main.

Interactive rebasing lets you edit commits before replaying them. Squash several small commits into one meaningful commit. Reword commit messages. Reorder commits. Drop commits entirely.

Before pushing a branch for review, I almost always interactive rebase. Each commit should tell a clear story. Reviewers appreciate not having to wade through fix typo and actually fix the bug commits.

A word of caution: never rebase commits that others have based work on. Rebasing rewrites history. If someone else has your commits, rebasing creates parallel histories that are painful to reconcile.

Cherry-Picking Specific Changes

Sometimes you need just one commit from another branch. Cherry-pick applies a specific commit to your current branch.

Hotfixes often use cherry-picking. You fix a bug on main, then cherry-pick that commit to the release branch. No need to merge everything from main, just the fix.

Cherry-picking creates new commits with different hashes. The changes are the same, but they are distinct commits in the history.

Bisecting to Find Bugs

Something broke. It worked last week. How do you find which commit caused it?

Git bisect automates the search. Tell Git a known good commit and a known bad commit. It checks out a commit in the middle. You test and tell it good or bad. It narrows down, binary search style, until it finds the exact commit that introduced the problem.

For automated testing, provide a script that returns success or failure. Git will run the bisect automatically, finding the culprit while you get coffee.

Stashing Work in Progress

You are in the middle of something when an urgent issue comes in. Your changes are not ready to commit. Stash saves your working directory and staged changes, giving you a clean slate.

Fix the urgent issue, commit it, then apply your stash to continue where you left off.

Stashes can accumulate. Name them with messages to remember what each contains. List them periodically and drop old ones you no longer need.

Worktrees for Parallel Development

Switching branches means changing your working directory. If you have two things to work on simultaneously, constant switching is disruptive.

Worktrees let you check out multiple branches in separate directories, all sharing the same repository. One directory has the main branch, another has your feature branch. Both are fully functional.

I use worktrees when reviewing pull requests. Check out the PR branch in a worktree, review and test it, without disturbing my main development directory.

Reflog Saves Everything

Did you accidentally reset, rebase, or delete something? The reflog records all changes to HEAD for 90 days by default.

Find the commit hash before the mistake and recover. Almost nothing in Git is truly lost if you act before the reflog expires.

This has saved me more times than I care to admit. Reset hard to the wrong commit? Reflog. Rebased and lost a commit? Reflog. It is your safety net.

Meaningful Commit Messages

A commit message should explain why a change was made, not just what changed. The diff shows what. The message provides context.

The first line is a summary, imperative mood, fifty characters or less. Add user authentication not added user authentication or adding user authentication.

After a blank line, add details if needed. Why was this approach chosen? What alternatives were considered? What should future developers know?

Link to issue trackers when relevant. Months later, when someone wonders why this code exists, the commit message should provide answers.

Hooks for Automation

Git hooks run scripts at specific points in the workflow. Pre-commit hooks can run linters and prevent committing broken code. Pre-push hooks can run tests. Commit-msg hooks can enforce message formats.

Tools like husky make managing hooks easy in JavaScript projects. The team shares hook configurations, ensuring everyone follows the same standards.

Handling Large Repositories

Large repositories with long histories can be slow. Shallow clones fetch only recent history, speeding up initial clone. Partial clones fetch only what you access.

Git LFS handles large files that do not belong in regular Git, like images, videos, or compiled binaries. The repository stores pointers while the actual files live on a separate server.

For truly massive repositories, consider splitting into smaller repositories or using tools designed for monorepos.

Building Intuition

Git is a content-addressed filesystem with a version control interface. Understanding that commits are snapshots, branches are pointers, and the graph structure of history helps you reason about what commands do.

When something unexpected happens, draw the commit graph. Visualize what you have and what you want. The command to get there usually becomes clear.

Practice the advanced commands in safe environments. Create a test repository, make intentional messes, and practice recovering. When real emergencies happen, muscle memory matters.
    `,
    publishedAt: "2024-05-05",
    readTime: "10 min read",
    category: "Git",
    tags: ["Git", "Version Control", "Workflow"],
  },
  {
    slug: "web-security-essentials",
    title: "Web Security Essentials for Developers",
    excerpt: "Protect your applications from common vulnerabilities - covering XSS, CSRF, SQL injection, and security headers.",
    content: `
Security often gets treated as an afterthought, something to worry about later, after the features are done. This approach leads to vulnerabilities that are expensive to fix and embarrassing to explain. Security needs to be part of how you think about every line of code.

Cross-Site Scripting Attacks

XSS happens when attackers inject malicious scripts into pages viewed by other users. The victim's browser executes the script as if it were legitimate, giving the attacker access to cookies, session tokens, and anything else the victim can access.

The defense is output encoding. When displaying user-provided content, encode it so the browser treats it as text, not code. In React, JSX does this automatically for content in curly braces. But using dangerouslySetInnerHTML bypasses this protection.

Context matters. HTML encoding works for HTML content. JavaScript strings need JavaScript encoding. URLs need URL encoding. Using the wrong encoding for the context leaves vulnerabilities.

Content Security Policy headers provide an additional layer. They tell the browser which sources of scripts are legitimate. Even if an attacker injects a script tag, the browser refuses to execute it if it violates the policy.

Cross-Site Request Forgery

CSRF tricks authenticated users into performing actions they did not intend. The victim visits a malicious site while logged into your application. The malicious site sends a request to your application. The browser includes the victim's cookies, and your application processes the request as if the victim made it.

The defense is CSRF tokens. Each form includes a token that the server verifies. The attacker cannot guess the token, so their forged requests fail.

Same-site cookie attributes provide additional protection. Cookies marked as SameSite Strict or Lax are not sent with cross-origin requests, preventing the attack vector entirely.

SQL Injection

SQL injection happens when user input is concatenated into SQL queries. If I enter my name as Robert; DROP TABLE users, and you concatenate that into a query, you might lose your users table.

The defense is parameterized queries. Never concatenate user input into SQL. Use query parameters that the database treats as data, not code. Every database library supports this. There is no excuse for concatenation.

Object-relational mappers like Prisma or Sequelize handle this automatically. Raw queries still need parameters. Be extra careful when building dynamic queries.

Authentication Security

Passwords need proper handling. Never store plain text passwords. Use bcrypt or argon2 with appropriate cost factors. These algorithms are intentionally slow, making brute force attacks expensive.

Rate limiting prevents credential stuffing. If someone tries thousands of passwords, lock them out temporarily. Implement progressive delays.

Multi-factor authentication significantly increases security. Even if passwords are compromised, attackers need the second factor.

Session tokens should be cryptographically random and long enough to prevent guessing. Regenerate them after authentication changes to prevent session fixation.

Authorization Checks

Authentication confirms identity. Authorization determines what that identity can do. They are separate concerns.

Check authorization on every request. Just because someone could access a resource earlier does not mean they still can. Permissions change.

Verify ownership of resources. When someone requests to view order 12345, confirm they own that order. Checking only that they are logged in allows them to view anyone's orders by changing the ID.

Be careful with indirect references. If you expose internal IDs, attackers can enumerate them. Consider UUIDs or other non-sequential identifiers for public-facing references.

Security Headers

HTTP headers provide security controls that browsers enforce.

Strict-Transport-Security forces HTTPS. Once a browser sees this header, it refuses to connect over HTTP.

X-Content-Type-Options prevents MIME sniffing. Browsers will not reinterpret file types, closing certain attack vectors.

X-Frame-Options prevents clickjacking by controlling whether your site can be embedded in frames.

Referrer-Policy controls how much URL information is sent to other sites.

Permissions-Policy restricts browser features like camera, microphone, and geolocation.

Dependency Vulnerabilities

Your code is only part of the attack surface. Dependencies have vulnerabilities too.

Run npm audit or equivalent regularly. Subscribe to security advisories for your major dependencies. Update promptly when vulnerabilities are disclosed.

Minimize dependencies. Each package is code you did not write and must trust. The left-pad incident showed how fragile dependency trees can be.

Lock dependency versions. Without lockfiles, builds can pull in different versions than you tested. That different version might have vulnerabilities.

Security Mindset

Think like an attacker. For every feature, ask how it could be abused. What happens if someone submits unexpected input? What if they skip steps in a workflow? What if they manipulate client-side code?

Defense in depth means multiple layers of protection. If one layer fails, others still protect you. Do not rely on a single check.

Fail securely. When errors happen, deny access rather than granting it. An error in authorization logic should not default to allowing access.

Security is a process, not a feature. Review code for security issues. Test for vulnerabilities. Stay informed about new attack vectors. The landscape changes, and your defenses must evolve.
    `,
    publishedAt: "2024-04-12",
    readTime: "11 min read",
    category: "Security",
    tags: ["Security", "Web Development", "Backend"],
  },
  {
    slug: "testing-strategies-frontend",
    title: "Testing Strategies for Frontend Applications",
    excerpt: "Build confidence in your code with a practical testing approach covering unit tests, integration tests, and end-to-end tests.",
    content: `
Testing frontend applications used to be painful. Brittle tests that broke with every UI change. Slow test suites that nobody wanted to run. Tests that passed while the application was clearly broken. Modern tools and approaches have made frontend testing much more practical, but strategy matters more than tools.

The Testing Trophy

The traditional test pyramid suggests many unit tests, fewer integration tests, fewer still end-to-end tests. For frontend applications, the trophy model often works better. A broad base of static analysis, a thick middle of integration tests, unit tests for complex logic, and a thin top of end-to-end tests.

Static analysis catches errors without running code. TypeScript prevents type errors. ESLint catches common mistakes. Prettier enforces formatting. These run constantly during development and catch many issues before you even try to run the code.

Integration tests hit the sweet spot for frontend code. They test components with their children, context providers, and realistic user interactions. They catch integration bugs that unit tests miss while staying faster than end-to-end tests.

What Unit Tests Are Good For

Pure functions with complex logic deserve unit tests. Date formatting, validation logic, data transformations. These tests are fast, reliable, and clearly specify expected behavior.

Custom hooks often benefit from unit testing. A hook that manages complex state, handles caching, or coordinates multiple effects can be tested in isolation using renderHook from testing-library.

But do not unit test components by checking their implementation details. Testing that a button has a specific class or that state changes in a specific way creates brittle tests that break when you refactor without changing behavior.

Integration Tests That Work

Testing components the way users interact with them creates resilient tests. Users do not check if a state variable changed. They click buttons and see results.

React Testing Library encourages this approach. Query elements by role, label, or text content, not by class names or test IDs. Click buttons, type in inputs, wait for results to appear.

Test the happy path and important edge cases. What happens when the form is submitted successfully? What happens when the API returns an error? What happens with an empty state?

Mock external dependencies at the boundary. Mock your API layer, not individual fetch calls. This lets you change how API calls are made without updating every test.

End-to-End Tests for Critical Paths

End-to-end tests run against your actual application in a real browser. They catch issues that other tests miss, like problems with build configuration, server communication, or browser-specific behavior.

But they are slow and can be flaky. Reserve them for critical user journeys. Can users log in? Can they complete a purchase? Can they perform the core action your application exists for?

Playwright and Cypress are the leading tools. Both provide good developer experience, but Playwright offers better cross-browser support and parallelization.

Make end-to-end tests independent. Each test should set up its own data and not depend on other tests running first. Parallel execution becomes possible, and failing tests are easier to debug.

Testing Async Behavior

Frontend applications are full of asynchronous operations. Fetching data, debounced inputs, animations. Tests must handle this correctly.

Use waitFor or findBy queries to wait for async changes. Do not add arbitrary delays. They slow down tests and still flake when the operation takes longer than expected.

Mock timers for debouncing, throttling, and animations. Fast-forward time in tests rather than waiting real milliseconds.

Test loading and error states, not just success states. Users see loading spinners and error messages. Those should work correctly too.

Avoiding Test Flakiness

Flaky tests destroy trust in your test suite. When tests randomly fail, developers stop believing them. When a legitimate failure happens, they assume it is just flaky.

Identify sources of flakiness. Race conditions in tests. Shared state between tests. External dependencies. Date and time sensitivity. Network variability in end-to-end tests.

Fix flaky tests immediately. Quarantine them if you cannot fix them right away. A smaller, reliable test suite provides more value than a larger, flaky one.

Running Tests Effectively

Run tests locally before pushing. Pre-commit hooks can run affected tests. Pre-push hooks can run the full suite.

Continuous integration runs tests on every pull request. Block merging if tests fail. This keeps the main branch working.

Parallelize when possible. Many test runners support parallel execution across files. End-to-end tests can run on multiple machines.

Measure test coverage as a guide, not a goal. High coverage of trivial code provides false confidence. Lower coverage of critical code is a problem. Focus on testing behavior that matters.

The Practical Approach

Start with integration tests for your most important features. Add unit tests when you have complex logic. Add end-to-end tests for critical user journeys.

Write tests that would catch the bugs you actually encounter. When a bug gets to production, write a test that would have caught it before fixing it.

Tests are code. Apply the same quality standards. Refactor duplicated test code. Keep tests readable. Delete tests that no longer provide value.

Good tests give you confidence to change code. They catch regressions before users do. They document expected behavior. They are an investment that pays off every time you make changes.
    `,
    publishedAt: "2024-03-08",
    readTime: "10 min read",
    category: "Testing",
    tags: ["Testing", "Frontend", "React", "Quality"],
  },
  {
    slug: "tailwind-css-deep-dive",
    title: "Tailwind CSS Deep Dive",
    excerpt: "Master utility-first CSS with Tailwind - from core concepts to advanced customization and component patterns.",
    content: `
When Tailwind first emerged, I dismissed it. Writing utility classes directly in HTML seemed like a step backward. Inline styles with extra steps. Then I tried it on a real project, and within a week, I understood why it had such passionate advocates.

The Utility-First Philosophy

Traditional CSS involves naming things. You create a class called card-title, write the styles somewhere else, and apply the class. This separation sounds clean until you realize that changing styles requires understanding both the HTML structure and scattered CSS files.

Utility classes flip this around. Want padding? Add p-4. Want the text blue? Add text-blue-500. The styling is right there with the element, immediately visible and modifiable.

This is not inline styles. Utilities are constrained to your design system. p-4 means one specific padding value, not arbitrary pixels. Colors come from your palette. Spacing follows your scale. The constraints that make design systems work are built in.

Building Components

Utility classes on every element sounds repetitive, and it would be if you copy-pasted HTML everywhere. But you are building components.

In React, the utility classes live in your component file, applied once. Every instance of your Button component shares the same styles. Need to change the button styling? Change one file.

When utility combinations become complex, extract them. Tailwind's apply directive lets you compose utilities into custom classes. Use this sparingly since the goal is not to recreate traditional CSS with extra steps.

The Configuration File

Tailwind generates utilities from configuration. The default configuration covers common needs, but real projects customize it.

Extend the color palette with your brand colors. Add custom spacing values if your design system requires them. Define breakpoints that match your actual designs.

The theme section defines your design tokens. Colors, fonts, sizes, shadows. Changes here ripple through every utility that uses these values.

Plugins add new utilities or components. Official plugins handle forms, typography, and aspect ratios. Community plugins cover animations, glassmorphism, and more.

Responsive Design

Responsive prefixes make mobile-first design natural. Start with styles for the smallest screens, add sm: prefix for small screens and up, md: for medium, and so on.

A component might be flex-col on mobile, then md:flex-row on larger screens. The breakpoints are right there in the HTML, no media queries to write elsewhere.

Custom breakpoints are possible when the defaults do not match your designs. Add them to configuration, and they become available as prefixes.

Hover, Focus, and States

State variants work like responsive prefixes. hover:bg-blue-600 applies on hover. focus:ring-2 adds a ring on focus. disabled:opacity-50 dims when disabled.

Combine variants as needed. dark:hover:bg-gray-700 applies on hover in dark mode. sm:focus:ring-4 applies on focus at small breakpoints and above.

Group variants let parents affect children. A group-hover:text-blue-500 child element responds when any parent with the group class is hovered.

Dark Mode

Dark mode comes built in. Enable it in configuration and use the dark: prefix for dark mode styles.

The mode can follow system preferences or be controlled by a class on the html element. The class approach integrates well with JavaScript-based theme toggles.

Designing for dark mode is more than inverting colors. Consider contrast, reduce brightness of vibrant colors, adjust shadows. Dark mode often needs subtle differences beyond simple inversion.

Optimizing for Production

Tailwind generates thousands of utilities. In development, this is fine. In production, you only need the utilities you actually use.

The JIT mode, now the default, generates only the classes you use. Your production CSS contains only what your project needs, often just a few kilobytes.

Purging unused styles requires proper configuration. Point Tailwind at your template files so it can scan for class usage. Dynamic class names need safeguarding since the scanner cannot detect them otherwise.

Component Patterns

Common patterns emerge in Tailwind projects. Centering uses flex, items-center, justify-center. Cards use rounded, shadow, padding, and background utilities.

Avoid premature abstraction. Copy utilities across components until patterns become clear. Then extract when you are sure the abstraction is right.

Headless UI libraries pair well with Tailwind. They handle behavior and accessibility while you handle styling. Radix, Headless UI, and others follow this pattern.

When Tailwind Is Not Ideal

Complex animations often benefit from regular CSS or animation libraries. Tailwind covers basics but keyframe animations need more.

Highly dynamic styles that depend on JavaScript values need inline styles or CSS variables. Tailwind utilities are predefined, not dynamically generated.

Projects with existing CSS systems might not benefit from adding Tailwind. Migration is not always worth the effort.

Making It Work

Use editor extensions. Tailwind IntelliSense for VS Code provides autocomplete, hover information, and linting. This transforms the experience.

Organize long class lists consistently. Group related utilities, use line breaks in JSX. Some teams alphabetize, others group by type.

Learn the utility names. There are patterns: p for padding, m for margin, flex for flexbox, grid for grid. Once you know the patterns, guessing new utilities becomes natural.

Tailwind is not for everyone or every project. But for rapid development with consistent design, it is remarkably effective. The initial skepticism often fades once you experience the workflow firsthand.
    `,
    publishedAt: "2024-02-15",
    readTime: "10 min read",
    category: "CSS",
    tags: ["Tailwind", "CSS", "Frontend", "Design"],
  },
  {
    slug: "javascript-performance-optimization",
    title: "JavaScript Performance Optimization",
    excerpt: "Speed up your JavaScript applications with practical optimization techniques for rendering, memory, and network efficiency.",
    content: `
Performance optimization is one of those topics where a little knowledge can be dangerous. I have seen developers spend days optimizing code that was not the bottleneck, making the codebase more complex while the actual problems remained. Good optimization starts with measurement, not assumptions.

Measuring Before Optimizing

The browser DevTools Performance panel is your starting point. Record a session, interact with your application, and analyze the results. You will see exactly where time goes.

Long tasks block the main thread. Anything over 50 milliseconds makes the interface feel sluggish. Find these and break them up.

The Lighthouse audit provides scores and suggestions. It simulates slower devices and networks, revealing problems that feel fine on your development machine.

Chrome's Performance Insights offers a more guided analysis. It highlights issues and explains why they matter.

Rendering Performance

The browser renders in a pipeline: JavaScript runs, styles are calculated, layout determines positions, paint fills pixels, and composite layers combine. Skipping steps is faster.

Layout thrashing happens when you read layout properties, change styles, read again, change again. Each read forces a recalculation. Batch reads together, then batch writes.

Transform and opacity changes only trigger compositing, skipping the expensive layout and paint steps. Animate these properties instead of width, height, or position.

Will-change hints tell the browser to prepare for animation, promoting elements to their own layers. Use sparingly since too many layers consume memory.

React-specific Performance

React's virtual DOM diffing is fast but not free. When parent components re-render, children re-render by default even if their props have not changed.

React.memo prevents re-renders when props stay the same. But comparison has a cost. Use it for expensive components, not every component.

useMemo caches computation results. useCallback caches function references. Both help prevent unnecessary re-renders in children that depend on these values.

Keys in lists should be stable identifiers, not array indices. Wrong keys cause unnecessary re-renders and subtle bugs.

Code splitting with lazy loading reduces initial bundle size. Users download only what they need. Prefetching can load likely-needed code in the background.

Memory Management

JavaScript handles memory automatically, but that does not mean you can ignore it. Memory leaks slow applications and eventually crash them.

Common leak sources include event listeners that are never removed, timers that keep running, closures that hold references to large objects, and detached DOM nodes that JavaScript still references.

Clean up in useEffect return functions. Remove listeners, clear timers, cancel requests. This is easy to forget and leads to gradual memory growth.

The Memory tab in DevTools lets you take heap snapshots and compare them. Growing memory between identical actions suggests a leak.

Network Optimization

The fastest request is the one you do not make. Cache aggressively. Deduplicate requests. Use libraries like TanStack Query that handle caching intelligently.

Bundle analysis reveals what is in your JavaScript files. You might be surprised. A casual import can pull in hundreds of kilobytes of code you barely use.

Tree shaking removes unused exports, but it only works with ES modules and when imports are static. Dynamic imports and CommonJS defeat it.

Image optimization often matters more than JavaScript. Use modern formats like WebP or AVIF. Serve appropriate sizes. Lazy load below-the-fold images.

Perceived Performance

Sometimes real performance is hard to improve, but perceived performance is achievable. Users care about how fast things feel.

Show skeletons instead of spinners. Skeletons give a sense of structure and feel faster than watching a spinner.

Optimistic updates show results immediately while the actual operation happens in the background. Clicking like updates the UI instantly, then confirms with the server.

Prioritize visible content. Load and render what users see first. Defer offscreen content and non-critical resources.

Third-Party Scripts

Analytics, ads, chat widgets. Third-party scripts often cause more performance problems than your own code.

Load them asynchronously so they do not block your content. Defer non-critical scripts. Consider whether each script provides value worth its cost.

Monitor third-party impact. Performance regressions are sometimes caused by an updated third-party script, not your changes.

The Optimization Process

Profile first. Identify actual bottlenecks. Optimize those specific areas. Measure the improvement. Repeat.

Resist the urge to optimize everything. Some code runs rarely. Some operations are already fast enough. Focus on what impacts users.

Performance budgets set limits. The bundle cannot exceed this size. Interactions must complete within this time. Budgets prevent gradual regression.

Automated checks in CI catch regressions before they ship. Lighthouse CI, bundle size tracking, and performance monitoring keep quality high.

Performance is a feature. Like any feature, it needs ongoing attention. The work is never truly finished, but it is always worthwhile.
    `,
    publishedAt: "2024-01-20",
    readTime: "10 min read",
    category: "JavaScript",
    tags: ["JavaScript", "Performance", "Frontend", "Optimization"],
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
