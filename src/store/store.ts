import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SingleQuestion } from "../interfaces/interfaces";

interface QuestionsState {
  questions: SingleQuestion[];
  setQuestions: (questions: SingleQuestion[]) => void;
  setBurnedQuestion: (currentQuestion: SingleQuestion) => void;
}

const useQuestionStore = create<QuestionsState>()(
  persist(
    (set) => ({
      questions: [],
      setQuestions: (questions: SingleQuestion[]) => set({ questions }),

      setBurnedQuestion: (currentQuestion: SingleQuestion) => {
        set((state) => {
          const updatedQuestions = state.questions.map((question) => {
            if (
              currentQuestion.question === question.question &&
              !question?.burned
            ) {
              return {
                ...question,
                burned: true,
              };
            } else {
              return question;
            }
          });
          return { questions: updatedQuestions };
        });
      },
    }),
    {
      name: "questions-storage",
    }
  )
);

export default useQuestionStore;


