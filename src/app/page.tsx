import AboutMeSectionView from "@/components/about-me-section/AboutMeSectionView";
import MainSectionView from "@/components/main-section/mainSectionView";
import ProjectsSectionView from "@/components/projects-section/ProjectsSectionView";
import WorkExperienceSectionView from "@/components/work-experience-section/WorkExperienceSectionView";

export default function Home() {
  return (
    <main>
      <MainSectionView />
      <WorkExperienceSectionView />
      <ProjectsSectionView />
      <AboutMeSectionView />
    </main>
  );
}
