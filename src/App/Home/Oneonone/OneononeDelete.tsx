import React from 'react';
import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { Close, DeleteForever } from '@material-ui/icons';
import { OneononesRepository } from '../../../Core/Repositories/OneononesRepository';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';
import { ActionDialog } from '../../Shared/ActionDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../../Core/Redux/Effects';
import { AppState } from '../../../Core/Redux/Store';

interface OneononeDeleteProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
}

export const OneononeDelete: React.FC<OneononeDeleteProps> = ({ open, onClose, oneonone }: OneononeDeleteProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user)!;

  const remove = () => {
    OneononesRepository.delete(oneonone.id)
      .then(_ => {
        dispatch(getDashboard(user.id));
        alert('Deleted!');
      })
      .catch((e: ErrorModel) => alert(e.errors[0]))
      .finally(onClose);
  };

  return (
    <>
      <ActionDialog open={open} onClose={onClose} title={'Remove one-on-one'}>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid container item xs={12}>
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

          <Divider />

          <div className="flex mt2 justify-end" style={{ gap: '1rem' }}>
            <Button onClick={onClose} startIcon={<Close />}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={remove} startIcon={<DeleteForever />}>Remove</Button>
          </div>

        </Grid>
      </ActionDialog>
    </>
  );
}