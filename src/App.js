import { SplitScreen } from "./components/SplitScreen";
import {Container,Button,Stack,Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import CustomersLists from "./customers/CustomersLists";
import { CustomerContextProvider } from "./Context/CustomerContext";
import Logout from "./Pages/Logout";



// const LeftSide=({message})=>{
//   return (
//  <Container style={{ backgroundImage:`url('https://carswitch.com/newsroom/wp-content/uploads/2021/09/Future-Cars-Worth-Waiting-For-In-2021-2025-730-393-1280x720.jpg')` ,backgroundSize:'contain',backgroundRepeat:'repeat' }}>
//     <h1 className='text-white'>
//       this is the left side 
//     </h1>
//     <p  className=' lead text-white'>
//       {message}
//     </p>
//     <Button variant="secondary">
//       left
//     </Button>

//  </Container>
//   )
// }

// const RightSide=({message})=>{
//   return (
//     <Container style={{  backgroundColor:'blue' }}>
//        <h1 className="text-white">
//          this is the righty side  
//        </h1>
//        <p className="lead text-white">{message}</p>
//        <Button variant="danger">
//          right
//        </Button>
   
//     </Container>
//      )
// }


function App() {
  return (
    <>

    <Router>

            <AuthContextProvider>
                <CustomerContextProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                  <Route path="/customers/page/:pageNumber" element={<CustomersLists />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
                </CustomerContextProvider>
            </AuthContextProvider>
</Router>
    </>
  );
}

export default App;
