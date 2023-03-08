import "./App.css";
import ListProduct from "./components/ProductList";
import React from "react";
import { useContext, createContext, useReducer } from "react";

const initialState = {
  count: 10,
  products: [],
};
export const AppContext = createContext();
const countReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PRODUCT": {
      return {
        ...state,
        products: payload,
      };
    }
    case "INCREMENT": {
      return {
        ...state,
        count: state.count,
      };
    }
    case "DECREMENT": {
      return {
        ...state,
        count: state.count,
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(countReducer, initialState);

  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>
      <ListProduct />
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

export default App;
