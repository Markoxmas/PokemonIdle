import Navigation from "./features/navigation/Navigation";
import BattlePage from "./features/battle/BattlePage";
import PokemonPage from "./features/pokemon/PokemonPage";
import SummonPage from "./features/summon/SummonPage";
import DevPage from "./features/dev/DevPage";
import UpgradePage from "./features/upgrade/UpgradePage";
import { Tab } from "./features/navigation/navigationSlice";
import { useAppSelector } from "./app/hooks";
import { useEffect } from "react";
import { initializeApp } from "./features/init/initSlice";
import { useAppDispatch } from "./app/hooks";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import { AuthNav } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const tab = useAppSelector((state) => state.navigation.tab);
  const { authNav } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  return (
    <div>
      {token ? (
        <>
          <Navigation />
          {tab === Tab.Battle && <BattlePage />}
          {tab === Tab.Pokemon && <PokemonPage />}
          {tab === Tab.Summon && <SummonPage />}
          {tab === Tab.Dev && <DevPage />}
          {tab === Tab.Upgrade && <UpgradePage />}
        </>
      ) : (
        <>
          {authNav === AuthNav.Login && <Login />}
          {authNav === AuthNav.Register && <Register />}
        </>
      )}
    </div>
  );
}

export default App;
