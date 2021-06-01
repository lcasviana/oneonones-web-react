import React, { useState } from 'react';
import { AppBar, Button, Dialog, Grid, IconButton, TextField, Toolbar, Typography } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';
import { OneononesRepository } from '../../../Core/Repositories/OneononesRepository';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';
import { ErrorModel } from '../../../Common/Models/ErrorModel';

interface OneononeUpdateProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
}

export const OneononeUpdate: React.FC<OneononeUpdateProps> = ({ open, onClose, oneonone }: OneononeUpdateProps) => {
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
      <Dialog fullScreen open={open} onClose={close}>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <IconButton onClick={close} edge="start">
              <Close />
            </IconButton>
            <Typography variant="h6">
              Change one-on-one
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Typography variant="caption" color="textSecondary">Which frequency you will meet?</Typography>
            <Autocomplete
              value={frequency}
              onChange={(_, frequency: FrequencyEnum | null) => setFrequency(frequency)}
              options={[7, 15, 30, 60, 90, 180, 365, 999]}
              getOptionLabel={(frequency) => FrequencyEnum[frequency as any]}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </Grid>

          <div className="flex mt2" style={{ gap: '1rem' }}>
            <Button onClick={close} startIcon={<Close />} size="small">Cancel</Button>
            <Button variant="contained" color="primary" onClick={update} startIcon={<Add />} size="small">Update</Button>
          </div>

        </Grid>
      </Dialog>
    </>
  );
}