import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/todoSlice";
import { TextField } from "@mui/material";
import styled from 'styled-components';

const DivBox = styled.div`
    margin-bottom: 30px;
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

const AddTodo = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    
    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = () => {
		dispatch(
			addTask({
                id:  Math.floor(Math.random() * 10000),
				task: input
			})
		);
		setInput("");
    };

    return (
        <div>
            <DivBox onSubmit={handleSubmit}>
                <TextField 
                    fullWidth
                    type="text" 
                    value={input} 
                    name="text" 
                    onChange={handleChange}
                    variant="outlined"
                />
            </DivBox>
            <div>
                <Button onClick={handleSubmit} variant="contained" >+ Add Todo</Button>
            </div>
       </div>
    );
} 

export default AddTodo;