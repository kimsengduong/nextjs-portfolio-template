import profileData from "@/data/profile.json";

// Mark as server-only to prevent client-side usage
// Add this import if you're using Next.js 13+
// import 'server-only';

export type ProfileData = typeof profileData;

/**
 * Interface for blog-style project presentation
 */
export interface Project {
  // Core project details
  name: string;
  title: string;
  description: string;
  slug?: string;
  order?: number;

  // Visual styling
  color: string;
  coverImage?: string;
  images?: string[];

  // Content sections
  fullDescription?: string;
  features: string[];
  technologies: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string;
  conclusion?: string;

  // Timeline information
  date?: string; // ISO date string: "2023-05-15"
  startDate?: string; // Project start date
  endDate?: string; // Project completion date
  duration?: string; // Human-readable duration: "3 months"

  // External links
  link?: string; // Live project URL
  github?: string; // Source code repository
  figma?: string; // Design files
  documentation?: string; // Project documentation

  // Additional blog-style fields
  excerpt?: string; // Short teaser for listings
  readingTime?: number; // Estimated reading time in minutes
  author?: {
    // Author info if different from profile
    name: string;
    avatar?: string;
    title?: string;
    bio?: string;
  };

  // SEO enhancement
  keywords?: string[]; // SEO keywords
  metaDescription?: string; // Specific meta description

  // Classification
  category?: string; // Primary category
  tags?: string[]; // Additional tags beyond technologies

  // Client information (for client work)
  client?: {
    name: string;
    logo?: string;
    industry?: string;
    website?: string;
  };

  // Testimonial (if available)
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar?: string;
  };

  // Content organization
  sections?: {
    id: string;
    title: string;
    content: string;
    type?: "text" | "code" | "image" | "video" | "quote";
    media?: string;
  }[];

  // Related content
  relatedProjects?: string[]; // Slugs of related projects
}

/**
 * Returns the complete profile data
 */
export const getProfileData = (): ProfileData => {
  return profileData;
};

/**
 * Returns a specific section of profile data
 */
export const getProfileSection = <T extends keyof ProfileData>(
  section: T
): ProfileData[T] => {
  return profileData[section];
};

/**
 * Format text with variables, e.g. "Hello {name}" becomes "Hello John"
 */
export const formatText = (
  text: string,
  variables: Record<string, string> = {}
): string => {
  return text.replace(/\{(\w+)\}/g, (_, key) => {
    return variables[key] || `{${key}}`;
  });
};

/**
 * Creates a URL-friendly slug from a project name
 */
export const getProjectSlug = (projectName: string): string => {
  return projectName.toLowerCase().replace(/\s+/g, "-");
};

/**
 * Gets a specific project by its slug
 * For Next.js App Router, using async/await for better server component compatibility
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  // Next.js >= 13 app router approach for server components
  if (typeof window === "undefined") {
    try {
      // Dynamic import for fs to ensure it only runs on server
      const fs = await import("fs/promises");
      const path = await import("path");

      const projectPath = path.join(
        process.cwd(),
        "src/data/projects",
        `${slug}.json`
      );

      const fileContents = await fs.readFile(projectPath, "utf8");
      return JSON.parse(fileContents) as Project;
    } catch (error) {
      console.error(`Failed to load project ${slug}:`, error);
      return null;
    }
  } else {
    // When running on client side, get from projects in profile data
    const projects = getProfileSection("projects") as unknown as Project[];
    return (
      projects.find((project) => getProjectSlug(project.name) === slug) || null
    );
  }
}

/**
 * Gets all project summary data (for the projects listing)
 * Uses async/await for Next.js App Router compatibility
 */
export async function getAllProjects(): Promise<Project[]> {
  const projects = getProfileSection("projects") as unknown as Project[];

  // If projects are already in profile.json, return them
  if (projects && projects.length) {
    return projects;
  }

  // Only run file operations on the server
  if (typeof window === "undefined") {
    try {
      // Dynamic import for fs to ensure it only runs on server
      const fs = await import("fs/promises");
      const path = await import("path");

      const projectsDirectory = path.join(process.cwd(), "src/data/projects");
      const fileNames = await fs.readdir(projectsDirectory);

      const projectsPromises = fileNames
        .filter((fileName) => fileName.endsWith(".json"))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.json$/, "");
          const fullPath = path.join(projectsDirectory, fileName);
          const fileContents = await fs.readFile(fullPath, "utf8");
          const projectData = JSON.parse(fileContents) as Project;

          // Return a summary version for the listing
          return {
            name: projectData.name,
            title: projectData.title,
            description: projectData.description,
            color: projectData.color,
            features: projectData.features,
            technologies: projectData.technologies,
            order: projectData.order,
            slug,
          };
        });

      const projectsData = await Promise.all(projectsPromises);
      return projectsData.sort((a, b) => (a.order || 999) - (b.order || 999));
    } catch (error) {
      console.error("Failed to load projects:", error);
      return [];
    }
  }

  return []; // Fallback empty array if running on client
}
