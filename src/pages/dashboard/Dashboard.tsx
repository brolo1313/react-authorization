import { useEffect, useState } from "react";
import { IUser } from "../../shared/models/usersList";
import "./dashboard.css";
import { useGetApiData } from "../../hooks/useGetApiData";
import { useLoader } from "../../context/loaderContext";

function Dashboard() {
  const [usersLists, setUsersListState] = useState<IUser[]>([]);
  const [plans, setPlans] = useState<any>(null);
  const { isLoading } = useLoader();

  const { data: profiles, error: profilesError } =
    useGetApiData(`all-profiles`);

  const { data: plansData, error: plansError } = useGetApiData(`plans`);

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

  return (
    <>
      <section>
        {!isLoading && usersLists.length ? (
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
            {isLoading
              ? "Processing"
              : usersLists && usersLists.length === 0
              ? "No data"
              : ""}
          </div>
        )}
      </section>
    </>
  );
}

export default Dashboard;
