
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import CreateMovie from "./pages/CreateMovie";
import MovieDetail from "./components/MovieDetail";
import Navbar from "./components/Navbar";



function App() {


  return (
    
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/createMovie" element={<CreateMovie/>}/>
        <Route path="/movie/:id" element={<MovieDetail/>}/>
        </Routes>
      </Router>
    </div> 
    
  );
}

export default App;
