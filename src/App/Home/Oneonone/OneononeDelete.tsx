import React from 'react';
import { AppBar, Button, Dialog, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { OneononesRepository } from '../../../Core/Repositories/OneononesRepository';
import { OneononeModel } from '../../../Common/Models/Oneonone/OneononeModel';

interface OneononeDeleteProps {
  open: boolean;
  onClose: () => void;
  oneonone: OneononeModel;
}

export const OneononeInsert: React.FC<OneononeDeleteProps> = ({ open, onClose, oneonone }: OneononeDeleteProps) => {
  const remove = () => {
    OneononesRepository.delete(oneonone.id)
      .then(() => alert('Deleted!'))
      .catch((e) => {
        console.log(e);
        alert('Error!');
      })
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

          <div className="flex" style={{ gap: '1rem' }}>
            <Button onClick={onClose} startIcon={<Close />} size="small">Cancel</Button>
            <Button onClick={remove} startIcon={<Add />} size="small">Register</Button>
          </div>

        </Grid>
      </Dialog>
    </>
  );
}