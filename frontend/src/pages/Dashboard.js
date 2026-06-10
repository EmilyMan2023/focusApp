function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Hello {user?.display_name || "Guest"}</h1>

      <button onClick={logout}>Logout</button>

      <h2>Focus App Dashboard</h2>
    </div>
  );
}

export default Dashboard;