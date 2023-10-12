import Navigation from "./features/navigation/Navigation";
import BattlePage from "./features/battle/BattlePage";
import PokemonPage from "./features/pokemon/PokemonPage";
import SummonPage from "./features/summon/SummonPage";
import { Tab } from "./features/navigation/navigationSlice";
import { useAppSelector } from "./app/hooks";

function App() {
  const tab = useAppSelector((state) => state.navigation.tab);
  return (
    <div>
      <Navigation />
      {tab === Tab.Battle && <BattlePage />}
      {tab === Tab.Pokemon && <PokemonPage />}
      {tab === Tab.Summon && <SummonPage />}
    </div>
  );
}

export default App;
