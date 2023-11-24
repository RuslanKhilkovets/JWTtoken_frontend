import { useEffect, useRef } from 'react';



import cl from "./MessageContainer.module.scss"



const MessageContainer = ({ messages }: any) => {

    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]); 


    return (
        <div ref={messageRef} className={cl.Message}>
            {messages.map((m: any, index: number) =>
                <div key={index} className={cl.Message__Message}>
                    <div className={cl.Message__MessageUserName}>{m.user}</div>
                    <div className={cl.Message__MessageText}>{m.message}</div>
                </div>
            )}
        </div>
    )
}




export default MessageContainer;