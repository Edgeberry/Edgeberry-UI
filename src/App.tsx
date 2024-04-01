/*
 *  Edge Gateway UI
 *  User interface for the Edge Gateway application.
 * 
 *  Copyright 2024, Sanne 'SpuQ' Santens
 * 
 *  THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
 *  LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 *  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 *  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 *  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
        <br/>
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
