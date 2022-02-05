import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo'
import './App.css';
import db from './Firebase'
import firebase from 'firebase/app';
import 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  // when the app loads \, we need to listen to database and fetch
  // new todos as they get added/removed
  useEffect(() => {
    // this code here ...fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //  console.log(snapshot.docs.map(doc => doc.data())); 
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);
  
  const addTodo = (event) =>{
    // this will fire off when we click the button 
    // i will stop the refresh
    event.preventDefault();  
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([...todos, input]);
    setInput(''); // clear up the input after the submit click
      
  }
  return (
    <div className="App">
      <h1>TODO APP</h1>
      <form>
        
        <FormControl>
          <InputLabel>✔️Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}></Input>
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" type='submit' onClick={addTodo}>
          ADD todo
        </Button> 
        {/* <button ></button> */}
      </form>
     

      <ul>
        {todos.map(todo => (
          <Todo todo = {todo} />  
        ))}  
      </ul>
    </div>
  );
}

export default App;
