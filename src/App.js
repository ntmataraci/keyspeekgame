import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { timeChange, resetTime,wordControl } from "./store/slice";
function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const getTime = useSelector((state) => state.counter.seconds);
  const targetWord=useSelector((state) => state.counter.targetWord);
  const correct=useSelector((state) => state.counter.correct);
  const mistake=useSelector((state) => state.counter.mistake);

  const [gamestart, setgameStart] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [endGame,setEndGame]=useState(false)
  const [keyCounter,setKeyCounter]=useState(0)
  const InputRef=useRef()


  useEffect(() => {
    if (gamestart && gamestart < 31) {
      const timer = setInterval(() => {
        dispatch(timeChange());
        setgameStart(gamestart + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  
    if (gamestart === 31) {
      setgameStart(0);
      setEndGame(true)
      setNewGame(true);
    }
  }, [gamestart]);




  const start = () => {
    if (!gamestart) {
      setgameStart(true);
    }
  };

  const newGameHandler = () => {
    for(let i=0;i<10;i++){
      document.getElementById(`list${i}`).style.color="black"
    }
    setNewGame(false);
    setEndGame(false)
    setKeyCounter(0)
    dispatch(resetTime());
  };

  const keyControl = (e) => {
    if (e.keyCode === 32||e.keyCode===13) {
      dispatch(wordControl(InputRef.current.value))
      if(InputRef.current.value.replace(" ","")===count[targetWord]){
        document.getElementById(`list${targetWord}`).style.color="green"
      }else{
        document.getElementById(`list${targetWord}`).style.color="red"
      }
      InputRef.current.value=""
      if (targetWord===9){
        setgameStart(0);
        setEndGame(true)
        setNewGame(true);
      }
    }
    if(e.keyCode!==32||e.keyCode!==13||e.keyCode!==8||e.keyCode!==46){
      setKeyCounter(prev=>prev+1)
    }
  };

  return (
    <div className="App">
           <h2 style={{marginTop:"3rem"}}>{count[targetWord]}</h2> 
           {endGame&&
           <>
           <h2>Score: {correct/10*100}%</h2>
           <h2>Key Count: {keyCounter}</h2>
           </>
           }
           <div><div>Correct: {correct}</div> Mistake :{mistake}</div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          margin: "3rem auto",
        }}
      >
        {count.map((item,idx) => (
          <div key={idx} id={`list${idx}`}>{item}</div>
        ))}
      </div>
      {!newGame ? (
        <input type="text" onChange={start} onKeyDown={keyControl} ref={InputRef}></input>
      ) : (
        <div onClick={newGameHandler}>New Game</div>
      )}
      <div>Seconds:{getTime}</div>
    </div>
  );
}

export default App;
