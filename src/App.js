import { SplitScreen } from "./components/SplitScreen";
import {Container,Button,Stack,Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";



const LeftSide=({message})=>{
  return (
 <Container style={{ backgroundImage:`url('https://carswitch.com/newsroom/wp-content/uploads/2021/09/Future-Cars-Worth-Waiting-For-In-2021-2025-730-393-1280x720.jpg')` ,backgroundSize:'contain',backgroundRepeat:'repeat' }}>
    <h1 className='text-white'>
      this is the left side 
    </h1>
    <p  className=' lead text-white'>
      {message}
    </p>
    <Button variant="secondary">
      left
    </Button>

 </Container>
  )
}

const RightSide=({message})=>{
  return (
    <Container style={{  backgroundColor:'blue' }}>
       <h1 className="text-white">
         this is the righty side  
       </h1>
       <p className="lead text-white">{message}</p>
       <Button variant="danger">
         right
       </Button>
   
    </Container>
     )
}


function App() {
  return (
    <>

    <Router>

            <AuthContextProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </AuthContextProvider>
</Router>
    </>
  );
}

export default App;
