import {useState, useEffect} from "react"
import './App.css';
import SummonerForm from "./components/SummonerForm";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <SummonerForm />
      </header>
    </div>
  );
}

export default App;
