import './App.css';
import SummonerForm from "./components/SummonerForm";
import SummonerPage from './components/SummonerPage';
import SummonerLobby from './components/SummonerLobby';

import {Route, BrowserRouter as Router, Routes} from "react-router-dom"

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="" element={<SummonerForm />} />
          <Route exact path={`/:name`} element={<SummonerPage />} />
          <Route exact path={`/:name/ActiveGame/*`} element={<SummonerLobby />} />
          <Route element={<SummonerForm />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
