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
                id: action.payload.id,
                title: action.payload.task
            }
            const localStoragedData = window.localStorage.getItem('todo_save');
            let newLocalStorageData;
            if (localStoragedData) {
                 const parsedData = JSON.parse(localStoragedData);
                 parsedData.push(newTask);
                 newLocalStorageData = parsedData;
            } else {
                  newLocalStorageData = [newTask];
            }
            window.localStorage.setItem('todo_save', JSON.stringify(newLocalStorageData));
            state.push(newTask);
        },
        deleteTask: (state, action) => {
            const deleteTask = state.filter((item) => item.id !== action.payload.id);
            const localStoragedData = window.localStorage.getItem('todo_save');
            let newLocalStorageData;
            if (localStoragedData) {
                const parsedData = JSON.parse(localStoragedData);
                const removedNewTodo = parsedData.filter((item) => item.id !== action.payload.id);
                newLocalStorageData = removedNewTodo;
                console.log(removedNewTodo, 'obrisaniii')
            } else {
                newLocalStorageData = [];
            }
            window.localStorage.setItem('todo_save', JSON.stringify(newLocalStorageData));
            return deleteTask;
        },
        completeTodo : (state, action) => {
            const complete = state.map((todo) => {
                if (todo.id === action.payload.id) {
                    todo.isComplete = !todo.isComplete
                }
                return todo;
            });
            const localStoragedData = window.localStorage.getItem('todo_save');
                let newLocalStorageData;
                if (localStoragedData) {
                    const parsedData = JSON.parse(localStoragedData);
                    const parsedDataIndex = parsedData.map(todo => {
                        if(todo.id === action.payload.id) {
                            todo.isComplete = !todo.isComplete;
                        }
                        return todo;
                    })
                newLocalStorageData = parsedDataIndex;
                } else {
                newLocalStorageData = [];
                }
                window.localStorage.setItem('todo_save', JSON.stringify(newLocalStorageData));
            return complete;
        },
        editTodo: (state, action) => {
            return state.map((todo) => {
                if (todo.id === action.payload.editPopupOpen)
                  return {
                      ...todo, 
                      title: action.payload.input,
                  };
                  const localStoragedData = window.localStorage.getItem('todo_save');
                    let newLocalStorageData;
                    if (localStoragedData) {
                        const parsedData = JSON.parse(localStoragedData);
                        const index = parsedData.map(todo => todo.id).indexOf(action.payload.editPopupOpen);
                        if(parsedData[index]) {
                            parsedData[index].title = action.payload.input;
                            newLocalStorageData = parsedData;
                        } else {
                            newLocalStorageData = parsedData;
                        }
                    } else {
                    newLocalStorageData = [];
                    }    
                    window.localStorage.setItem('todo_save', JSON.stringify(newLocalStorageData));
                return todo;
            });
        }
    }
});

export const {listTodos, addTask, deleteTask, completeTodo, editTodo} = todoSlice.actions;

export const fetchTodos = () => (dispatch) => {
     axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=20"
    ).then(res => {
        const todos = res.data;
        const localStoragedData = window.localStorage.getItem('todo_save');
        if (localStoragedData) {
            try {
                const parsedData = JSON.parse(localStoragedData);
                dispatch(listTodos([...todos, ...parsedData]));
            } catch (e) {
                dispatch(listTodos(todos));
            }    
        } else {
            dispatch(listTodos(todos));
        }
    })
    
};

export default todoSlice.reducer;