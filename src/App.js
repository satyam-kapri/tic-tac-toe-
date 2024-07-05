
import './App.css';
import applepic from './images/apple-PhotoRoom.png-PhotoRoom.png';
import orangepic from './images/orangepic.png';
import "./fonts/Thorn-4Bn19.ttf";
import Buttonwood from './components/buttonwood';
import { useState } from 'react';
import Instructionwood from './components/instructionwood.jsx';
import jungledark from './images/jungledarktheme.avif';
import junglelight from './images/jungle.avif';
import winaudio from './images/mixkit-ethereal-fairy-win-sound-2019.wav';
export default App;
function App() {
  // states----------------------------------------------
  const [A_turn,set_turn]=useState(true);
  const [array,setarray]=useState(Array(9).fill(null));
  const [result,setresult]=useState("Tic Tac Toe");
  const [count,setcount]=useState(0);
  const [wincountA,setwincountA]=useState(0);
  const [wincountB,setwincountB]=useState(0);
  const [theme,settheme]=useState("light");
  let wincomb=[-1,-1,-1];

  // grid animation-------------------------------------
  function gridanim(won){
    if(won==='reset'){
     
      document.documentElement.style.setProperty("--firstcolor", "rgba(221, 231, 245, 0.592)");
      let a=Array.from(document.getElementsByClassName("griditems"));
      a.forEach((e)=>{
        e.style.animationPlayState="paused";
        e.style.border="none";
      });
     
    }

    else{
    if(won==='A')
    document.documentElement.style.setProperty("--firstcolor", "red");
    else if(won==='B')
    document.documentElement.style.setProperty("--firstcolor", "orange");
    else if(won==='Draw')
    document.documentElement.style.setProperty("--firstcolor", "black");

    
    let a=Array.from(document.getElementsByClassName("griditems"));
    
      for(let i=0;i<9;i++){
        if(wincomb.includes(i))
        a[i].style.border="5px solid white";
        a[i].style.animationPlayState="running";
        
       }
    
   
  }
  }

  //result board animation-----------------------------------
  function resultboardanim(){
    let result=document.querySelector('.result');
    
    result.style.top="-250px";
    setTimeout(() => {
      result.style.top="0px";
    }, 400);
   
  }

   //handle click-------------------------------------
   function addappleororange(i){
    if(array[i]!==null)
    return;
    if(result==="A won" || result==="B won")
    return;

   let copyarray=[...array];
   copyarray[i]=applepic;
   setarray(copyarray);
    if(checkwinner(copyarray)===true){
    new Audio(winaudio).play();
    setresult("A won");resultboardanim(); gridanim('A');setwincountA(wincountA+1);
    return;
    }
    else{
      setcount(count+1);
     if(count>=4  ){
      
      setresult("Draw");resultboardanim(); gridanim('Draw');
      return;
     }}
   
      startai(copyarray);
  
  }
  function startai(copyarray2){
    let x=moveai(copyarray2);
    copyarray2[x]=orangepic;
      setarray(copyarray2);
    if(checkwinner(copyarray2)===true){
      new Audio(winaudio).play();
      setresult("B won");resultboardanim(); gridanim('B');setwincountA(wincountA+1);
    return;}
    else{
              setcount(count+1);
             if(count>=8){
              setresult("Draw");resultboardanim(); gridanim('Draw');
              return;
             }
            }
  }
  // ai move--------------------------------------------------
  function moveai(array1){
    
    let bestscore=-Infinity;
    let x;
    for(let i=0;i<9;i++){
        if(array1[i]==null){
          array1[i]=orangepic;
          let score=minimax(array1,false,0);
          array1[i]=null;
          if(bestscore<score){
            bestscore=score;
            x=i;
          }
      }
      
    }
   return x;
  }
  // minimax algo-----------------------------------------------------
  function minimax(arraycopy,ismax,depth){
    if(checkwinner(arraycopy)===true){
      if(!ismax)
      return 1; 
      else return -1;
    }
   else if(checktie(arraycopy)===true) 
   return 0;

    if(ismax){
      let bestscore=-Infinity;
      for(let i=0;i<9;i++)
     {
           if(arraycopy[i]===null){
            arraycopy[i]=orangepic;
            let score= minimax(arraycopy,false,depth+1);
            arraycopy[i]=null;
            bestscore=Math.max(score,bestscore);
           }
          
        }
        return bestscore;
      }
      
    else{
      let bestscore=Infinity;
        for(let j=0;j<9;j++){
           if(arraycopy[j]===null){
            arraycopy[j]=applepic;
            let score=minimax(arraycopy,true,depth+1);
            arraycopy[j]=null;
            bestscore=Math.min(score,bestscore);
           }
          
        }
      
      return bestscore;
    }
  }
// check winner----------------------------------------------
  function checkwinner(array2){ 
    const possiblewins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let win of possiblewins){
      const [a,b,c]=win;
      if(array2[a]!==null && array2[a]===array2[b] && array2[a]===array2[c]){
        wincomb=[a,b,c];
        return true;
      }
    }
    return false;
  }
  function checktie(a){
    let c=0;
    for(let i=0;i<9;i++){
      if(a[i]!==null)
      c++;
    }
    if(c===9)return true;
    return false;
  }
