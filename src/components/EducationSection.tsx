import { getProfileSection } from "@/utils/profileData";

export default function EducationSection() {
  // Get education data from JSON file
  const education = getProfileSection("education");

  return (
    <section id="education" className="bg-white dark:bg-neutral-900 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                <h3 className="text-xl font-bold mr-2">{edu.degree}</h3>
                <span className="text-blue-600 dark:text-blue-400 text-sm sm:text-base mt-1 sm:mt-0">
                  {edu.period}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {edu.institution}
              </p>
              <p className="text-gray-600 dark:text-gray-400 italic">
                {edu.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
