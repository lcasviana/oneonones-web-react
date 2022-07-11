import { Typography, Grid, Button, TextField, Divider } from '@mui/material';
import { Close, EventAvailable } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';
import { AppState } from '../../../Core/Redux/Store';
import { HistoricalsRepository } from '../../../Core/Repositories/HistoricalsRepository';
import { ActionDialog } from '../../Shared/ActionDialog';
import { DashboardsRepository } from '../../../Core/Repositories/DashboardsRepository';
import { getDashboard } from '../../../Core/Redux/DashboardSlice';

interface HistoricalInsertProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
}

const HistoricalInsertForm = ({ occurrence, setOccurrence, commentary, setCommentary }: any) => (
  <>
    <Grid item xs={12}>
      <Typography variant="caption" color="textSecondary">When was yours meeting?</Typography>
      <TextField className="w-100" type="date" variant="outlined" size="small"
        value={occurrence?.toISOString().substr(0, 10)}
        onChange={(event) => setOccurrence(event.target.value ? new Date(event.target.value) : null)} />
    </Grid>

    <Grid item xs={12}>
      <Typography variant="caption" color="textSecondary">Leave a commentary!</Typography>
      <TextField className="w-100" type="text" variant="outlined" value={commentary} onChange={(event) => setCommentary(event.target.value)} />
    </Grid>
  </>
);

export const HistoricalInsert: React.FC<HistoricalInsertProps> = ({ open, onClose, oneonone }: HistoricalInsertProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.user);

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
      .then(_ => {
        DashboardsRepository.obtainById(user!.id)
          .then((dashboard) => dispatch(getDashboard(dashboard)));
        alert('Created!');
      })
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
      <ActionDialog open={open} onClose={onClose} title={'Register occurrence'}>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid container item xs={12}>
            {user!.id !== oneonone.leader.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Leader</Typography>
                <Typography variant="body1">{oneonone.leader.name}</Typography>
              </Grid>
            }

            {user!.id !== oneonone.led.id &&
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

          <Divider />

          <HistoricalInsertForm occurrence={occurrence} setOccurrence={setOccurrence} commentary={commentary} setCommentary={setCommentary} />

          <div className="flex mt2 justify-end" style={{ gap: '1rem' }}>
            <Button onClick={close} startIcon={<Close />}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={insert} startIcon={<EventAvailable />}>Register</Button>
          </div>

        </Grid>
      </ActionDialog>
    </>
  );
}