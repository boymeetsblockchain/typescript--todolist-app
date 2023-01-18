"use strict";
// connecting with the dom
const btn = document.getElementById('btn');
const form = document.getElementById('todoform');
const list = document.getElementById('todolist');
const input = document.getElementById('input');
//  creating an array for the todos
const todos = readTodos();
todos.forEach(createTodos);
// read from local storage
function readTodos() {
    const todoJSON = localStorage.getItem('todos');
    if (todoJSON === null)
        return [];
    return JSON.parse(todoJSON);
}
function handleSubmit(e) {
    const newTodo = {
        text: input.value,
        completed: false,
    };
    todos.push(newTodo);
    createTodos(newTodo);
    input.value = '';
    //    set to local storage
    saveTodos();
    e.preventDefault();
}
// adding the todos to the DOM
function createTodos(todo) {
    const newLi = document.createElement('li');
    //    creating the checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos();
    });
    newLi.append(todo.text);
    newLi.append(checkbox);
    list.append(newLi);
}
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
form.addEventListener("submit", handleSubmit);
