export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt: string;
  date: string;
  author: string;
  category?: string;
  readTime?: string;
}

export const articles: BlogArticle[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    slug: 'getting-started-nextjs',
    excerpt: 'Learn how to build fast, modern web applications with Next.js and React.',
    content: `
      Next.js is a powerful React framework that makes it easy to build fast, SEO-friendly web applications.
      
      ## What is Next.js?
      
      Next.js is a production-ready framework for building React applications. It provides many built-in features
      like server-side rendering, static generation, API routes, and more.
    `,
    date: '2026-06-01',
    author: 'John Doe',
    category: 'Next.js',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Mastering TypeScript in React',
    slug: 'mastering-typescript-react',
    excerpt: 'Discover advanced TypeScript patterns and best practices for React development.',
    content: `
      TypeScript brings static typing to JavaScript, making your React applications more robust and maintainable.
    `,
    date: '2026-05-28',
    author: 'Jane Smith',
    category: 'TypeScript',
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'Building Scalable Applications',
    slug: 'building-scalable-apps',
    excerpt: 'Best practices for architecting and scaling modern web applications.',
    content: `
      Building applications that can scale is crucial for long-term success.
    `,
    date: '2026-05-20',
    author: 'Mike Johnson',
    category: 'Architecture',
    readTime: '10 min read',
  },
  {
    id: '4',
    title: 'Web Performance Optimization',
    slug: 'web-performance-optimization',
    excerpt: 'Techniques to optimize your web applications for speed and efficiency.',
    content: `
      Web performance is critical for user experience and SEO rankings.
    `,
    date: '2026-05-15',
    author: 'Sarah Williams',
    category: 'Performance',
    readTime: '7 min read',
  },
  {
    id: '5',
    title: 'The Art of Storytelling in Web Development',
    slug: 'storytelling-web-development',
    excerpt: 'How to craft compelling user narratives through design and code.',
    content: `
      Great web applications tell a story. They guide users through a journey that feels natural and intuitive.
    `,
    date: '2026-06-03',
    author: 'Emma Davis',
    category: 'UX Design',
    readTime: '6 min read',
  },
  {
    id: '6',
    title: 'React Hooks: A Complete Guide',
    slug: 'react-hooks-guide',
    excerpt: 'Master React Hooks and write cleaner, more maintainable functional components.',
    content: `
      React Hooks revolutionized how we write React components by allowing state management in functional components.
    `,
    date: '2026-06-02',
    author: 'John Doe',
    category: 'React',
    readTime: '9 min read',
  },
  {
    id: '7',
    title: 'CSS Grid and Flexbox Mastery',
    slug: 'css-grid-flexbox',
    excerpt: 'Learn modern CSS layout techniques to build responsive designs.',
    content: `
      Modern CSS provides powerful layout tools that make responsive design easier than ever.
    `,
    date: '2026-05-31',
    author: 'Sarah Williams',
    category: 'CSS',
    readTime: '7 min read',
  },
  {
    id: '8',
    title: 'API Design Best Practices',
    slug: 'api-design-best-practices',
    excerpt: 'Design APIs that are intuitive, scalable, and easy to maintain.',
    content: `
      A well-designed API is the foundation of any modern application.
    `,
    date: '2026-05-29',
    author: 'Mike Johnson',
    category: 'Backend',
    readTime: '8 min read',
  },
  {
    id: '9',
    title: 'Database Design for Modern Apps',
    slug: 'database-design-modern-apps',
    excerpt: 'Learn how to design efficient and scalable databases for your applications.',
    content: `
      Database design is critical for application performance and maintainability.
    `,
    date: '2026-05-27',
    author: 'Jane Smith',
    category: 'Database',
    readTime: '10 min read',
  },
  {
    id: '10',
    title: 'Testing Strategies for React Applications',
    slug: 'testing-react-applications',
    excerpt: 'Implement comprehensive testing to ensure your React apps are reliable and maintainable.',
    content: `
      Testing is crucial for building reliable applications that scale with confidence.
    `,
    date: '2026-05-25',
    author: 'Emma Davis',
    category: 'Testing',
    readTime: '11 min read',
  },
  {
    id: '11',
    title: 'Authentication and Authorization',
    slug: 'authentication-authorization',
    excerpt: 'Secure your applications with proper authentication and authorization strategies.',
    content: `
      Security starts with proper authentication and authorization implementation.
    `,
    date: '2026-05-23',
    author: 'John Doe',
    category: 'Security',
    readTime: '9 min read',
  },
  {
    id: '12',
    title: 'Deployment and DevOps Essentials',
    slug: 'deployment-devops-essentials',
    excerpt: 'Master deployment strategies and DevOps practices for production applications.',
    content: `
      Successful deployment requires careful planning and automation.
    `,
    date: '2026-05-21',
    author: 'Sarah Williams',
    category: 'DevOps',
    readTime: '12 min read',
  },
  {
    id: '13',
    title: 'Building Modern Web Experiences',
    slug: 'building-modern-web-experiences',
    excerpt: 'Explore cutting-edge techniques for creating immersive and performant web applications.',
    content: `
      The modern web is constantly evolving, with new technologies and patterns emerging to enhance user experiences.

      ## The Foundation of Modern Web Apps

      Building exceptional web experiences requires a solid understanding of performance optimization,
      accessibility, and progressive enhancement. These principles ensure your applications are fast,
      inclusive, and reliable across all devices and network conditions.

      ## Key Technologies

      Modern frameworks like Next.js, combined with powerful styling solutions and state management libraries,
      enable developers to build complex applications with confidence. The key is choosing the right tools
      for your specific use case.

      ## User-Centric Design

      At the heart of every great web application is a focus on the user. By prioritizing intuitive interfaces,
      smooth interactions, and meaningful feedback, we create experiences that users love.
    `,
    date: '2026-06-05',
    author: 'John Doe',
    category: 'Web Development',
    readTime: '8 min read',
  },
];

export default articles;

