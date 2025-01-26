import Image, { StaticImageData } from "next/image";

const DeckCard = ({ image }: { image: StaticImageData }) => {
  return (
    <div className="flex justify-center h-[500px] py-10 bg-[#E8DAC5] rounded-md">
      <Image
        className="object-contain aspect-square"
        src={image}
        alt="flower"
      />
    </div>
  );
};

export default DeckCard;
