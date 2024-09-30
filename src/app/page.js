'use client';

import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Alert as MuiAlert,
  Snackbar,
  Backdrop,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import theme from './theme';

export default function App() {
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState(['Cccccc', 'Rrrrrr', 'Uuuuuu', 'Dddddd']);

  const DrawerList = () => (
    <List>
      {list.map((text, index) => (
        <ListItem button key={index}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <AppBar position="static"> */}
        <AppBar position="fixed">
          <Toolbar>
            <div className="tw-flex-1">
              <FaBars className="tw-cursor-pointer" onClick={() => setOpen(true)} />
            </div>
            <div className="logo-box">
              <a href="/" className="tw-font-bold">
                로고
              </a>
            </div>
            <div className="tw-flex-1 tw-flex tw-justify-end">글쓰기</div>
          </Toolbar>
        </AppBar>
        <section className="tw-h-96 tw-flex tw-items-center tw-justify-center tw-text-[2rem]">
          section
        </section>
      </ThemeProvider>

      <section>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <DrawerList />
        </Drawer>
      </section>
    </>
  );
}
