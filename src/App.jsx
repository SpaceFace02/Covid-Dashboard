import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import { RevolvingDot } from "react-loader-spinner";
import "./index.css";

function App() {
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const data = fetch("https://opslyft-backend.herokuapp.com/coviddata");
    data
      .then((res) => res.json())
      .then((res) => {
        setApiData(res.data);
      });
  }, []);

  return (
    <div className="App">
      {/* <Navbar /> */}
      {apiData ? (
        <Dashboard apiData={apiData} />
      ) : (
        <div className="loading">
          <RevolvingDot color="#5566ff" height={100} width={100} />
        </div>
      )}
    </div>
  );
}

export default App;
