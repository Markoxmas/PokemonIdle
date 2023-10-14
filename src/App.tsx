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

function App() {
  const dispatch = useAppDispatch();
  const tab = useAppSelector((state) => state.navigation.tab);

  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  return (
    <div>
      <Navigation />
      {tab === Tab.Battle && <BattlePage />}
      {tab === Tab.Pokemon && <PokemonPage />}
      {tab === Tab.Summon && <SummonPage />}
      {tab === Tab.Dev && <DevPage />}
      {tab === Tab.Upgrade && <UpgradePage />}
    </div>
  );
}

export default App;
