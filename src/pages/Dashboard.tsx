import { useEffect, useState } from "react";
import { localStorageService } from "../shared/helpers/localStorage";
import { useLoader } from "../shared/components/loader/loaderContext";

function Dashboard() {
  const [usersLists, setUsersListState] = useState<[]>([]);
  const { showLoader, hideLoader } = useLoader();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    showLoader();

    const userSettings = localStorageService.getUserSettings();
    const accessToken = userSettings ? userSettings?.accessToken : null;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    try {
      const response = await fetch(`${apiUrl}/all-profiles`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      setUsersListState(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error:", error.message);
        hideLoader();
      } else {
        console.error("Unknown error:", error);
        hideLoader();
      }
      throw error;
    } finally {
      hideLoader();
    }
  };

  return (
    <section>
      <h1>dashboard</h1>
      {/* {isLoading ? <div>Loading...</div> : ''} */}
    </section>
  );
}

export default Dashboard;
