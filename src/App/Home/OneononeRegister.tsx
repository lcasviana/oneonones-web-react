import React, { useState } from 'react';
import { AppBar, Button, Dialog, Grid, IconButton, TextField, Toolbar, Typography } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { useEmployeeAll } from '../../Core/Hooks/useEmployee';
import { FrequencyEnum } from '../../Common/Enumerations/FrequencyEnum';
import { EmployeeModel } from '../../Common/Models/Employee/EmployeeModel';
import { OneononesRepository } from '../../Core/Repositories/OneononesRepository';

export const OneononeRegister = ({ open, onClose }: any) => {
  const employees = useEmployeeAll();
  const [person, setPerson] = useState<EmployeeModel | null>(null);
  const [leader, setLeader] = useState<boolean | null>(null);
  const [frequency, setFrequency] = useState<FrequencyEnum | null>(null);

  const register = () => {
    if (!person || !leader || !frequency) {
      alert('Bad request!');
      return;
    }

    OneononesRepository.insert({
      leaderId: leader ? person.id : '566ef507-71a1-46d2-995b-603efd95a30c',
      ledId: leader ? '566ef507-71a1-46d2-995b-603efd95a30c' : person.id,
      frequency,
    })
      .then(() => alert('Created!'))
      .catch((e) => {
        console.log(e);
        alert('Error!');
      })
      .finally(close);
  };

  const clear = () => {
    setPerson(null);
    setLeader(null);
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
              Register one-on-one
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Typography variant="caption" color="textSecondary">Who is your mate?</Typography>
            <Autocomplete
              value={person}
              onChange={(_, person: EmployeeModel | null) => setPerson(person)}
              options={employees ?? []}
              getOptionLabel={(employee) => employee.name}
              getOptionSelected={(employee) => employee.id === person?.id}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Typography variant="caption" color="textSecondary">Is this person your leader or your led?</Typography>
            <Autocomplete
              value={leader}
              onChange={(_, leader: boolean | null) => setLeader(leader)}
              options={[false, true]}
              getOptionLabel={(leader) => leader ? 'Leader' : 'Led'}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </Grid>

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

          <div className="flex" style={{ gap: '1rem' }}>
            <Button onClick={close} startIcon={<Close />} size="small">Cancel</Button>
            <Button onClick={register} startIcon={<Add />} size="small">Register</Button>
          </div>

        </Grid>
      </Dialog>
    </>
  );
}