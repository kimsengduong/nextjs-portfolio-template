import { getProfileSection } from "@/utils/profileData";

export default function ExperienceSection() {
  // Get experience data from JSON file
  const experiences = getProfileSection("experience");

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Work Experience
        </h2>
        <div className="max-w-4xl mx-auto space-y-12">
          {experiences.map((job, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-4 pb-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-xl font-bold mr-2">
                  {job.position} - {job.company}
                </h3>
                <span className="text-blue-600 dark:text-blue-400 text-sm sm:text-base mt-1 sm:mt-0">
                  {job.period}
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                {job.responsibilities.map((responsibility, respIndex) => (
                  <li key={respIndex}>{responsibility}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
