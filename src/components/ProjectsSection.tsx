import { getProfileSection } from "@/utils/profileData";
import Image from "next/image";

export default function ProjectsSection() {
  const projects = getProfileSection("projects");

  if (!projects || projects.length === 0) {
    return null; // Return null if no projects are found
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-neutral-900">
      <div className="container px-6 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">
          Projects & Achievements
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => {
            // Check for image property
            const hasImage = !!project.image;

            return (
              <div
                key={project.name}
                className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-neutral-800 transition-transform hover:scale-[1.02]"
              >
                {/* Project header with image if available, otherwise gradient with name */}
                <div
                  className={`h-48 ${
                    !hasImage ? `bg-gradient-to-r ${project.color}` : ""
                  } flex items-center justify-center text-white text-xl font-bold`}
                >
                  {hasImage ? (
                    <Image
                      src={project.image!}
                      alt={project.name}
                      width={400}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    project.name
                  )}
                </div>

                <div className="p-6">
                  {/* Project title */}
                  <h3 className="mb-2 text-xl font-semibold">
                    {project.title}
                  </h3>

                  {/* Project description */}
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>

                  {/* Feature list */}
                  <ul className="mb-4 space-y-1 text-gray-600 list-disc list-inside dark:text-gray-300">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>

                  {/* Technology tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 5).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 text-xs text-gray-800 bg-gray-100 rounded dark:bg-gray-800 dark:text-gray-200">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* View project link */}
                  {/* <Link
                    href={`/projects/${getProjectSlug(project.name)}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Project Details
                    <svg
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
