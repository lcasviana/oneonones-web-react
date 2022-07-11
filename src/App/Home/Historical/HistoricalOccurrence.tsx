import { Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { EventBusy, RateReview } from '@mui/icons-material';
import React, { useState } from 'react';
import { HistoricalModel } from '../../../Common/Models/Historical/HistoricalModel';
import { HistoricalDelete } from './HistoricalDelete';
import { HistoricalUpdate } from './HistoricalUpdate';

interface HistoricalOccurrenceProps {
  historical: HistoricalModel;
}

export const HistoricalOccurrence: React.FC<HistoricalOccurrenceProps> = ({ historical }: HistoricalOccurrenceProps) => {
  const [historicalUpdateDialog, setHistoricalUpdateDialog] = useState(false);
  const [historicalDeleteDialog, setHistoricalDeleteDialog] = useState(false);

  const occurrence = historical.occurrence ? new Date(historical.occurrence).toISOString().substr(0, 10) : null;
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <div style={small
        ? { display: 'grid', gridTemplateColumns: '1fr', gap: '0.25rem' }
        : { display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: '1rem' }}>
        <div className="flex flex-column">
          {!!occurrence && <Typography variant="body1">{occurrence}</Typography>}
          {!!historical.commentary && <Typography variant="body1" color="textSecondary">{historical.commentary}</Typography>}
        </div>

        <div className="flex justitfy-end" style={{ gap: '1rem' }}>
          <Button onClick={() => setHistoricalUpdateDialog(true)} startIcon={<RateReview />} size="small">Commentary</Button>
          <Button onClick={() => setHistoricalDeleteDialog(true)} startIcon={<EventBusy />} size="small">Remove</Button>
        </div>
      </div>

      <HistoricalUpdate open={historicalUpdateDialog} onClose={() => setHistoricalUpdateDialog(false)} historical={historical} />
      <HistoricalDelete open={historicalDeleteDialog} onClose={() => setHistoricalDeleteDialog(false)} historical={historical} />
    </>
  );
};