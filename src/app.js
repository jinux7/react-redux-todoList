import React,{ Component } from 'react'
import { render } from 'react-dom'
import TodoList from './components/todoList.jsx'

render(
  <TodoList />,
  document.querySelector('#root')
);