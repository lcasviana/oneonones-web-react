import React, { useState } from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { Close, Event } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';
import { OneononesRepository } from '../../../Core/Repositories/OneononesRepository';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { AuthenticationRepository } from '../../../Core/Repositories/AuthenticationRepository';
import { ActionDialog } from '../../Shared/ActionDialog';

interface OneononeUpdateProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
}

export const OneononeUpdate: React.FC<OneononeUpdateProps> = ({ open, onClose, oneonone }: OneononeUpdateProps) => {
  const user = AuthenticationRepository.user;
  const [frequency, setFrequency] = useState<FrequencyEnum | null>(null);

  const update = () => {
    if (frequency === null) {
      alert('Bad request!');
      return;
    }

    OneononesRepository.update({
      ...oneonone,
      frequency,
    })
      .then(_ => alert('Updated!'))
      .catch((e: ErrorModel) => alert(e.errors[0]))
      .finally(close);
  };

  const clear = () => {
    setFrequency(null);
  };

  const close = () => {
    clear();
    onClose();
  };

  return (
    <>
      <ActionDialog open={open} onClose={close} title={'Update frequency'} Content={() =>

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

          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">Which frequency you will meet?</Typography>
            <Autocomplete
              value={frequency}
              onChange={(_, frequency: FrequencyEnum | null) => setFrequency(frequency)}
              options={[7, 15, 30, 60, 90, 180, 365, 999]}
              getOptionLabel={(frequency) => FrequencyEnum[frequency as any]}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </Grid>

          <div className="flex mt2 justify-end" style={{ gap: '1rem' }}>
            <Button onClick={close} startIcon={<Close />}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={update} startIcon={<Event />}>Update</Button>
          </div>

        </Grid>
      } />
    </>
  );
}