import { getProfileSection, formatText } from "@/utils/profileData";

export default function Footer() {
  const footer = getProfileSection("footer");

  // Format copyright with current year
  const copyright = formatText(footer.copyright, {
    year: new Date().getFullYear().toString(),
  });

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">{copyright}</p>
      </div>
    </footer>
  );
}
