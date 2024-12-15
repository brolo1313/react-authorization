import { useEffect, useState } from "react";
import { IUser } from "../../shared/models/usersList";
import "./dashboard.css";
import { API_URL } from "../../config";
import { useGetApiData } from "../../hooks/useGetApiData";

function Dashboard() {
  const [usersLists, setUsersListState] = useState<IUser[]>([]);
  const [plans, setPlans] = useState<any>(null);

  const {
    data: profiles,
    isLoading: profilesLoading,
    error: profilesError,
  } = useGetApiData(`${API_URL}/all-profiles`);

  const {
    data: plansData,
    isLoading: plansLoading,
    error: plansError,
  } = useGetApiData(`${API_URL}/plans`);

  useEffect(() => {
    if (profiles) {
      setUsersListState(profiles);
    }

    if (profilesError) {
      console.error("Error fetching users:", profilesError);
    }
  }, [profiles, profilesError]);

  useEffect(() => {
    if (plansData) {
      setPlans(plansData);
    }

    if (plansError) {
      console.error("Error fetching plans:", plansError);
    }
  }, [plansData, plansError]);

  const isLoadingAllData: boolean = !!plansLoading && !!profilesLoading;

  return (
    <>
      <section>
        {!isLoadingAllData && usersLists.length ? (
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {usersLists.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-data">
            {isLoadingAllData ? "Processing" : "No data"}
          </div>
        )}
      </section>
    </>
  );
}

export default Dashboard;
