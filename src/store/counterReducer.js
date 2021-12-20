const counterReducer = (state = 0, action) => {
    // verification si action existe si oui on execute
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "incrementByTen":
      return state + 10;
    case "decrementByTen":
      return state - 10;
    case "RESET":
      return (state = 0);
    default:
      return state;
  }
};

export default counterReducer;