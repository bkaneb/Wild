const counterRender = document.getElementById("counter-render");
const incrementButton = document.getElementById("button-increment");
const decrementButton = document.getElementById("button-decrement");
const incrementButtonByTen = document.getElementById("button-incrementByTen");
const decrementButtonByTen = document.getElementById("button-decrementByTen");
const resetButton = document.getElementById("button-reset");
// création du store
const { createStore } = Redux;
const initialState = 0;

const counterReducer = (state = initialState, action) => {
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
// utilise la fonction en parametre
const store = createStore(counterReducer);

// action :
const incrementAction = {
  type: "INCREMENT",
};
const decrementAction = {
  type: "DECREMENT",
};
const incrementByTenAction = {
  type: "incrementByTen",
};
const decrementByTenAction = {
  type: "decrementByTen",
};
const resetAction = {
  type: "RESET",
};
// changement de la valeur du paragraphe avec la valeur du state
const render = () => (counterRender.innerText = store.getState());
// permet de lancer la fonction render a chaque fois
// que l'état(state) change
render();
store.subscribe(render);

incrementButton.addEventListener("click", () => {
  store.dispatch(incrementAction);
});

decrementButton.addEventListener("click", () => {
  store.dispatch(decrementAction);
});

incrementButtonByTen.addEventListener("click", () => {
  store.dispatch(incrementByTenAction);
});

decrementButtonByTen.addEventListener("click", () => {
  store.dispatch(decrementByTenAction);
});

resetButton.addEventListener("click", () => {
  store.dispatch(resetAction);
});
