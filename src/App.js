import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFaild":
      return { ...state, status: "error" };
    case "start" :
      return {...state, status: 'active'};
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  const numQuestion = questions.length;

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:9000/questions");
        const data = await response.json();
        //console.log(data);
        dispatch({ type: "dataRecived", payload: data });
      } catch (err) {
        //console.error("Error fetching data", err);
        dispatch({ type: "dataFaild" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestion={numQuestion}  dispatch = {dispatch} />}
        {status === 'active' && <Question />}
      </Main>
    </div>
  );
}
