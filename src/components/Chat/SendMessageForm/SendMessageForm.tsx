import { TextField } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/material';



import cl from "./SendMessageForm.module.scss"


const SendMessageForm = ({ sendMessage }: any) => {
  const [message, setMessage] = useState('');

  return (
    <form
      className={cl.SendMessageForm}
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
    >
      <TextField
        className={cl.SendMessageForm__MessageInput}
        type="user"
        variant="outlined"
        fullWidth
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        placeholder='Enter message...'
      />
      <Button
        className={cl.SendMessageForm__SendButton}
        variant="contained"
        color="primary"
        type="submit"
        disabled={!message}
        style={{ marginTop: '10px' }}
      >
        Send
      </Button>
    </form>
  );
};

export default SendMessageForm;
