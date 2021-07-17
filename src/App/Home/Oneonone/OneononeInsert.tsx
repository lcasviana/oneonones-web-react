import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { GroupAdd, Close } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { useEmployeeAll } from '../../../Core/Hooks/useEmployee';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';
import { EmployeeModel } from '../../../Common/Models/Employee/EmployeeModel';
import { OneononesRepository } from '../../../Core/Repositories/OneononesRepository';
import { ErrorModel } from '../../../Common/Models/ErrorModel';
import { ActionDialog } from '../../Shared/ActionDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../../Core/Redux/Effects';
import { AppState } from '../../../Core/Redux/Store';

interface OneononeInsertProps {
  open: boolean;
  onClose: () => void;
}

export const OneononeInsert: React.FC<OneononeInsertProps> = ({ open, onClose }: OneononeInsertProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user)!;

  const employees = useEmployeeAll(user);
  const [person, setPerson] = useState<EmployeeModel | null>(null);
  const [leader, setLeader] = useState<boolean | null>(null);
  const [frequency, setFrequency] = useState<FrequencyEnum | null>(null);

  const insert = () => {
    if (person === null || leader === null || frequency === null) {
      alert('Bad request!');
      return;
    }

    OneononesRepository.insert({
      leaderId: leader ? person.id : user.id,
      ledId: leader ? user.id : person.id,
      frequency,
    })
      .then(_ => {
        dispatch(getDashboard(user.id));
        alert('Created!');
      })
      .catch((e: ErrorModel) => alert(e.errors[0]))
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
      <ActionDialog open={open} onClose={close} title={'Register one-on-one'}>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">Is this person your leader or your led?</Typography>
            <Autocomplete
              value={leader}
              onChange={(_, leader: boolean | null) => setLeader(leader)}
              options={[false, true]}
              getOptionLabel={(leader) => leader ? 'Leader' : 'Led'}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">Which frequency you will meet?</Typography>
            <Autocomplete
              value={frequency}
              onChange={(_, frequency: FrequencyEnum | null) => setFrequency(frequency)}
              options={[7, 15, 30, 60, 90, 180, 365, 999]}
              getOptionLabel={(frequency) => FrequencyEnum[frequency as number]}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </Grid>

          <div className="flex mt2 justify-end" style={{ gap: '1rem' }}>
            <Button onClick={close} startIcon={<Close />}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={insert} startIcon={<GroupAdd />}>Register</Button>
          </div>

        </Grid>
      </ActionDialog>
    </>
  );
}