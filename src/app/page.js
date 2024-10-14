'use client';

import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Alert as MuiAlert,
  TextField,
  CssBaseline,
  Chip,
  Drawer,
  Box,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import classNames from 'classnames';
import { FaBars, FaCheck, FaEllipsisV } from 'react-icons/fa';
import dateToStr from './dateUtil';
import RootTheme from './theme';

/* 
React 및 @mui/material : React 라이브러리와 Material-UI를 사용하여 UI 구성 요소를 만든다
react-icons : 아이콘을 추가하기 위해 사용
dateToStr 및 RootTheme : 날짜 포맷팅 및 사용자 정의 테마를 적용하기 위한 모듈
*/

function useTodoStatus() {
  const [todos, setTodos] = React.useState([]);
  const lastTodoIdRef = React.useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };
    setTodos((todos) => [newTodo, ...todos]);
  };
  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };
  const modifyTodo = (id, content) => {
    const newTodos = todos.map((todo) => (todo.id != id ? todo : { ...todo, content }));
    setTodos(newTodos);
  };
  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
  };
}

/*
useTodoStatus : Todo 리스트의 상태를 관리하는 커스텀 훅
todos : 현재 Todo 목록을 상태로 저장
addTodo : 새로운 Todo를 추가하는 함수
removeTodo : 주어진 ID의 Todo를 삭제하는 함수
modifyTodo : 특정 Todo의 내용을 수정하는 함수
*/

const NewTodoForm = ({ todosState }) => {
  const formRef = React.useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    form.content.value = form.content.value.trim();
    if (form.content.value.length === 0) {
      alert('할 일 써');
      form.content.focus();
      return;
    }
    todosState.addTodo(form.content.value);
    form.content.value = '';
    form.content.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
      } else {
        e.preventDefault();
        const form = formRef.current;
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        } else {
          console.error('Form not found');
        }
      }
    }
  };

  return (
    <form ref={formRef} className="tw-flex tw-flex-col tw-p-4 tw-gap-2" onSubmit={onSubmit}>
      <TextField
        multiline
        maxRows={4}
        name="content"
        id="outlined-basic"
        label="할 일 입력"
        variant="outlined"
        autoComplete="off"
        onKeyDown={handleKeyDown}
      />
      <Button className="tw-text-bold" variant="contained" type="submit">
        추가
      </Button>
    </form>
  );
};
/*
NewTodoForm : 사용자가 새로운 Todo를 입력하는 폼 컴포넌트
formRef : 폼 요소에 대한 참조를 저장
onSubmit : 폼이 제출될 때 호출되며, Todo를 추가하고 입력 필드를 초기화
handleKeyDown : 키 입력 이벤트를 처리하여 Enter 키가 눌리면 Todo가 제출되고, Shift + Enter로 줄바꿈을 허용
*/
const TodoListItem = ({ todo, index, openDrawer }) => {
  return (
    <>
      <li className="tw-mb-3" key={todo.id}>
        <div className="tw-flex tw-flex-col tw-gap-2 tw-mt-3">
          <div className="tw-flex tw-gap-x-2 tw-font-bold">
            <Chip className="tw-pt-[3px]" label={`번호 : ${todo.id}`} variant="outlined" />
            <Chip
              className="tw-pt-[3px]"
              label={`날짜 : ${todo.regDate}`}
              variant="outlined"
              color="primary"
            />
          </div>
          <div className="tw-rounded-[10px] tw-shadow tw-flex tw-text-[14px] tw-min-h-[80px]">
            <Button className="tw-flex-shrink-0 tw-rounded-[10px_0_0_10px]" color="inherit">
              <FaCheck
                className={classNames(
                  'tw-text-3xl',
                  {
                    'tw-text-[--mui-color-primary-main]': index % 2 == 0,
                  },
                  { 'tw-text-[#dcdcdc]': index % 2 != 0 },
                )}
              />
            </Button>
            <div className="tw-bg-[#dcdcdc] tw-w-[2px] tw-h-[60px] tw-self-center"></div>
            <div className="tw-bg-blue-300 tw-flex tw-items-center tw-p-3 tw-flex-grow hover:tw-text-[--mui-color-primary-main] tw-whitespace-pre-wrap tw-leading-relaxed tw-break-words">
              할 일 : {todo.content}
            </div>
            <Button
              onClick={() => {
                openDrawer(todo.id);
              }}
              className="tw-flex-shrink-0 tw-rounded-[0_10px_10px_0]"
              color="inherit">
              <FaEllipsisV className="tw-text-[#dcdcdc] tw-text-2xl" />
            </Button>
          </div>
        </div>
      </li>
    </>
  );
};
/*
TodoListItem : 개별 Todo 항목을 표시하는 컴포넌트
Chip : Todo의 ID와 날짜를 표시하는 UI 요소
Button : Todo 완료 체크 및 옵션 드로어를 여는 버튼
*/
function useTodoOptionDrawerStatus() {
  const [todoId, setTodoId] = React.useState(null);
  const opened = React.useMemo(() => todoId !== null, [todoId]);

  const open = (id) => setTodoId(id);
  const close = () => setTodoId(null);
  return {
    todoId,
    open,
    close,
    opened,
  };
}
/*
useTodoOptionDrawerStatus: Todo 옵션을 보여주는 드로어의 상태를 관리하는 커스텀 훅
open 및 close : 드로어를 여는 함수와 닫는 함수
*/
const TodoList = ({ todosState }) => {
  const todoOptionDrawerStatus = useTodoOptionDrawerStatus();

  return (
    <>
      <Drawer
        anchor="bottom"
        open={todoOptionDrawerStatus.opened}
        onClose={todoOptionDrawerStatus.close}>
        <div className="tw-p-[30px] tw-flex tw-gap-x-[5px]">
          {todoOptionDrawerStatus.todoId}번 todo에 대한 옵션 Drawer
          <div>수정</div>
          <div>삭제</div>
        </div>
      </Drawer>
      <div className="tw-mb-2">할 일 갯수 : {todosState.todos.length}</div>
      <nav>
        <ul>
          {todosState.todos.map((todo, index) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              index={index}
              openDrawer={todoOptionDrawerStatus.open}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};
/*
TodoList : Todo 목록을 표시하는 컴포넌트
Drawer : 선택된 Todo의 수정 및 삭제 옵션을 보여주는 드로어
todosState.todos : Todo 항목들을 맵핑하여 각 항목을 TodoListItem으로 표시
*/
function App() {
  const todosState = useTodoStatus();

  React.useEffect(() => {
    todosState.addTodo('스쿼트');
    todosState.addTodo('벤치프레스');
    todosState.addTodo('데드리프트\n런지');
  }, []);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <div className="tw-flex-1">
            <FaBars onClick={() => setOpen(true)} className="tw-cursor-pointer" />
          </div>
          <div className="logo-box">
            <a href="/" className="tw-font-bold">
              로고
            </a>
          </div>
          <div className="tw-flex-1 tw-flex tw-justify-end">글쓰기</div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NewTodoForm todosState={todosState} />
      <TodoList todosState={todosState} />
    </>
  );
}

export default function themeApp() {
  const theme = RootTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
