import "../App.css";
import applepic from '../images/apple-PhotoRoom.png-PhotoRoom.png';
import orangepic from '../images/orangepic.png';
function instructionwood(props){
    return(
        <>
    <div className='instructionwood'>
   <div className='scoreboard'>Scoreboard:<br></br> A={props.wincountA} ,{" "} B={props.wincountB}</div>
    <div><p>Player A:</p><img src={applepic} alt=''></img></div>
    <div><p>Player B:</p><img src={orangepic} alt=''></img></div>
    
   </div>
   </>
    );
}
export default instructionwood;