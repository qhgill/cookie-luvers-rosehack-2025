import { getSession } from "next-auth/react"; // Import getSession

const Dashboard = async () => {
  const session = await getSession(); // Get the session for the current request

  if (!session) {
    // Redirect the user to the login page if not authenticated
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
