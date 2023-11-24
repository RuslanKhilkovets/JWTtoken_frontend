import SendMessageForm from '../SendMessageForm/SendMessageForm';
import MessageContainer from '../MessageContainer/MessageContainer';
import ConnectedUsers from '../ConnectedUsers/ConnectedUsers';
import { Button } from '@mui/material';


import cl from "./Chat.module.scss"


const Chat = ({ sendMessage, messages, users, closeConnection }: any) => ( 
    <div className={cl.Chat}>
        <div className={cl.Chat__LeaveRoom}>
            <Button variant='outlined' color='error' onClick={() => closeConnection()}>Leave Room</Button>
        </div>
        <ConnectedUsers users={users} />
        <div className={cl.Chat__Messages}>
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
    </div>
)

export default Chat;