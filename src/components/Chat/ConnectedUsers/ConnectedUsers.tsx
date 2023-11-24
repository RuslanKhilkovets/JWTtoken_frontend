import { Typography } from '@mui/material';

const ConnectedUsers = ({ users }) => (
  <div className='user-list'>
    <Typography variant="h6">Connected Users</Typography>
    {users.map((user: any, i: number) => (
      <Typography key={i} variant="subtitle1">
        {user}
      </Typography>
    ))}
  </div>
);

export default ConnectedUsers;
