import React, { useEffect } from 'react';
import { useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos} from '../redux/todoSlice';
import styled from 'styled-components';

const DivBox = styled.div`
        background-color: #ffff;
        margin-top: 20px;
        padding-top: 20px;
        margin-bottom: 50px;
    `;
    const DivTodo = styled.div`
        margin-bottom: 30px;
    `;
    const DivAddTodo = styled.div`
        padding-left: 50px;
        padding-right: 50px;
    `;
    const Button = styled.button`
        border-radius: 50px;
        background-color: #800080;
        color: white;
        position: absolute;
        margin-top: -17px;
        margin-left: 300px;
        padding: 0.50em 1.5em;
    `;

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
        <DivBox>
            <DivTodo>
                {todos.map((todo) => (
                    <Todo 
                        id={todo.id}
                        title={todo.title}
                        complete={todo.isComplete}
                  />
                ))}
                
            </DivTodo>
            <DivAddTodo>
                {showInput === false ?
                    <Button onClick={handleClick} variant="contained">
                        + New Task
                    </Button>
                    : ''
                }
             {showInput && <AddTodo  />}
            </DivAddTodo>
        </DivBox>
    );
}

export default TodoList;