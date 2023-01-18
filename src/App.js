import { SplitScreen } from "./components/SplitScreen";
import {Container,Button,Stack,Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



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
    <div className="App">
      <header className="App-header">
      </header>
      {/* <SplitScreen left={LeftSide} right={RightSide} leftWeight={4} rightWeight={1}/>       */}
      <SplitScreen leftWeight={4} rightWeight={2}>
        <LeftSide message="hello from the left "/>
        <RightSide message="hello from the right" />
      </SplitScreen>

    </div>
  );
}

export default App;
