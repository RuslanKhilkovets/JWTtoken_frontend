import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Lobby from '../../components/Chat/Lobby/Lobby';
import Chat from '../../components/Chat/Chat/Chat';
import cl from "./ChatPage.module.scss"
import { Button, Typography } from '@mui/material';




const ChatPage = () => {
    const [connection, setConnection] = useState();
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);


    const joinRoom = async (user: any, room: any) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/chat")
                .configureLogging(LogLevel.Information)
                .build();
            
            connection.on("ReceiveMessage", (user, message) => {
                setMessages((messages: any[]) => [...messages, { user, message }]);
            });
            
            connection.on("UsersInRoom", (users) => {
                setUsers(users);
            });
    
            connection.onclose(e => {
                setConnection(undefined);
                setMessages([]);
                setUsers([]);
            });
    
            await connection.start();
    
            await connection.invoke("JoinRoom", { user, room });
            
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    }
    
    const sendMessage = async (message: any) => {
        try {
            await connection.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    }

    const closeConnection = async () => {
        try {
            await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <div className={cl.ChatPage}>
            <div className={cl.ChatPage_Container}>
                <div className={cl.ChatPage__Header}>
                    <Typography variant="h3">
                        Online Chat
                    </Typography>

                </div>
                {!connection
                ? <Lobby joinRoom={joinRoom} />
                : <Chat sendMessage={sendMessage} messages={messages} users={users} closeConnection={closeConnection} />}
            </div>
        </div>
    )
}

export default ChatPage;