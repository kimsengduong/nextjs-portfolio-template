import MobileMenuToggle from "./MobileMenuToggle";
import { getProfileSection } from "@/utils/profileData";

export default function Header() {
  const basics = getProfileSection("basics");
  const navigation = getProfileSection("navigation");

  return (
    <header
      className={`sticky top-0 z-20 backdrop-blur-sm bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <a
          href="#"
          className="transition-colors hover:text-blue-600 dark:hover:text-blue-400"
        >
          <h1 className="text-xl font-bold tracking-tight">{basics.name}</h1>
        </a>

        {/* Desktop navigation with CV button */}
        <nav className="items-center hidden md:flex">
          <ul className="flex mr-6 space-x-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={basics.resumeUrl}
            download
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full shadow-sm btn-primary"
            aria-label="Download CV"
          >
            <span>Download CV</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-y-0.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        </nav>

        <MobileMenuToggle />
      </div>
    </header>
  );
}
