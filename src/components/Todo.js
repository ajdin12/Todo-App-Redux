import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import { useDispatch } from "react-redux";
import { deleteTask, editTodo } from "../redux/todoSlice";
import { TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Todo = ({id, title, completeTodo}) => {
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
   
    const removeTodo = () => {
        dispatch(
            deleteTask({
                id: id
            })
        )
    }

    const editTodos = () => {
        dispatch(
            editTodo({
              editPopupOpen: editPopupOpen,
              input: input,
            })
        )
        setEditPopupOpen(false);
        setInput('');
    }

    const handleChange = e => {
        setInput(e.target.value);
    };
    
    return (
        <div>
            <div  style={{display:'flex', justifyContent: 'space-between', paddingLeft: 50, paddingRight: 50, height: 50}}>
                <div >
                    <Checkbox onClick={() => completeTodo()} />
                </div> 
                <div>
                    {id === editPopupOpen ?
                        <div>
                            <TextField 
                                style={{paddingTop: 9, paddingBottom: 9}}
                                fullWidth
                                type="text" 
                                value={input} 
                                name="text" 
                                onChange={handleChange}
                                variant="standard"
                            />
                        </div>
                        :
                        <div>
                            {title}
                        </div>
                    }
                </div>
                {id === deletePopupOpen ?
                <div style={{width: 150, height: 50, backgroundColor: 'white', position: 'absolute', marginLeft: 620, marginTop: 30, borderStyle: "groove", borderRadius: 10, display: 'grid', justifyContent: 'center'}}>
                    <div>
                        Are You Sure?
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div onClick={() => removeTodo(id)}>
                            Yes
                        </div>
                        <div onClick={() => setDeletePopupOpen(false)}>
                            No
                        </div>
                    </div>
                </div> : '' }
                <div>
                    {editPopupOpen === false ?
                        <EditIcon onClick={() => setEditPopupOpen(id)} />
                        :
                        id === editPopupOpen ?
                        <div style={{position: 'absolute', marginLeft: -200, paddingTop: 10}}>
                            <CheckIcon style={{paddingRight: 10}} onClick={() => editTodos()} />
                            <CloseIcon onClick={() => setEditPopupOpen(false)} />
                        </div>
                        : ''
                    }
                    {editPopupOpen !== id ?
                        <DeleteIcon style={{paddingLeft: 15}} onClick={() => setDeletePopupOpen(id)} />
                        : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo;