import React, { useState } from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { Close, RateReview } from '@mui/icons-material';
import { HistoricalModel } from '../../../Common/Models/Historical/HistoricalModel';
import { HistoricalsRepository } from '../../../Core/Repositories/HistoricalsRepository';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { ActionDialog } from '../../Shared/ActionDialog';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../Core/Redux/Store';
import { DashboardsRepository } from '../../../Core/Repositories/DashboardsRepository';
import { getDashboard } from '../../../Core/Redux/DashboardSlice';

interface HistoricalUpdateProps {
  open: boolean;
  onClose: () => void;
  historical: HistoricalModel;
}

export const HistoricalUpdate: React.FC<HistoricalUpdateProps> = ({ open, onClose, historical }: HistoricalUpdateProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppState) => state.user);

  const [commentary, setCommentary] = useState<string | null>(null);

  const occurrence = historical.occurrence ? new Date(historical.occurrence).toISOString().substr(0, 10) : null;

  const update = () => {
    HistoricalsRepository.update({
      ...historical,
      commentary,
    })
      .then(() => {
        DashboardsRepository.obtainById(user!.id)
          .then((dashboard) => dispatch(getDashboard(dashboard)));
        alert('Updated!');
      })
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
      <ActionDialog open={open} onClose={onClose} title={'Update commentary'}>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid container item xs={12}>
            {user!.id !== historical.leader.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Leader</Typography>
                <Typography variant="body1">{historical.leader.name}</Typography>
              </Grid>
            }

            {user!.id !== historical.led.id &&
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" color="textSecondary">Led</Typography>
                <Typography variant="body1">{historical.led.name}</Typography>
              </Grid>
            }

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">Occurrence</Typography>
              <Typography variant="body1">{occurrence}</Typography>
            </Grid>
          </Grid>

          <Divider />

          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">Leave new commentary</Typography>
            <TextField className="w-100" type="text" variant="outlined" value={commentary} onChange={(event) => setCommentary(event.target.value)} />
          </Grid>

          <div className="flex mt2 justify-end" style={{ gap: '1rem' }}>
            <Button onClick={close} startIcon={<Close />} size="small">Cancel</Button>
            <Button variant="contained" color="primary" onClick={update} startIcon={<RateReview />}>Update</Button>
          </div>

        </Grid>
      </ActionDialog>
    </>
  );
}