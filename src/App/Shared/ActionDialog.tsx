import React from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

export interface ActionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  Content: React.FC<any>;
}

export const ActionDialog: React.FC<ActionDialogProps> = ({ open, onClose, title, Content }: ActionDialogProps) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <AppBar position="sticky">
          <Toolbar variant="dense">
            <IconButton onClick={onClose} edge="start">
              <ArrowBack />
            </IconButton>
            <Typography variant="h6">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <section style={{ maxHeight: '80vh', maxWidth: '80vw', width: 600 }}>
          <Content />
        </section>
      </Dialog>
    </>
  );
};