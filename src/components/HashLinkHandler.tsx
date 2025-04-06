"use client";

import { useEffect } from "react";

export default function HashLinkHandler() {
  useEffect(() => {
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" &&
        target.getAttribute("href")?.startsWith("#")
      ) {
        const href = target.getAttribute("href");
        const sectionId = href?.substring(1);
        const section = document.getElementById(sectionId || "");

        if (section) {
          e.preventDefault();
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update URL without reloading the page
          window.history.pushState({}, "", href);
        }
      }
    };

    document.addEventListener("click", handleHashLinkClick);

    return () => {
      document.removeEventListener("click", handleHashLinkClick);
    };
  }, []);

  return null; // This component doesn't render anything
}
