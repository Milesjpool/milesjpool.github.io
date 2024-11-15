import { MilesJPool } from "./MilesJPool";
import { NotionPost } from "./NotionPost";
import { WhatTheHex } from "./WhatTheHex";
import { OhYou } from "./OhYou";
import { HireAnApprentice } from "./HireAnApprentice";

export const CarouselItemSet = [
  <MilesJPool />,
  <NotionPost
    emoji="🎛️"
    title="Elevating my desk"
    headerImage="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf"
    href="https://milesjpool.notion.site/Elevating-my-desk-127ea37a280e808ab350ec64626f20ca"
    githubRepo={{ url: "https://github.com/Milesjpool/standing-desk" }}
  />,
  <WhatTheHex />,
  <NotionPost
    emoji="🧊"
    title="Colour distance calculation [pt. I]"
    headerImage="https://images.unsplash.com/photo-1502691876148-a84978e59af8"
    href="https://milesjpool.notion.site/Colour-distance-calculation-pt-I-4f116bfa10e2415d93c5e50ba10e3591"
  />,
  <OhYou />,
  <HireAnApprentice />,

  // TODO: potential additions
  // - Middle-class rhyming slang
  // - CV
  // - Stereotypical SAAS-startup style landing page 
]


