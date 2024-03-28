import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavigationBar from './components/Navbar';
import Connectivity from './pages/Connectivity';
import Application from './pages/Application';
import System from './pages/System';


function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/connectivity' element={<Connectivity />} />
          <Route path='/application' element={<Application />} />
          <Route path='/system' element={<System />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
