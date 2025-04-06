import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/utils/profileData";
import { formatDate } from "@/utils/formatters";

// Generate static paths for all projects (better SEO)
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug || project.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} - Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.name} - Case Study`,
      description: project.description,
      type: "article",
      publishedTime: project.date || new Date().toISOString(),
      authors: ["Your Name"],
      tags: project.technologies,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const project = await getProjectBySlug(slug);

  // If project not found, show 404
  if (!project) {
    notFound();
  }

  // Estimate reading time (rough calculation)
  const wordCount =
    (project.fullDescription?.split(" ").length || 0) +
    (project.description?.split(" ").length || 0) +
    (project.features?.join(" ").split(" ").length || 0) +
    (project.challenges?.join(" ").split(" ").length || 0) +
    (project.solutions?.join(" ").split(" ").length || 0) +
    (project.results?.split(" ").length || 0);

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Format date (if available)
  const formattedDate = project.date ? formatDate(project.date) : null;

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Hero section with large image or gradient */}
      <div
        className={`w-full h-80 relative bg-gradient-to-r ${project.color} flex items-center justify-center`}
      >
        {project.coverImage ? (
          <>
            <Image
              src={project.coverImage}
              alt={project.name}
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </>
        ) : null}

        <div className="container relative z-10 px-6 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {project.name}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white md:text-2xl">
            {project.title}
          </p>
        </div>
      </div>

      <div className="container px-6 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex mb-8 text-sm">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Home
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link
              href="/#projects"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Projects
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-600 dark:text-gray-400">
              {project.name}
            </span>
          </nav>

          {/* Article metadata */}
          <div className="pb-6 mb-10 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              {/* Author info (you can replace with your profile pic) */}
              <div className="flex items-center mr-6">
                <div className="w-8 h-8 mr-2 overflow-hidden bg-blue-600 rounded-full">
                  <Image
                    src="/profile.jpg"
                    alt="Author"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span>Your Name</span>
              </div>

              {/* Date if available */}
              {formattedDate && (
                <div className="flex items-center mr-6">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{formattedDate}</span>
                </div>
              )}

              {/* Reading time */}
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Technologies/Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Table of Contents for longer articles */}
          {(project.fullDescription ||
            (project.features && project.features.length > 3) ||
            project.challenges ||
            project.results) && (
            <div className="p-5 mb-10 bg-gray-100 rounded-lg dark:bg-neutral-800">
              <h2 className="mb-3 text-lg font-semibold">Table of Contents</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#overview"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Project Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Key Features
                  </a>
                </li>
                {project.challenges && (
                  <li>
                    <a
                      href="#challenges"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Challenges & Solutions
                    </a>
                  </li>
                )}
                {project.results && (
                  <li>
                    <a
                      href="#results"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Results & Impact
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href="#tech"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Technology Stack
                  </a>
                </li>
              </ul>
            </div>
          )}

          {/* Project overview */}
          <section id="overview" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold">Project Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6 text-lg">{project.description}</p>
              {project.fullDescription && (
                <p className="mb-6">{project.fullDescription}</p>
              )}
            </div>

            {/* Project images gallery */}
            {project.images && project.images.length > 0 && (
              <div className="my-10">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-64 overflow-hidden rounded-lg shadow-lg sm:h-80"
                    >
                      <Image
                        src={image}
                        alt={`${project.name} screenshot ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">
                  Project screenshots
                </p>
              </div>
            )}
          </section>

          {/* Key Features */}
          <section id="features" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold">Key Features</h2>
            <ul className="space-y-4">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="p-1 mt-1 mr-3 bg-blue-100 rounded-full dark:bg-blue-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-blue-600 dark:text-blue-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Challenges and Solutions */}
          {project.challenges && project.solutions && (
            <section id="challenges" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold">
                Challenges & Solutions
              </h2>

              <div className="space-y-8">
                {project.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-neutral-800"
                  >
                    <div className="p-6 pb-0">
                      <h3 className="mb-3 text-xl font-semibold text-red-600 dark:text-red-400">
                        Challenge {index + 1}
                      </h3>
                      <p className="mb-6">{challenge}</p>
                    </div>
                    <div className="p-6 pt-0">
                      <h3 className="mb-3 text-xl font-semibold text-green-600 dark:text-green-400">
                        Solution
                      </h3>
                      <p>
                        {(project.solutions && project.solutions[index]) ||
                          "Solution approach in development"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Results if available */}
          {project.results && (
            <section id="results" className="mb-12">
              <h2 className="mb-6 text-3xl font-bold">Results & Impact</h2>
              <div className="p-6 text-gray-700 border-l-4 border-green-500 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 dark:text-gray-300">
                <p className="text-lg italic">{project.results}</p>
              </div>
            </section>
          )}

          {/* Technology Stack */}
          <section id="tech" className="mb-12">
            <h2 className="mb-6 text-3xl font-bold">Technology Stack</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="p-4 text-center bg-white rounded-lg shadow-sm dark:bg-neutral-800"
                >
                  <span className="block text-lg font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Project Links */}
          {(project.link || project.github) && (
            <section className="mb-12">
              <h2 className="mb-6 text-3xl font-bold">Project Links</h2>
              <div className="flex flex-wrap gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visit Live Project
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 text-white transition bg-gray-800 rounded-lg shadow-md hover:bg-gray-900"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View GitHub Repository
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Social Sharing */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Share This Project</h2>
            <div className="flex space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Check out this awesome project: ${project.name} - ${project.title}`
                )}&url=${encodeURIComponent(
                  `https://yourdomain.com/projects/${slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-white transition bg-blue-400 rounded-full hover:bg-blue-500"
                aria-label="Share on Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  `https://yourdomain.com/projects/${slug}`
                )}&title=${encodeURIComponent(
                  `${project.name} - ${project.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-white transition bg-blue-700 rounded-full hover:bg-blue-800"
                aria-label="Share on LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  `https://yourdomain.com/projects/${slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-white transition bg-blue-800 rounded-full hover:bg-blue-900"
                aria-label="Share on Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </section>

          {/* Back to projects link */}
          <div className="pt-8 text-center border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/#projects"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
