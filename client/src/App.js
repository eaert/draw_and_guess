import './App.css';
import MainMenu from './components/MainMenu';
import Switcher from './utils/switcher';
import axios from "axios";

import background from './assets/imgs/mainBackground.jpg'

axios.defaults.withCredentials=true;

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', height: '100vh'}}>
      <MainMenu></MainMenu>
      <Switcher></Switcher>
    </div>
  );
}

export default App;
