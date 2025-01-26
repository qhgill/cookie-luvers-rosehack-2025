import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { handler } from "@/app/api/auth/[...nextauth]/route";

const Deck = async () => {
  // Get the session on the server
  const session = await getServerSession(handler);

  if (!session) {
    // If no session, show a message or redirect the user
    return (
      <div>
        <h1>You need to be logged in to view the deck</h1>
        <a className="text-lg p-4 bg-blue-400" href="/login">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to your deck, {session.user.name}!</h1>
      <Link className="text-lg text-bold bg-blue-400 p-3" href="/dashboard">
        go to dashboard
      </Link>
    </div>
  );
};

export default Deck;
