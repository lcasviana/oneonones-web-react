import React, { useState } from 'react';
import { Card, TextField } from '@material-ui/core';

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  return (
    <>
      <main>
        <Card>
          <TextField className="w-100" type="text" variant="outlined" value={username} onChange={(event) => setUsername(event.target.value)} />
          <TextField className="w-100" type="text" variant="outlined" value={password} onChange={(event) => setPassword(event.target.value)} />
          {/* <Button onClick={() => setHistoricalDeleteDialog(true)} startIcon={<ArrowForward />}>Login</Button> */}
        </Card>
      </main>
    </>
  );
};