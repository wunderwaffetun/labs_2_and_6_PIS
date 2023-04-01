
import { Graph } from "./components/Graph";
import { Regulate } from "./components/Regulate";
import { BottomPanel } from "./components/BottomPanel";

function App() {
  return (
    <main>
      <div className="top-panel">
        <Graph />
        <Regulate />
      </div>
      <BottomPanel />
    </main>
  );
}

export default App;
