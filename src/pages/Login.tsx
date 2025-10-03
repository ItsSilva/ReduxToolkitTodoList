import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { setNameState } from "../redux/slices/authSlice";
import { useState } from "react";

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);
  
  //Traer valores del slice propiamente
  const name = useSelector((state: RootState) => state.auth.name);

  //Para lanzar las acciones que cambian los valores del slice
  const dispatch = useDispatch();

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
    </>
  );
};

export default Login;
