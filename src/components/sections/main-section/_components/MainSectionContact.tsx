import Button from "@/components/ui/atoms/Button";
import { SOCIAL_LINKS } from "@/constants/social/social";
import type { Dictionary } from "@/i18n/types";

import styles from "@/styles/components/sections/main-section/main-section-view.module.scss";

interface MainSectionContactProps {
  dict: Dictionary["main"]["social"];
}

const MainSectionContact = ({ dict }: MainSectionContactProps) => {
  return (
    <ul className={styles.mainSectionDescription__contact}>
      {SOCIAL_LINKS.map(({ id, href, external, Icon }) => (
        <li key={id}>
          <Button asChild>
            <a
              href={href}
              aria-label={dict[id].aria}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon width={20} height={20} aria-hidden />
              <span>{dict[id].label}</span>
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
};

MainSectionContact.displayName = "MainSectionContact";

export default MainSectionContact;
