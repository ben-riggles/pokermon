import './App.css';
import LandingPage from '@/components/pages/LandingPage';
import GameConsole from './components/game_console/GameConsole';

function App() {
  return (
  <>
  
  <GameConsole game={<LandingPage />}/>
  </>);
}

export default App;
