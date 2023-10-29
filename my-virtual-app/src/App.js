
import './App.css';
import Login from './components/login/Login';

import Home from './pages/home/Home'
import Join from './pages/join/Join'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from 'react-router-dom';
import UserPanel from './pages/userPanel/UserPanel';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />  
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/join" element={<Join/>} />
          <Route exact path="/userpanel" element={<UserPanel/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App;
