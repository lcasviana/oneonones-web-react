import React from 'react';
import { Button, Card, Divider, Grid, Typography } from '@material-ui/core';
import { ComposeModel } from '../../Common/Models/ComposeModel';
import { DashboardModel } from '../../Common/Models/DashboardModel';
import { FrequencyEnum } from '../../Common/Enumerations/FrequencyEnum';
import { Add, History } from '@material-ui/icons';

export const Dashboard = (dashboard: DashboardModel) => (
  <>
    <Grid container spacing={2}>
      {dashboard.oneonones.map((compose: ComposeModel) => {
        const lastOccurrence = new Date(compose.status.lastOccurrence).toISOString().substr(0, 10);
        const nextOccurrence = new Date(compose.status.nextOccurrence).toISOString().substr(0, 10);

        return (
          <>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card className="pa2">

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

                <Grid container>
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
                </Grid>

                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">Frequency</Typography>
                    <Typography variant="body1">{FrequencyEnum[compose.oneonone.frequency]}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="textSecondary">Last Occurrence</Typography>
                    <Typography variant="body1">{lastOccurrence}</Typography>
                  </Grid>
                </Grid>

                <Divider style={{ margin: '1rem 0' }} />

                <Button startIcon={<Add />} size="small" style={{ marginRight: '1rem' }}>Register</Button>
                <Button startIcon={<History />} size="small">Historical</Button>

              </Card>
            </Grid>
          </>
        );
      })}
    </Grid>
  </>
);