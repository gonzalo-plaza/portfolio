import AboutMeSectionView from "@/components/about-me-section/AboutMeSectionView";
import MainHeader from "@/components/header/MainHeader";
import MainSectionView from "@/components/main-section/mainSectionView";
import ProjectsSectionView from "@/components/projects-section/ProjectsSectionView";
import WorkExperienceSectionView from "@/components/work-experience-section/WorkExperienceSectionView";
import Footer from "@/components/footer/Footer";

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
