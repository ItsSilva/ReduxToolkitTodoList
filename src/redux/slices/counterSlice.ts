//Un slice es un mini contexto, es una parte pequeña que forma el estado global. El estado global es el total de los slices.
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  counterValue: number;
};

//Estado inicial
const initialState: InitialState = {
  counterValue: 0,
};

// 1. Darle un nombre al slice
// 2. Pasar el estado inicial
// 3. Crear el reducer con las actions
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  //Reducer contiene las actiones para determinar que es lo que cambia del estado inicial
  reducers: {
    //Actions
    increment: (state) => {
      state.counterValue++;
    },
    decrement: (state) => {
      state.counterValue--;
    },
  },
});

//Destructurar las actions para exportarlas de manera individual
export const { increment, decrement } = counterSlice.actions;

//Exportar el reducer del slice
export default counterSlice.reducer;
