import "./App.css";
import Main from "./components/main";
import { createHashHistory } from "history";
import { Router } from "react-router-dom";

const customHistory = createHashHistory();
function App() {
  return (
    <Router history={customHistory}>
      <div className="App">
        <Main history={customHistory} />
      </div>
    </Router>
  );
}

export default App;
