import { getProfileSection } from "@/utils/profileData";

export default function AboutSection() {
  // Get about data from JSON file
  const about = getProfileSection("about");

  return (
    <section id="about" className="bg-white dark:bg-neutral-900 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
        <div className="max-w-3xl mx-auto">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-lg ${
                index !== about.paragraphs.length - 1 ? "mb-4" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
