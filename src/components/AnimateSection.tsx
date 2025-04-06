"use client";

import { useRef, useEffect } from "react";

export default function AnimateSection({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(section);
        }
      });
    }, observerOptions);

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`opacity-0 translate-y-4 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </section>
  );
}
