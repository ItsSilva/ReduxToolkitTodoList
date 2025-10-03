import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { setNameState, setDescriptionState } from "../redux/slices/authSlice";
import { useState } from "react";

const Login = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const [data, setData] = useState({
    name: "",
    description: "",
  });

  console.log(inputValue);

  //Traer valores del slice propiamente
  const name = useSelector((state: RootState) => state.auth.name);
  console.log(name);

  const description = useSelector((state: RootState) => state.auth.description);
  console.log(description);

  const dispatch = useDispatch();

  const handleName = () => {
    dispatch(setNameState(inputValue));
  };

  const handleDescription = () => {
    dispatch(setDescriptionState(inputDescription)); 
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData({ name: inputValue, description: inputDescription });
    console.log({ name: inputValue, description: inputDescription });
    setInputValue("");
    setInputDescription("");
  };

  return (
    <>
      <h2>Nombre: {data.name}</h2>
      <h2>Descripción: {data.description}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Descripción"
          value={inputDescription}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputDescription(e.target.value)
          }
        />
        <input type="submit" value="Enviar" />
      </form>
      <button
        onClick={() => {
          handleName();
          handleDescription();
        }}
      >
        Guardar en Redux
      </button>
    </>
  );
};

export default Login;