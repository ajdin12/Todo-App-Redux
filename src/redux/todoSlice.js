import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const todoSlice = createSlice({
    name: "tasks",
    initialState:[],
    reducers:{
        listTodos: (state, action) => {
            state = action.payload;
            return state;
        },
        addTask: (state, action) => {
            const newTask = {
                id: Math.floor(Math.random()),
                title: action.payload.task
            }
            state.push(newTask);
        },
        deleteTask: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
        completeTask : (state, action) => {
            return state.map((todo) => {
                if (todo.id === action.payload) {
                  return {
                    ...todo,
                    completed: true,
                  };
                }
                return todo;
            });
        },
        editTodo: (state, action) => {
            return state.map((todo) => {
                if (todo.id === action.payload.editPopupOpen)
                  return {
                      ...todo, 
                      title: action.payload.input,
                  };
                return todo;
            });
        }
    }
});

export const {listTodos, addTask, deleteTask, editTodo} = todoSlice.actions;

export const fetchTodos = () => (dispatch) => {
     axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=20"
    )
    .then(response => {
        dispatch(listTodos(response.data));
    })
    
};

export default todoSlice.reducer;