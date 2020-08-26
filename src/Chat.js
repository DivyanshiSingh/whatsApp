import React, {useEffect, useState} from 'react';
import "./Chat.css";
import {Avatar, IconButton} from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons';
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticonOutlined";
import MicIcon from "@material-ui/icons/Mic";
import {useParams} from "react-router-dom";
import db from './firebase';
import { userInfo } from 'os';
import firebase from "firebase";
import {useStateValue} from "./StateProvider";


function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] =useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() =>{
        console.log("mounted");
    }, []);

    useEffect(()=>{
        if(roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name)
            );
            db.collection('rooms')
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc)=> doc.data()))
            );

        }

    }, [roomId]);

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId]);



    const sendMessage = (e) =>{
        e.preventDefault ();
        console.log("You typed",input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: userInfo.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),

        });

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "} 
                 {/* ======================== ERROR ================= */}
                   
                    </p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>


                </div>
            </div>
            <div className="chat_body">
                {messages.map(message=>(
                    <p className={`chat_message
                    ${message.name === userInfo.displayName && "chat_reciever"}`}>

                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        3:52pm;


                        {/* ======================== ===================ERROR TIMESTAMP=============*/}
                        {/* {new Date(message.timestamp ?.toDate()).toUTCString()} */}


                    </span>
                    </p>

                ))}
                
                
                
            </div>
            <div className="chat_footer">
                <InsertEmotionIcon/>
                <form>
                    <input value={input} 
                    onChange={(e)=>setInput(e.target.value)}
                    placeholder="Type a message" 
                    type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>

                </form>
                <MicIcon/>
                
            </div>
            
        </div>
    )
}

export default Chat;
