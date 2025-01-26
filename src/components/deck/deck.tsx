import DeckCard from "./deckCard";
import flowers from "@/data/flowers";
import { useState, useEffect } from "react";
const Deck = () => {
  const [session, setSession] = useState(null);
  const [collection, setCollection] = useState([]);
  const [unlock, setUnlocked] = useState("");

  useEffect(() => {
    // Fetch the session and tasks on component mount
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data?.user) {
        setSession(data);
        setCollection(data.user.collection || []); // Set tasks from session data
      }
    };

    fetchSession();
  }, []);

  return (
    <div className="mt-20 bg-[#FFF7EB] w-full flex flex-col items-center">
      <div className="w-1/10 text-[40px] text-white bg-[#63A443] mt-10 mb-4 py-3 px-7 rounded-3xl">
        My Roses
      </div>
      <div className="w-2/3 grid grid-cols-3 gap-10 justify-center m-5">
        {flowers.map((flower, index) => (
          <div>
            <div className="text-8xl text-black z-100">{collection[index]}</div>
            {collection[index] === false ? (
              <DeckCard key={index} image={flower.lockedimg} />
            ) : (
              <DeckCard key={index} image={flower.unlockedimg} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Deck;
