/**
 * Shape of a translation dictionary. Every locale JSON file must satisfy this
 * contract, so a missing key in one language becomes a compile-time error.
 */

import type { SocialId } from "@/constants/social/social";

export interface AboutMeSegment {
  text: string;
  highlight?: boolean;
}

export interface WorkExperienceItemDictionary {
  subtitle: string;
  description: string;
}

export interface ProjectItemDictionary {
  title: string;
  description: string;
  imageAlt: string;
  previewTitle: string;
  gitHubTitle: string;
}

export interface Dictionary {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImageAlt: string;
    ogLocale: string;
  };
  header: {
    experience: string;
    experienceAria: string;
    projects: string;
    projectsAria: string;
    aboutMe: string;
    aboutMeAria: string;
    switchLanguageAria: string;
    menuOpen: string;
    menuClose: string;
    navLabel: string;
  };
  main: {
    imageAlt: string;
    greeting: string;
    role: string;
    description: string;
    social: Record<SocialId, { label: string; aria: string }>;
  };
  workExperience: {
    title: string;
    sectionAria: string;
    listAria: string;
    technologiesAria: string;
    skip: string;
    skipEnd: string;
    logoAlt: string;
    current: string;
    duration: {
      day: string;
      days: string;
      month: string;
      months: string;
      year: string;
      years: string;
      and: string;
    };
    items: Record<string, WorkExperienceItemDictionary>;
  };
  projects: {
    title: string;
    skip: string;
    skipEnd: string;
    visit: string;
    repository: string;
    visitAria: string;
    repositoryAria: string;
    items: Record<string, ProjectItemDictionary>;
  };
  aboutMe: {
    title: string;
    imageAlt: string;
    paragraphs: AboutMeSegment[][];
  };
  footer: {
    copyright: string;
    rights: string;
    linkedinAria: string;
    githubAria: string;
  };
  blog: {
    metaTitle: string;
    metaDescription: string;
    indexTitle: string;
    indexIntro: string;
    emptyState: string;
    readMore: string;
    readMoreAria: string;
    backToBlog: string;
    publishedOn: string;
    updatedOn: string;
    readingTime: string;
    readingTimeLabel: string;
    tagsLabel: string;
    breadcrumbHome: string;
    breadcrumbBlog: string;
    switchLanguageAria: string;
  };
}
