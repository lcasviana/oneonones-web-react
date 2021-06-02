import { Dialog, AppBar, Toolbar, IconButton, Typography, Grid, Button, TextField } from '@material-ui/core';
import { Close, Add } from '@material-ui/icons';
import React, { useState } from 'react';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';
import { AuthenticationRepository } from '../../../Core/Repositories/AuthenticationRepository';
import { HistoricalsRepository } from '../../../Core/Repositories/HistoricalsRepository';

interface HistoricalInsertProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
}

export const HistoricalInsert: React.FC<HistoricalInsertProps> = ({ open, onClose, oneonone }: HistoricalInsertProps) => {
  const user = AuthenticationRepository.user;
  const [occurrence, setOccurrence] = useState<Date | null>(null);
  const [commentary, setCommentary] = useState<string | null>(null);

  const insert = () => {
    if (occurrence === null) {
      alert('Bad request!');
      return;
    }

    HistoricalsRepository.insert({
      leaderId: oneonone.leader.id,
      ledId: oneonone.led.id,
      occurrence,
      commentary,
    })
      .then(_ => alert('Created!'))
      .catch((e: ErrorModel) => alert(e.errors[0]))
      .finally(close);
  };

  const clear = () => {
    setOccurrence(null);
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
              Register occurrence
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid container item xs={12} sm={12} md={6} lg={4} xl={3}>
            {user.id !== oneonone.leader.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Leader</Typography>
                <Typography variant="body1">{oneonone.leader.name}</Typography>
              </Grid>
            }

            {user.id !== oneonone.led.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Led</Typography>
                <Typography variant="body1">{oneonone.led.name}</Typography>
              </Grid>
            }

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">Frequency</Typography>
              <Typography variant="body1">{FrequencyEnum[oneonone.frequency]}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Typography variant="caption" color="textSecondary">When was yours meeting?</Typography>
            <TextField className="w-100" type="date" variant="outlined" size="small"
              value={occurrence?.toISOString().substr(0, 10)}
              onChange={(event) => setOccurrence(event.target.value ? new Date(event.target.value) : null)} />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Typography variant="caption" color="textSecondary">Leave a commentary!</Typography>
            <TextField className="w-100" type="text" variant="outlined" value={commentary} onChange={(event) => setCommentary(event.target.value)} />
          </Grid>

          <div className="flex mt2" style={{ gap: '1rem' }}>
            <Button onClick={close} startIcon={<Close />}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={insert} startIcon={<Add />}>Register</Button>
          </div>

        </Grid>
      </Dialog>
    </>
  );
}