import { List, ListItemText, ListItem, ListItemAvatar, Button, Modal, makeStyles} from '@material-ui/core'
import React, { useState } from 'react'
import db from './Firebase'
import './Todo.css'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1.5px solid #00308F',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    list: {
        fontFamily: 'Shizuru'
    }
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleOpen = () => {
        setOpen(true);
    };
    
    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})
        setOpen(false);
    } 
    

    return (
        <>
        <Modal open={open} onClose={e=>setOpen(false)}>
            <div className={classes.paper}>
                <h1>UPDATE THIS TODO</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update</Button>
            </div>
        </Modal>
        <List className="todo_list">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText className = {classes.list} primary = {props.todo.todo} secondary = "Do it by the time⏰" />
            </ListItem>
            <Button onClick={e=>setOpen(true)}>✏️</Button>
            <Button onClick={
                event => 
                db.collection('todos').doc(props.todo.id).delete()}>
                    🗑️
                </Button>
        </List>
        </> 
    )
}

export default Todo

