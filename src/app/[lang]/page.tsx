import AboutMeSectionView from "@/components/sections/about-me-section/AboutMeSectionView";
import MainHeader from "@/components/layout/header/MainHeader";
import MainSectionView from "@/components/sections/main-section/MainSectionView";
import ProjectsSectionView from "@/components/sections/projects-section/ProjectsSectionView";
import WorkExperienceSectionView from "@/components/sections/work-experience-section/WorkExperienceSectionView";
import Footer from "@/components/layout/footer/Footer";
import { getDictionary } from "@/i18n/dictionaries";
import { i18n, isLocale, type Locale } from "@/i18n/config";

// Daily ISR so the dynamic "years of experience" figures stay current.
export const revalidate = 86400;

interface HomeProps {
  params: Promise<{ lang: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : i18n.defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <MainHeader dict={dict.header} locale={locale} />
      <main>
        <MainSectionView dict={dict.main} />
        <WorkExperienceSectionView dict={dict.workExperience} />
        <ProjectsSectionView dict={dict.projects} />
        <AboutMeSectionView dict={dict.aboutMe} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
