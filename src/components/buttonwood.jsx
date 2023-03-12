import "../App.css";
import woodenblock from "../images/md_5ab366bf3d512-removebg-preview.png";
function buttonwood(props){
    return(
        <>
    <div className='buttonwood'><button className="resetgame" onClick={props.reset}>Play Again</button><button className='changetheme' onClick={props.changetheme}>change theme</button><button className='resetscoreboard' onClick={props.resetscoreboard}>reset scoreboard</button></div>
    <div className='result'><img className="woodenblock" src={woodenblock} alt="" />
    <p>{props.result}</p>
    </div>
    </>);
}
export default buttonwood;