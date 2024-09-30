'use client';

import * as React from 'react';
import { produce } from 'immer';
import { TextField, Button, Chip, AppBar, Toolbar, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { FaBars } from 'react-icons/fa';
import theme from './theme';

const NewTodoForm = ({ todoStatus }) => {
  const [newTodoTitle, setNewTodoTitle] = React.useState('');

  const NewTodoFormKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const addTodo = () => {
    if (newTodoTitle.trim().length === 0) return;
    const regDate = dateToStr(new Date());
    const title = newTodoTitle.trim();
    todoStatus.addTodo(title, regDate);
    setNewTodoTitle('');
  };

  return (
    <div className="tw-flex tw-items-center tw-gap-x-3 tw-m-3 tw-w-[400px]">
      <TextField
        label="새 일정"
        variant="outlined"
        value={newTodoTitle}
        autoComplete="off"
        onChange={(e) => setNewTodoTitle(e.target.value)}
        onKeyDown={NewTodoFormKeyDown}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={addTodo}>
        추가
      </Button>
    </div>
  );
};

const TodoListItem = ({ todo, todoStatus }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [newTodoTitle, setNewTodoTitle] = React.useState(todo.title);

  const removeTodo = () => {
    todoStatus.removeTodo(todo.id);
  };

  const changeEditMode = () => {
    setNewTodoTitle(todo.title);
    setEditMode(!editMode);
  };

  const modifyTodo = () => {
    if (newTodoTitle.trim().length !== 0) {
      todoStatus.modifyTodo(todo.id, newTodoTitle);
    }
    changeEditMode();
  };

  const formatDate = (regDate) => {
    const now = new Date();
    const date = new Date(regDate);

    const isToday =
      now.getFullYear() === date.getFullYear() &&
      now.getMonth() === date.getMonth() &&
      now.getDate() === date.getDate();

    if (isToday) {
      return `오늘: ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
    } else {
      return `날짜: ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  };

  return (
    <li className="tw-flex tw-items-center tw-gap-x-3 tw-ml-3 tw-mb-3">
      <Chip label={todo.id} color="primary" variant="outlined" />
      {editMode ? (
        <>
          <TextField
            label="수정 내용"
            variant="outlined"
            value={newTodoTitle}
            autoComplete="off"
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <Button variant="contained" color="warning" onClick={modifyTodo}>
            저장
          </Button>
          <Button variant="contained" color="error" onClick={changeEditMode}>
            취소
          </Button>
        </>
      ) : (
        <>
          <span>제목 : {todo.title}</span>/<span>{formatDate(todo.regDate)}</span>
          <Button variant="contained" color="warning" onClick={changeEditMode}>
            수정
          </Button>
          <Button variant="contained" color="error" onClick={removeTodo}>
            삭제
          </Button>
        </>
      )}
    </li>
  );
};

const TodoList = ({ todoStatus }) => {
  return (
    <>
      {todoStatus.todos.length === 0 ? (
        <h4 className="tw-m-3">오늘 일정 없음</h4>
      ) : (
        <>
          <h4 className="tw-m-3">일정 목록</h4>
          <ul>
            {todoStatus.todos
              .slice()
              .reverse()
              .map((todo) => (
                <TodoListItem key={todo.id} todo={todo} todoStatus={todoStatus} />
              ))}
          </ul>
        </>
      )}
    </>
  );
};

const useTodoStatus = () => {
  const [todos, setTodos] = React.useState([
    { id: 1, title: 'test1', regDate: '2024-09-29 15:07:41' },
    { id: 2, title: 'test2', regDate: '2024-09-29 15:15:25' },
    { id: 3, title: 'test3', regDate: '2024-09-29 15:22:58' },
  ]);
  const [lastTodoId, setLastTodoId] = React.useState(3);

  const addTodo = (title, regDate) => {
    const id = lastTodoId + 1;

    setTodos(
      produce(todos, (draft) => {
        draft.push({ id, title, regDate });
      }),
    );

    setLastTodoId(id);
  };

  const removeTodo = (id) => {
    setTodos(
      produce(todos, (draft) => {
        const index = draft.findIndex((todo) => todo.id === id);
        draft.splice(index, 1);
      }),
    );
  };

  const modifyTodo = (id, title) => {
    setTodos(
      produce(todos, (draft) => {
        const index = draft.findIndex((todo) => todo.id === id);
        draft[index].title = title;
      }),
    );
  };

  return { todos, addTodo, removeTodo, modifyTodo };
};

export default function App() {
  const todoStatus = useTodoStatus();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
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

        <div style={{ paddingTop: '64px' }}>
          <NewTodoForm todoStatus={todoStatus} />
          <hr />
          <TodoList todoStatus={todoStatus} />
        </div>
      </ThemeProvider>
    </>
  );
}

// Util
// 날짜 객체를 인자로 받아서 문장으로 반환해주는 함수 (yyyy-MM-dd hh:mm:ss)
function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? '0' + n : n;
  };
  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    ' ' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes()) +
    ':' +
    pad(d.getSeconds())
  );
}
