'use client';

import { useState } from 'react';
import { produce } from 'immer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

const NewTodoForm = ({ todoStatus }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const NewTodoFormKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const addTodo = () => {
    if (newTodoTitle.trim().length === 0) return;

    const title = newTodoTitle.trim();
    todoStatus.addTodo(title);
    setNewTodoTitle('');
  };

  return (
    <div className="flex items-center gap-x-3 m-3 w-[400px]">
      <TextField
        label="새 일정"
        variant="outlined"
        value={newTodoTitle}
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
  const [editMode, setEditMode] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);

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

  return (
    <li className="flex items-center gap-x-3 ml-3 mb-3">
      <Chip label={todo.id} color="primary" variant="outlined" />
      {editMode ? (
        <>
          <TextField
            label="수정 내용"
            variant="outlined"
            value={newTodoTitle}
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
          <span>{todo.title}</span>
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
        <h4 className="m-3">오늘 일정 없음</h4>
      ) : (
        <>
          <h4 className="m-3">일정 목록</h4>
          <ul>
            {todoStatus.todos.map((todo) => (
              <TodoListItem key={todo.id} todo={todo} todoStatus={todoStatus} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

const useTodoStatus = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'test1' },
    { id: 2, title: 'test2' },
    { id: 3, title: 'test3' },
  ]);
  const [lastTodoId, setLastTodoId] = useState(3);

  const addTodo = (title) => {
    const id = lastTodoId + 1;

    setTodos(
      produce(todos, (draft) => {
        draft.push({ id, title });
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

export default function Home() {
  const todoStatus = useTodoStatus();

  return (
    <>
      <NewTodoForm todoStatus={todoStatus} />
      <hr />
      <TodoList todoStatus={todoStatus} />
    </>
  );
}
