import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';
import { useDispatch } from "react-redux";
import { deleteTask, editTodo, completeTodo } from "../redux/todoSlice";
import { TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import styled from 'styled-components';

const DivBox = styled.div`
display: flex ;
justify-content: space-between;
padding-left: 50px;
padding-right: 50px;
`;
const DeleteBox = styled.div`
width: 150px;
height: 50px;
background-color: white;
position: absolute;
margin-left: 620px;
margin-top: 30px;
border-style: groove;
border-radius: 10px;
display: grid;
justify-content: center;
`;
const DeleteConfermationBox = styled.div`
display: flex;
justify-content: space-between;
`;

const Todo = ({id, title, complete }) => {
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

    const completeTask = () => {
        dispatch(
            completeTodo({
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
            <DivBox>
                {id !== editPopupOpen ?
                    <div >
                        <Checkbox onClick={() => completeTask(id)} checked={complete} />
                    </div> 
                    : ''
                }
                <div style={{width: '100%'}}>
                    {id === editPopupOpen ?
                        <div style={{display: 'flex', justifyContent: 'center'}}>
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
                            <div style={{ paddingTop: 10, paddingLeft: 30}}>
                                <CheckIcon style={{paddingRight: 10}} onClick={() => editTodos()} />
                                <CloseIcon onClick={() => setEditPopupOpen(false)} />
                            </div>
                        </div> 
                    :
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <p key={id}>{title}</p>
                    </div>
                    }
                </div>
                {id === deletePopupOpen ?
                <DeleteBox>
                    <div>
                        Are You Sure?
                    </div>
                    <DeleteConfermationBox>
                        <div onClick={() => removeTodo(id)}>
                            Yes
                        </div>
                        <div onClick={() => setDeletePopupOpen(false)}>
                            No
                        </div>
                    </DeleteConfermationBox>
                </DeleteBox> : '' }
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {editPopupOpen === false ?
                        <EditIcon onClick={() => {
                            setEditPopupOpen(id);
                            setInput(title);
                        }} />
                        : ''
                    }
                    {editPopupOpen !== id ?
                        <DeleteIcon style={{paddingLeft: 15}} onClick={() => setDeletePopupOpen(id)} />
                        : ''
                    }
                </div>
            </DivBox>
        </div>
    )
}

export default Todo;