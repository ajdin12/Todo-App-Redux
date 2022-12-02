import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/todoSlice";
import { TextField } from "@mui/material";

const AddTodo = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    
    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = () => {
		dispatch(
			addTask({
				task: input
			})
		);
		setInput("");
    };

    return (
        <div>
            <div onSubmit={handleSubmit} style={{marginBottom: 30}}>
                <TextField 
                    fullWidth
                    type="text" 
                    value={input} 
                    name="text" 
                    onChange={handleChange}
                    variant="outlined"
                />
            </div>
            <div>
                <Button onClick={handleSubmit} variant="contained" style={{borderRadius: 50, backgroundColor: '#800080', position: 'absolute', marginTop: -17, marginLeft: 300}}>+ Add Todo</Button>
            </div>
       </div>
    );
} 

export default AddTodo;