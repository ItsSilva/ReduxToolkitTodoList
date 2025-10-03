import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Task = {
  id: number;
  title: string;
  description: string;
};

type InitialState = {
  tasks: Task[];
};

const initialState: InitialState = {
  tasks: [],
};

export const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    saveTasks: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { saveTasks, editTask, deleteTask } = toDoSlice.actions;

export default toDoSlice.reducer;