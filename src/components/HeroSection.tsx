import Image from "next/image";
import { getProfileSection } from "@/utils/profileData";

export default function HeroSection() {
  const basics = getProfileSection("basics");

  return (
    <section className="container flex flex-col items-center px-6 py-20 mx-auto">
      {/* Content section - text and photo */}
      <div className="flex flex-col w-full mb-12 max-w-7xl lg:flex-row lg:justify-between lg:items-center">
        {/* Text content */}
        <div className="mb-10 lg:w-1/2 lg:mb-0">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {`Hi, I'm `}
            <span className="block primary-color md:inline">{basics.name}</span>
          </h1>
          <h2 className="mb-6 text-xl text-gray-600 md:text-2xl dark:text-gray-300">
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
        <div className="flex justify-center lg:w-2/5">
          <div className="relative w-64 h-64 overflow-hidden border-4 border-white rounded-full shadow-lg md:w-80 md:h-80 dark:border-gray-800">
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
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <a
          href="#contact"
          className="px-6 py-3 text-center rounded-full btn-primary"
        >
          Get in touch
        </a>
        <a
          href="#projects"
          className="px-6 py-3 text-center rounded-full btn-secondary"
        >
          View my work
        </a>
      </div>
    </section>
  );
}
