import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import io from "socket.io-client"
import {Widget, addResponseMessage} from "react-chat-widget"
import "react-chat-widget/lib/styles.css"

let allMessages = []
URL = "http://localhost:3001"
const socket = io(URL)
const WS = ()=>{
  const [myValue, setMyValue] = useState('');

  const handleNewUserMsg = (message)=>{
    console.log(message)
    socket.emit('message', {userId: myValue, msg: message})// this event name should match the one in the server
  };
  useEffect(()=>{
    socket.on('new-message', (message)=>{addResponseMessage(message)})
  },[])

  const handleSend = async(e) => {
    e.preventDefault()
    console.log(myValue)
  };
  return (
    <div className="App">
        <form onSubmit={handleSend}>
        <p>Enter other client id</p>
        <input
          value={myValue}
          onChange={
            (e) => {
              setMyValue(e.target.value)
            }
          }
          id="message"
        />
        <button>
          Click me
      </button>
      </form>
    <Widget
    handleNewUserMessage  = {handleNewUserMsg}/>
    </div>
  )
}
export default WS
