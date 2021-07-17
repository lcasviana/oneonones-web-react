import React from 'react';
import { Divider, Grid, Typography } from '@material-ui/core';
import { HistoricalModel } from '../../../Common/Models/Historical/HistoricalModel';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';
import { AuthenticationRepository } from '../../../Core/Repositories/AuthenticationRepository';
import { FrequencyEnum } from '../../../Common/Enumerations/FrequencyEnum';
import { HistoricalOccurrence } from './HistoricalOccurrence';
import { ScreenDialog } from '../../Shared/ScreenDialog';

interface HistoricalObtainProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
  historical: HistoricalModel[];
}

export const HistoricalObtain: React.FC<HistoricalObtainProps> = ({ open, onClose, oneonone, historical }: HistoricalObtainProps) => {
  const user = AuthenticationRepository.user;

  return (
    <>
      <ScreenDialog open={open} onClose={onClose} title={'Historical'}>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <Grid container item xs={12}>
            {user.id !== oneonone.leader.id &&
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="caption" color="textSecondary">Leader</Typography>
                <Typography variant="body1">{oneonone.leader.name}</Typography>
              </Grid>
            }

            {user.id !== oneonone.led.id &&
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography variant="caption" color="textSecondary">Led</Typography>
                <Typography variant="body1">{oneonone.led.name}</Typography>
              </Grid>
            }

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography variant="caption" color="textSecondary">Frequency</Typography>
              <Typography variant="body1">{FrequencyEnum[oneonone.frequency]}</Typography>
            </Grid>

          </Grid>

          <Divider />

          <Grid item container xs={12} className="flex flex-column">
            {/* <Typography variant="caption" color="textSecondary">Occurrences</Typography> */}
            {!!historical?.length &&
              <section className="flex flex-column mt2" style={{ gap: '1rem' }}>
                {historical.map((h: HistoricalModel, index: number) => <HistoricalOccurrence key={index} historical={h} />)}
              </section>
            }
            {!historical.length &&
              <Typography variant="body1" style={{ marginTop: '0.5rem' }}>Empty</Typography>
            }
          </Grid>

        </Grid>
      </ScreenDialog>
    </>
  );
};