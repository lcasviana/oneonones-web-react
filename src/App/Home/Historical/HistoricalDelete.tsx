import React from 'react';
import { AppBar, Button, Dialog, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { HistoricalsRepository } from '../../../Core/Repositories/HistoricalsRepository';
import { HistoricalModel } from '../../../Common/Models/Historical/HistoricalModel';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { AuthenticationRepository } from '../../../Core/Repositories/AuthenticationRepository';

interface HistoricalDeleteProps {
  open: boolean;
  onClose: () => void;
  historical: HistoricalModel;
}

export const HistoricalDelete: React.FC<HistoricalDeleteProps> = ({ open, onClose, historical }: HistoricalDeleteProps) => {
  const user = AuthenticationRepository.user;

  const remove = () => {
    HistoricalsRepository.delete(historical.id)
      .then(() => alert('Deleted!'))
      .catch((e: ErrorModel) => alert(e.errors[0]))
      .finally(onClose);
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <IconButton onClick={onClose} edge="start">
              <Close />
            </IconButton>
            <Typography variant="h6">
              Cancel historical
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

          <div className="flex mt2" style={{ gap: '1rem' }}>
            <Button onClick={onClose} startIcon={<Close />} size="small">Cancel</Button>
            <Button variant="contained" color="primary" onClick={remove} startIcon={<Delete />}>Remove</Button>
          </div>

        </Grid>
      </Dialog>
    </>
  );
}