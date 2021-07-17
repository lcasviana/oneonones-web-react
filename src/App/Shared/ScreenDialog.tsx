import React from 'react';
import { Dialog, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

export interface ScreenDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const ScreenDialog: React.FC<ScreenDialogProps> = ({ children, open, onClose, title }: ScreenDialogProps) => {
  return (
    <>
      <Dialog fullScreen open={open} onClose={onClose}>
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
        {children}
      </Dialog>
    </>
  );
};