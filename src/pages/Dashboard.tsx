import { useEffect, useState } from "react";
import { localStorageService } from "../shared/helpers/localStorage";

function Dashboard() {
  const [usersLists, setUsersListState] = useState<[]>([]);
  const [isLoading, setIsLoadingState] = useState<boolean>(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoadingState(true);

    const userSettings = localStorageService.getUserSettings();
    const accessToken = userSettings ? userSettings?.accessToken : null;
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    try {
      const response = await fetch(
        apiUrl,
        {
          method: "GET",
          headers: headers
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      setUsersListState(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
        setIsLoadingState(false);
      } else {
        console.error("Unknown error:", error);
        setIsLoadingState(false);
      }
      throw error;
    } finally {
      setIsLoadingState(false);
    }
  };

  return (
    <section>
      <h1>dashboard</h1>
      {isLoading ? <div>Loading...</div> : usersLists}
    </section>
  );
}

export default Dashboard;
