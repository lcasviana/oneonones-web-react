import React from 'react';
import { Grid } from '@material-ui/core';
import { ComposeModel } from '../../../Common/Models/Dashboard/ComposeModel';
import { Compose } from './Compose';

export const Dashboard: React.FC<any> = ({ dashboard }: any) => (
  <>
    <Grid container spacing={2}>
      {dashboard.oneonones.map((compose: ComposeModel, index: number) =>
        <Compose key={index} user={dashboard.employee} compose={compose} />)
      }
    </Grid>
  </>
);