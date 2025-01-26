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
    stage1img: roseSeed,
    stage2img: roseStem,
    stage3img: roseRedBud,
    stage4img: roseRedFull,
  },
  {
    name: "pink",
    rarity: "common",
    stage1img: roseSeed,
    stage2img: roseStem,
    stage3img: rosePinkBud,
    stage4img: rosePinkFull,
  },
  {
    name: "blue",
    rarity: "common",
    stage1img: roseSeed,
    stage2img: roseStem,
    stage3img: roseBlueBud,
    stage4img: roseBlueFull,
  },
];

export default flowers;