// reset-----------------------------------------------------------
function reset(){
  setarray(Array(9).fill(null));
  setresult("Tic Tac Toe");
  gridanim('reset');
  resultboardanim();
  setcount(0);
  set_turn(true);
}
// reset scoreboard---------------------------------------------------
function resetscoreboard(){
  setwincountA(0);
  setwincountB(0);
}
// change theme----------------------------------------------------------
function changetheme(){
  if(theme==='light')
 { document.body.style.setProperty('background-image',`url(${jungledark})`);settheme("dark");}
  else
  {document.body.style.setProperty('background-image',`url(${junglelight})`);settheme("light");}
  document.querySelector('.grid').style.transform="scale(0)";
  setTimeout(()=>{
    document.querySelector('.grid').style.transform="scale(1)";
  },300);
  
}
// render----------------------------------------------------------
  return (
    <>
    
    <Buttonwood wincountA={wincountA} wincountB={wincountB} reset={()=>reset()} resetscoreboard={()=>resetscoreboard()} result={result} changetheme={()=>changetheme()}/>
    
    <div className='tellmove'><p>{A_turn!==true?"A":"B"}{" : "}<img src={A_turn!==true?applepic:orangepic} alt=""></img><br></br>your move</p></div>
    <div className='grid'>
  <div className="griditems" onClick={()=>addappleororange(0)}>{array[0]!==null?<img src={array[0]} alt="" />:""}</div>
  <div className="griditems" onClick={()=>addappleororange(1)}>{array[1]!==null?<img src={array[1]} alt="" />:""}</div>
  <div className="griditems" onClick={()=>addappleororange(2)}>{array[2]!==null?<img src={array[2]} alt="" />:""}</div>
  <div className="griditems" onClick={()=>addappleororange(3)}>{array[3]!==null?<img src={array[3]} alt="" />:""}</div>
  <div className="griditems" onClick={()=>addappleororange(4)}>{array[4]!==null?<img src={array[4]} alt="" />:""}</div>
  <div className="griditems" onClick={()=>addappleororange(5)}>{array[5]!==null?<img src={array[5]} alt="" />:""}</div>
  <div className="griditems" onClick={()=>addappleororange(6)}>{array[6]!==null?<img src={array[6]} alt="" />:""}</div>
  <div className="griditems" onClick={()=>addappleororange(7)}>{array[7]!==null?<img src={array[7]} alt="" />:""}</div>
  <div className="griditems" onClick={()=>addappleororange(8)}>{array[8]!==null?<img src={array[8]} alt="" />:""}</div>
   </div>
   
   <Instructionwood wincountA={wincountA} wincountB={wincountB}/>
   </>
   
  );
}

   



