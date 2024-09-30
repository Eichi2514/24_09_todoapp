'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import theme from './theme';

export default function Home() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="tw-flex tw-items-center tw-gap-x-3">
          <Button variant="text">Text</Button>
          <Button
            variant="contained"
            onClick={() => {
              confirm('삭제 할거야?');
            }}>
            <RiDeleteBin5Line />
            삭제
          </Button>
          <Button variant="outlined">Outlined</Button>
        </div>
      </ThemeProvider>
      <div className="tw-flex tw-items-center tw-gap-x-3 tw-mt-3">
        <Button
          variant="text"
          onClick={() => {
            alert('버튼 클릭 됨');
          }}>
          Text
        </Button>
        <Button variant="contained" disabled>
          Contained
        </Button>
        <Button variant="outlined" href="sub/">
          sub 로 이동
        </Button>
      </div>
    </>
  );
}
