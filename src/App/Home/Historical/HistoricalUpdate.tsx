import React, { useState } from 'react';
import { AppBar, Button, Dialog, Grid, IconButton, TextField, Toolbar, Typography } from '@material-ui/core';
import { Add, Close, Update } from '@material-ui/icons';
import { HistoricalModel } from '../../../Common/Models/Historical/HistoricalModel';
import { HistoricalsRepository } from '../../../Core/Repositories/HistoricalsRepository';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { AuthenticationRepository } from '../../../Core/Repositories/AuthenticationRepository';

interface HistoricalUpdateProps {
  open: boolean;
  onClose: () => void;
  historical: HistoricalModel;
}

export const HistoricalUpdate: React.FC<HistoricalUpdateProps> = ({ open, onClose, historical }: HistoricalUpdateProps) => {
  const user = AuthenticationRepository.user;
  const [commentary, setCommentary] = useState<string | null>(null);

  const update = () => {
    HistoricalsRepository.update({
      ...historical,
      commentary,
    })
      .then(() => alert('Updated!'))
      .catch((e: ErrorModel) => alert(e.errors[0]))
      .finally(close);
  };

  const clear = () => {
    setCommentary(null);
  };

  const close = () => {
    clear();
    onClose();
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={close}>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <IconButton onClick={close} edge="start">
              <Close />
            </IconButton>
            <Typography variant="h6">
              Change historical
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid container item xs={12} sm={12} md={6} lg={4} xl={3}>
            {user.id !== historical.leader.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Leader</Typography>
                <Typography variant="body1">{historical.leader.name}</Typography>
              </Grid>
            }

            {user.id !== historical.led.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Led</Typography>
                <Typography variant="body1">{historical.led.name}</Typography>
              </Grid>
            }

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">Occurrence</Typography>
              <Typography variant="body1">{historical.occurrence.toISOString().substr(0, 10)}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Typography variant="caption" color="textSecondary">Leave new commentary</Typography>
            <TextField value={commentary} onChange={(event) => setCommentary(event.target.value)} />
          </Grid>

          <div className="flex mt2" style={{ gap: '1rem' }}>
            <Button onClick={close} startIcon={<Close />} size="small">Cancel</Button>
            <Button variant="contained" color="primary" onClick={update} startIcon={<Update />}>Update</Button>
          </div>

        </Grid>
      </Dialog>
    </>
  );
}