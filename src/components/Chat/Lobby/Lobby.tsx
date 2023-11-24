import { useState } from 'react';
import { TextField, Box } from '@mui/material';

import Button from '../../UI/Button/Button';


import cl from "./Lobby.module.scss"



const Lobby = ({ joinRoom }: any) => {
  const [userData, setUserData] = useState({ name: '', room: '' });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    joinRoom(userData.name, userData.room);
  };

  return (
    <form 
      onSubmit={handleFormSubmit}
      className={cl.MessageLobby}
    >
      <Box>
        <TextField
          label="Name"
          variant="outlined"
          onChange={(e) => setUserData((userData: any) => ({ ...userData, name: e.target.value }))}
          required
        />
      </Box>
      <Box mt={2}>
        <TextField
          label="Room"
          variant="outlined"
          onChange={(e) => setUserData((userData: any) => ({ ...userData, room: e.target.value }))}
          required
        />
      </Box>
      <Box mt={2}>
        <Button active type="submit" disabled={!userData.name || !userData.room}>
          Join
        </Button>
      </Box>
    </form>
  );
};

export default Lobby;