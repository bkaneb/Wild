import React from "react";
import { connect } from "react-redux";

function Counter(props) {
  const { counter, dispatch } = props;
  const incrementAction = { type: "INCREMENT" };
  const decrementAction = { type: "DECREMENT" };
  const incrementByTenAction = { type: "incrementByTen" };
  const decrementByTenAction = { type: "decrementByTen" };
  const resetAction = { type: "RESET" };

  return (
    <div>
      <p>{counter}</p>
      <button type="button" onClick={() => dispatch(incrementAction)}>
        Incrément
      </button>
      <button type="button" onClick={() => dispatch(decrementAction)}>
        Décrémenter
      </button>
      <button type="button" onClick={() => dispatch(incrementByTenAction)}>
        Incrément de 10
      </button>
      <button type="button" onClick={() => dispatch(decrementByTenAction)}>
        Décrémenter de 10
      </button>
      <button type="button" onClick={() => dispatch(resetAction)}>
        Reset
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  counter: state,
});

const CounterContainer = connect(mapStateToProps)(Counter);

export default CounterContainer;
