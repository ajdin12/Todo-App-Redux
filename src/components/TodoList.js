import React, { useEffect } from 'react';
import { useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos} from '../redux/todoSlice';

const TodoList = () => {
    const [showInput, setShowInput] = useState(false);
    const todos = useSelector((state)=>{
        return state.tasks;
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
        
    },[]);

    const handleClick = e => {
        setShowInput(true);
    };

    return (
        <div style={{backgroundColor: '#ffff', marginTop: 20, paddingTop: 20, marginBottom: 50}}>
            <div style={{marginBottom: 30}}>
                {todos.map((todo) => (
                    <Todo 
                        id={todo.id}
                        title={todo.title}
                        completeTodo={todo.status}
                  />
                ))}
                
            </div>
            <div style={{paddingLeft: 50, paddingRight: 50}}>
                {showInput === false ?
                    <Button onClick={handleClick} variant="contained" style={{borderRadius: 50, backgroundColor: '#800080', position: 'absolute', marginTop: -17, marginLeft: 300}}>
                    + New Task
                    </Button>
                    : ''
                }
             {showInput && <AddTodo  />}
            </div>
        </div>
    );
}

export default TodoList;