import { getProfileSection } from "@/utils/profileData";

export default function SkillsSection() {
  const skills = getProfileSection("skills");

  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return null; // or some fallback UI
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Technical Skills
        </h2>

        <div className="max-w-4xl mx-auto">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className={index < skills.length - 1 ? "mb-8" : ""}
            >
              <h3 className="text-xl font-semibold mb-4">
                {skillGroup.category}
              </h3>
              <div
                className={`grid grid-cols-2 md:grid-cols-3 ${
                  skillGroup.items.length > 3 ? "lg:grid-cols-4" : ""
                } gap-4`}
              >
                {skillGroup.items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-md text-center hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
