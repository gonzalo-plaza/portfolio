export const revalidate = 86400;

import AboutMeSectionView from "@/components/sections/about-me-section/AboutMeSectionView";
import MainHeader from "@/components/layout/header/MainHeader";
import MainSectionView from "@/components/sections/main-section/MainSectionView";
import ProjectsSectionView from "@/components/sections/projects-section/ProjectsSectionView";
import WorkExperienceSectionView from "@/components/sections/work-experience-section/WorkExperienceSectionView";
import Footer from "@/components/layout/footer/Footer";

export default function Home() {
  return (
    <>
      <MainHeader />
      <main>
        <MainSectionView />
        <WorkExperienceSectionView />
        <ProjectsSectionView />
        <AboutMeSectionView />
      </main>
      <Footer />
    </>
  );
}
