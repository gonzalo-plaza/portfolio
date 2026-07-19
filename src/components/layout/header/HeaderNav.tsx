"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import styles from "@/styles/components/layout/header/main-header.module.scss";
import type { Dictionary } from "@/i18n/types";

interface HeaderNavProps {
  dict: Dictionary["header"];
}

const HeaderNav = ({ dict }: HeaderNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const links = [
    { href: "#work-experience", label: dict.experience, aria: dict.experienceAria },
    { href: "#projects", label: dict.projects, aria: dict.projectsAria },
    { href: "#about-me", label: dict.aboutMe, aria: dict.aboutMeAria },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div className={styles.headerNav} ref={containerRef}>
      <ul className={styles.headerNav__desktop}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={styles.mainNav__link}
              href={link.href}
              aria-label={link.aria}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        ref={toggleRef}
        type="button"
        className={styles.headerNav__toggle}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? dict.menuClose : dict.menuOpen}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        {isOpen ? <X aria-hidden /> : <Menu aria-hidden />}
      </button>

      {isOpen && (
        <ul id={menuId} className={styles.headerNav__dropdown}>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={styles.headerNav__dropdownLink}
                href={link.href}
                aria-label={link.aria}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

HeaderNav.displayName = "HeaderNav";

export default HeaderNav;
