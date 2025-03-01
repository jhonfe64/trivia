import { useQuery } from "@tanstack/react-query";
import { triviaApi } from "../../../api/trivia";
import useQuestionStore from "../../../store/store";
import { SingleQuestion } from "../../../interfaces/interfaces";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Welcome = () => {
    
  const { setQuestions } = useQuestionStore((store) => store);
  const [information, setInformation] = useState([])


  const { data, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: triviaApi.getQuestions,
    staleTime: 0, 
  });



  
  
  const questions = () => {
    if (!isLoading && data) {
      const updatedData = data?.results?.map((question: SingleQuestion) => {
        return {
          ...question,
          burned: false,
        };
      });
      updatedData && setInformation(updatedData)
    }
  };



  useEffect(()=> {
    !isLoading && information.length > 0 && setQuestions(information);
  },[information, isLoading])

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center font-semibold text-7xl py-8 text-gray-700">
        Welcome to trivia
      </h1>
      <div onClick={questions}>
        <NavLink to="/play-trivia" className="bg-blue-600 hover:bg-blue-500 text-white p-3 py-2 rounded-lg text-lg">Start game</NavLink>
      </div>
    </div>
  );
};

export default Welcome;
