import React from 'react';
import { AppBar, Dialog, Grid, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { HistoricalModel } from '../../../Common/Models/Historical/HistoricalModel';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';
import { AuthenticationRepository } from '../../../Core/Repositories/AuthenticationRepository';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';

interface HistoricalObtainProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
  historical: HistoricalModel[];
}

export const HistoricalObtain: React.FC<HistoricalObtainProps> = ({ open, onClose, oneonone, historical }: HistoricalObtainProps) => {
  const user = AuthenticationRepository.user;

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <IconButton onClick={onClose} edge="start">
              <Close />
            </IconButton>
            <Typography variant="h6">
              Register one-on-one
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
              <Typography variant="caption" color="textSecondary">Occurrence</Typography>
              <Typography variant="body1">{FrequencyEnum[oneonone.frequency]}</Typography>
            </Grid>


          </Grid>

          <Grid item container xs={12} sm={12} md={6} lg={4} xl={3} className="flex flex-column">
            <Typography variant="caption" color="textSecondary">Historical</Typography>

            {!!historical?.length &&
              historical.map((h: HistoricalModel, index: number) => {
                const occurrence = h.occurrence ? new Date(h.occurrence).toISOString().substr(0, 10) : null;
                return (
                  <Grid key={index} item xs={12} sm={6} style={{ marginTop: '0.5rem' }}>
                    <Typography variant="body1">{occurrence}</Typography>
                    <Typography variant="body1" color="textSecondary">{h.commentary ? h.commentary : null}</Typography>
                  </Grid>
                );
              })
            }
            {!historical.length &&
              <Typography variant="body1" style={{ marginTop: '0.5rem' }}>Empty</Typography>
            }
          </Grid>

        </Grid>
      </Dialog>
    </>
  );
};