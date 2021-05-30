import React, { useState } from 'react';
import { AppBar, Button, Dialog, Grid, IconButton, TextField, Toolbar, Typography } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { HistoricalModel } from '../../../Common/Models/Historical/HistoricalModel';
import { HistoricalsRepository } from '../../../Core/Repositories/HistoricalsRepository';

interface HistoricalUpdateProps {
  open: boolean;
  onClose: () => void;
  historical: HistoricalModel;
}

export const OneononeUpdate: React.FC<HistoricalUpdateProps> = ({ open, onClose, historical }: HistoricalUpdateProps) => {
  const [commentary, setCommentary] = useState<string | null>(null);

  const register = () => {
    HistoricalsRepository.update({
      ...historical,
      commentary,
    })
      .then(() => alert('Updated!'))
      .catch((e) => {
        console.log(e);
        alert('Error!');
      })
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
              Register one-on-one
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Typography variant="caption" color="textSecondary">Leave a commentary</Typography>
            <TextField value={commentary} onChange={(event) => setCommentary(event.target.value)} />
          </Grid>

          <div className="flex" style={{ gap: '1rem' }}>
            <Button onClick={close} startIcon={<Close />} size="small">Cancel</Button>
            <Button onClick={register} startIcon={<Add />} size="small">Register</Button>
          </div>

        </Grid>
      </Dialog>
    </>
  );
}