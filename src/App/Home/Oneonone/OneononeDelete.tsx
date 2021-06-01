import React from 'react';
import { AppBar, Button, Dialog, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { OneononesRepository } from '../../../Core/Repositories/OneononesRepository';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';
import { ErrorModel } from '../../../Common/Models/ErrorModel';

interface OneononeDeleteProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
}

export const OneononeDelete: React.FC<OneononeDeleteProps> = ({ open, onClose, oneonone }: OneononeDeleteProps) => {
  const remove = () => {
    OneononesRepository.delete(oneonone.id)
      .then(_ => alert('Deleted!'))
      .catch((e: ErrorModel) => alert(e.errors[0]))
      .finally(onClose);
  };

  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <IconButton onClick={onClose} edge="start">
              <Close />
            </IconButton>
            <Typography variant="h6">
              Cancel one-on-one
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container className="flex flex-column pa3" style={{ gap: '0.5rem' }}>

          <div className="flex mt2" style={{ gap: '1rem' }}>
            <Button onClick={onClose} startIcon={<Close />} size="small">Cancel</Button>
            <Button variant="contained" color="primary" onClick={remove} startIcon={<Add />} size="small">Remove</Button>
          </div>

        </Grid>
      </Dialog>
    </>
  );
}