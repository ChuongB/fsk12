// Counter.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counterSlice";
import { useSelector } from "react-redux";
export default function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  console.log(counter);

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          + Click
        </button>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(decrement())}
        >
          - Click
        </button>
      </div>
    </div>
  );
}
