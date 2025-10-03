import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { increment } from "../redux/slices/counterSlice";
import { setNameState } from "../redux/slices/authSlice";
import { useState } from "react";

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);
  
  //Traer valores del slice propiamente
  const counter = useSelector((state: RootState) => state.counter.counterValue);
  const name = useSelector((state: RootState) => state.auth.name);

  //Para lanzar las acciones que cambian los valores del slice
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleName = () => {
    dispatch(setNameState(inputValue));
  };

  return (
    <>
      <h2>{name}</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
      />
      <button onClick={handleName}>Save name</button>
      <h1>{counter}</h1>
      <button onClick={handleIncrement}>Sumar counter</button>
    </>
  );
};

export default Login;
