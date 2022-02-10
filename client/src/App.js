import './App.css';
import MainMenu from './components/MainMenu';
import Switcher from './utils/switcher';
import axios from "axios";

axios.defaults.withCredentials=true;

function App() {
  return (
    <div className="App">
      <MainMenu></MainMenu>
      <Switcher></Switcher>
    </div>
  );
}

export default App;
