import roseSeed from "@/public/roseSeed.png";
import roseStem from "@/public/roseStem.png";
import roseRedBud from "@/public/roseRedBud.png";
import roseRedFull from "@/public/roseRedFull.png";
import roseBlueBud from "@/public/roseBlueBud.png";
import roseBlueFull from "@/public/roseBlueFull.png";
import rosePinkBud from "@/public/rosePinkBud.png";
import rosePinkFull from "@/public/rosePinkFull.png";

const flowers = [
  {
    name: "red",
    rarity: "common",
    images: [roseSeed, roseStem, roseRedBud, roseRedFull],
    lockedimg: roseSeed,
    unlockedimg: roseRedFull,
  },
  {
    name: "pink",
    rarity: "common",
    images: [roseSeed, roseStem, rosePinkBud, rosePinkFull],
    lockedimg: roseSeed,
    unlockedimg: rosePinkFull,
  },
  {
    name: "blue",
    rarity: "common",
    images: [roseSeed, roseStem, roseBlueBud, roseBlueFull],
    lockedimg: roseSeed,
    unlockedimg: roseBlueFull,
  },
];

export default flowers;
