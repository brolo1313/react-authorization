import { useEffect, useState } from "react";
import { IUser } from "../../shared/models/usersList";
import "./dashboard.css";
import { useGetApiData } from "../../hooks/useGetApiData";
import { useLoader } from "../../context/loaderContext";
import UserList from "../../components/UsersList";

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
    <section>
      <UserList
        users={usersLists}
        isLoading={isLoading}
      />
    </section>
  );
}

export default Dashboard;
