import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  return (
    <nav className="bg-black">
      <div className="fixed right-7 flex flex-col">
        <Link href="/dashboard#main">
          <Image
            className="mb-5"
            src="/leafButton.png"
            height={120}
            width={120}
            alt="leaf"
          />
        </Link>
        <Link href="/dashboard#deck">
          <Image
            className="mb-5"
            src="/roseButton.png"
            height={120}
            width={120}
            alt="rose"
          />
        </Link>
        <Link href="/">
          <Image src="/exitButton.png" height={120} width={120} alt="exit" />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
