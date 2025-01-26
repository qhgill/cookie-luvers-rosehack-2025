import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Dashboard = async () => {
  // Get the session on the server
  const session = await getServerSession(authOptions);

  if (!session) {
    // If no session, show a message or redirect the user
    return (
      <div>
        <h1>You need to be logged in to view the dashboard</h1>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to your dashboard, {session.user.name}!</h1>
    </div>
  );
};

export default Dashboard;
