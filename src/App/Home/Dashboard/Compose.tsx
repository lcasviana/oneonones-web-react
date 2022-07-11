import React, { useState } from 'react';
import { Grid, Card, Typography, Divider, Button } from '@mui/material';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';
import { ComposeModel } from '../../../Common/Models/Dashboard/ComposeModel';
import { EmployeeModel } from '../../../Common/Models/Employee/EmployeeModel';
import { EventAvailable, History, Event, DeleteForever } from '@mui/icons-material';
import { OneononeDelete } from '../Oneonone/OneononeDelete';
import { OneononeUpdate } from '../Oneonone/OneononeUpdate';
import { HistoricalInsert } from '../Historical/HistoricalInsert';
import { HistoricalObtain } from '../Historical/HistoricalObtain';

type ComposeProps = {
  user: EmployeeModel;
  compose: ComposeModel;
};

export const Compose: React.FC<ComposeProps> = ({ user, compose }: ComposeProps) => {
  const [oneononeUpdateDialog, setOneononeUpdateDialog] = useState(false);
  const [oneononeDeleteDialog, setOneononeDeleteDialog] = useState(false);
  const [historicalObtainDialog, setHistoricalObtainDialog] = useState(false);
  const [historicalInsertDialog, setHistoricalInsertDialog] = useState(false);

  const lastOccurrence = compose.status ? new Date(compose.status.lastOccurrence).toISOString().substr(0, 10) : null;
  const nextOccurrence = compose.status ? new Date(compose.status.nextOccurrence).toISOString().substr(0, 10) : null;

  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={4}>
        <Card className="flex flex-column pa2" style={{ gap: '0.25rem' }}>

          {user.id !== compose.oneonone.leader.id &&
            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">Leader</Typography>
              <Typography variant="h5">{compose.oneonone.leader.name}</Typography>
            </Grid>
          }

          {user.id !== compose.oneonone.led.id &&
            <Grid item xs={12}>
              <Typography variant="caption" color="textSecondary">Led</Typography>
              <Typography variant="h5">{compose.oneonone.led.name}</Typography>
            </Grid>
          }

          {!!compose.status && compose.oneonone.frequency !== FrequencyEnum.Occasionally && <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">Next Occurrence</Typography>
              <Typography variant="h5" className={compose.status.isLate ? 'strike' : ''}>
                {nextOccurrence}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">Status</Typography>
              <Typography variant="h5" color={compose.status.isLate ? 'error' : 'primary'}>
                {compose.status.isLate ? 'Is Late' : 'Ok'}
              </Typography>
            </Grid>
          </Grid>}

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">Frequency</Typography>
              <Typography variant="body1">{FrequencyEnum[compose.oneonone.frequency]}</Typography>
            </Grid>

            {!!compose.status && <Grid item xs={12} sm={6}>
              <Typography variant="caption" color="textSecondary">Last Occurrence</Typography>
              <Typography variant="body1">{lastOccurrence}</Typography>
            </Grid>}
          </Grid>

          <Divider style={{ margin: '0.5rem 0' }} />

          <div className="flex flex-wrap justify-end" style={{ gap: '1rem' }}>
            <Button onClick={() => setHistoricalInsertDialog(true)} variant="contained" color="primary" startIcon={<EventAvailable />} size="small">Register</Button>
            <Button onClick={() => setHistoricalObtainDialog(true)} startIcon={<History />} size="small">Historical</Button>
            <Button onClick={() => setOneononeUpdateDialog(true)} startIcon={<Event />} size="small">Frequency</Button>
            <Button onClick={() => setOneononeDeleteDialog(true)} startIcon={<DeleteForever />} size="small">Remove</Button>
          </div>

        </Card>
      </Grid>

      <OneononeUpdate open={oneononeUpdateDialog} onClose={() => setOneononeUpdateDialog(false)} oneonone={compose.oneonone} />
      <OneononeDelete open={oneononeDeleteDialog} onClose={() => setOneononeDeleteDialog(false)} oneonone={compose.oneonone} />
      <HistoricalObtain open={historicalObtainDialog} onClose={() => setHistoricalObtainDialog(false)} oneonone={compose.oneonone} historical={compose.historical} />
      <HistoricalInsert open={historicalInsertDialog} onClose={() => setHistoricalInsertDialog(false)} oneonone={compose.oneonone} />
    </>
  );
};