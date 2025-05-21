import { FC } from "react";
import SectionWrapper from "../Wrappers/SectionWrapper";
import AboutUsVideo from "../Widgets/AboutUsVideo";
import AdvantagesCardsGroup from "../Widgets/AdvantagesCardsGroup";
import PurposeCardsGroup from "../Widgets/PurposeCardsGroup";
import AboutUsCardsGroup from "../Widgets/AboutUsCardsGroup";

interface Props {
  coachesCount: number;
}

const AboutUs: FC<Props> = ({ coachesCount }) => {
  return (
    <SectionWrapper id="about" title="О нас">
      <AboutUsVideo />
      <AdvantagesCardsGroup coachesCount={coachesCount} />
      <PurposeCardsGroup />
      <AboutUsCardsGroup />
    </SectionWrapper >
  )
};

export default AboutUs;
