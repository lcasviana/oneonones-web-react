import React from 'react';
import { Button, Card, Divider, Grid, Typography } from '@material-ui/core';
import { FrequencyEnum } from '../../Common/Enumerations/FrequencyEnum';
import { Add, Delete, History, Update } from '@material-ui/icons';
import { ComposeModel } from '../../Common/Models/Dashboard/ComposeModel';
import { OneononesRepository } from '../../Core/Repositories/OneononesRepository';

export const Dashboard = ({ dashboard }: any) => (
  <>
    <Grid container spacing={2}>
      {dashboard.oneonones.map((compose: ComposeModel, index: number) => {
        const lastOccurrence = compose.status ? new Date(compose.status.lastOccurrence).toISOString().substr(0, 10) : null;
        const nextOccurrence = compose.status ? new Date(compose.status.nextOccurrence).toISOString().substr(0, 10) : null;

        return (
          <Grid key={index} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Card className="flex flex-column pa2" style={{ gap: '0.25rem' }}>

              {dashboard.employee.id !== compose.oneonone.leader.id &&
                <div>
                  <Typography variant="caption" color="textSecondary">Leader</Typography>
                  <Typography variant="h5">{compose.oneonone.leader.name}</Typography>
                </div>
              }

              {dashboard.employee.id !== compose.oneonone.led.id &&
                <div>
                  <Typography variant="caption" color="textSecondary">Led</Typography>
                  <Typography variant="h5">{compose.oneonone.led.name}</Typography>
                </div>
              }

              {!!compose.status && <Grid container>
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

              <div className="flex flex-wrap" style={{ gap: '1rem' }}>
                <Button variant="contained" color="primary" startIcon={<Add />} size="small">Register</Button>
                <Button startIcon={<History />} size="small">Historical</Button>
                <Button startIcon={<Update />} size="small">Frequency</Button>
                <Button onClick={() => OneononesRepository.remove(compose.oneonone.id)} startIcon={<Delete />} size="small">Cancel</Button>
              </div>

            </Card>
          </Grid>
        );
      })}
    </Grid>
  </>
);