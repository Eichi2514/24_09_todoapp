'use client';

import * as React from 'react';
import { AppBar, Toolbar, Button, Alert as MuiAlert, Snackbar } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import theme from './theme';

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert {...props} ref={ref} />;
});

export default function App() {
  const [open, setOpen] = React.useState(false);

  const alertRef = React.useRef(null);

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <AppBar position="static"> */}
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
        <section className="tw-h-96 tw-flex tw-items-center tw-justify-center tw-text-[2rem]">
          section
        </section>
      </ThemeProvider>

      <section>
        <Button onClick={() => setOpen(true)}>Open Snackbar</Button>
        <Alert ref={alertRef} severity="error" variant="filled">
          게시물이 삭제됨
        </Alert>
        <Alert ref={alertRef} severity="success" variant="outlined">
          성공 메세지
        </Alert>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Note archived">
          <Alert variant="outlined" severity="error">
            게시물 삭제{' '}
            {/* 해당 Alert의 유무에 따라서 스낵바를 클릭했을 때 나오는 메세지가 달라짐*/}
          </Alert>
        </Snackbar>
      </section>
    </>
  );
}
