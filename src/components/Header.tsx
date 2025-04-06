"use client";

import { useState, useEffect } from "react";
import MobileMenuToggle from "./MobileMenuToggle";
import { getProfileSection } from "@/utils/profileData";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");

  const basics = getProfileSection("basics");
  const navigation = getProfileSection("navigation");

  // Track scroll position to change header styling
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY;

      // Determine which section is active
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        if (
          scrollPosition >= sectionTop - 100 &&
          scrollPosition < sectionTop + sectionHeight - 100
        ) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 backdrop-blur-sm bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-800`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <h1 className="text-xl font-bold tracking-tight">{basics.name}</h1>
        </a>

        {/* Desktop navigation with CV button */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-6 mr-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeSection === item.href.substring(1)
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={basics.resumeUrl}
            download
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow"
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
