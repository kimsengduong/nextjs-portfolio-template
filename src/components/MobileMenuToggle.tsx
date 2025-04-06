"use client";
import { useState, useEffect, useRef } from "react";
import { getProfileSection } from "@/utils/profileData";

export default function MobileMenuToggle() {
  // Get navigation and basics data from JSON file
  const navigation = getProfileSection("navigation");
  const basics = getProfileSection("basics");

  // Start with a consistent state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Control client-side visibility after hydration
  const [isMounted, setIsMounted] = useState(false);

  // Ref to the menu container
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This runs only on the client after hydration
    setIsMounted(true);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only run this code when menu is open
      if (!isMenuOpen) return;

      // Check if click was outside the menu content
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Ensure the component always renders the same structure on first render
  const menuVisibilityClass = !isMounted
    ? "opacity-0 pointer-events-none"
    : isMenuOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={isMenuOpen ? "hidden" : "block"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            className={isMenuOpen ? "block" : "hidden"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Mobile navigation overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden h-screen transition-opacity duration-300 ease-in-out ${menuVisibilityClass}`}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Semi-transparent blue backdrop with blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Menu content */}
        <div
          ref={menuRef}
          className={`absolute right-0 w-screen bg-white dark:bg-neutral-900 shadow-xl overflow-y-auto transition-transform duration-300 ${
            isMenuOpen ? "-translate-y-0" : "-translate-y-full"
          }`}
        >
          <nav className="p-4">
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={basics.resumeUrl}
                  download
                  className="px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 dark:text-green-400 flex items-center gap-2"
                  onClick={toggleMenu}
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
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Add global styles to blur main content when menu is open */}
      {isMenuOpen && isMounted && (
        <style jsx global>{`
          /* Target specific elements to blur behind the menu */
          header ~ * {
            filter: blur(5px) brightness(0.8);
            transition: filter 0.3s ease-out;
          }

          /* Exclude the menu itself from being blurred */
          [role="dialog"],
          [role="dialog"] * {
            filter: none !important;
          }

          /* Hide blur effect on desktop */
          @media (min-width: 768px) {
            header ~ * {
              filter: none;
            }
          }
        `}</style>
      )}
    </>
  );
}
