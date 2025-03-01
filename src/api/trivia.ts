import TRIVIA from "../endpoints/trivia";

const triviaApi = {
  getQuestions: async () => {
    const response = await fetch(TRIVIA.questions);
    const data = await response.json();
    return data;
  },
};

export { triviaApi };
