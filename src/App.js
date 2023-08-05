
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import CreateMovie from "./pages/CreateMovie";

function App() {
  return (
    
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/createMovie" element={<CreateMovie/>}/>
        </Routes>
      </Router>
    </div> 
    
  );
}

export default App;
