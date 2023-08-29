import React from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

const ToDo = (props)=>{
    return (
        <>
            <div className='listitem'>
                <IconButton aria-label="delete" size="large" onClick={ ()=>{props.onselect2(props.id)} }>
                    <EditNoteIcon fontSize="large" style={{color:"#03FC20"}} />
                </IconButton>
                
                <IconButton aria-label="delete" size="large"  onClick={ ()=>{props.onselect1(props.id)} }>    
                    <DeleteIcon style={{ color: "red" }} fontSize="inherit"  />
                </IconButton>
                    
                <li>{props.text}</li>

            </div>
        </>
    )
}
export default ToDo;
 