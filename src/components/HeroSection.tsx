import Image from "next/image";
import { getProfileSection } from "@/utils/profileData";

export default function HeroSection() {
  const basics = getProfileSection("basics");

  return (
    <section className="container mx-auto px-6 py-20 flex flex-col items-center">
      {/* Content section - text and photo */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12">
        {/* Text content */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {`Hi, I'm `}
            <span className="text-blue-600 dark:text-blue-400 block md:inline">
              {basics.name}
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl mb-6 text-gray-600 dark:text-gray-300">
            {basics.title}
          </h2>

          {/* Render summary paragraphs from array */}
          {basics.summaries &&
            Array.isArray(basics.summaries) &&
            basics.summaries.map((paragraph, index) => (
              <p
                key={index}
                className={`text-lg max-w-lg ${index > 0 ? "mt-4" : ""}`}
              >
                {paragraph}
              </p>
            ))}
        </div>

        {/* Photo */}
        <div className="lg:w-2/5 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            <Image
              src={basics.profileImage}
              alt={basics.name}
              fill
              sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Action buttons - now below both text and photo */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#contact"
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 transition-colors text-center"
        >
          Get in touch
        </a>
        <a
          href="#projects"
          className="rounded-full border border-gray-300 dark:border-gray-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-6 py-3 transition-colors text-center"
        >
          View my work
        </a>
      </div>
    </section>
  );
}
