'use client';

import * as React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import theme from './theme';

export default function Home() {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <div className="tw-flex-1">
            <FaBars />
          </div>
          <div className="logo-box">
            <a href="/" className="tw-font-bold">
              로고
            </a>
          </div>
          <div className="tw-flex-1 tw-flex tw-justify-end">글쓰기</div>
        </Toolbar>
      </AppBar>
      <section className="tw-h-screen tw-flex tw-items-center tw-justify-center tw-text-[2rem]">
        main
      </section>
    </>
  );
}
