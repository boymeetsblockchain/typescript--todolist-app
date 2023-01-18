// connecting with the dom
const btn = document.getElementById('btn')! as HTMLButtonElement;
const form =document.getElementById('todoform')!;
const list= document.getElementById('todolist')!;
const input = document.getElementById('input')! as HTMLInputElement;

// creating an interface for the todolist
 interface Todo {
    text:string,
    completed:boolean
 }

//  creating an array for the todos
const todos :Todo[] =readTodos();
todos.forEach(createTodos)
// read from local storage
 function readTodos() :Todo[] {
    const todoJSON = localStorage.getItem('todos');
    if(todoJSON===null) return [];
    return JSON.parse(todoJSON )
 }
function handleSubmit (e:SubmitEvent){
    const newTodo :Todo={
         text:input.value,
         completed:false,
    }
    todos.push(newTodo)
    createTodos(newTodo)
   input.value='';
//    set to local storage
   saveTodos()
  e.preventDefault()
}

// adding the todos to the DOM
function createTodos (todo:Todo){
    const newLi= document.createElement('li');
  //    creating the checkbox
   const checkbox = document.createElement('input')
   checkbox.type='checkbox';
   checkbox.checked= todo.completed
   checkbox.addEventListener('change', ()=>{
     todo.completed =  checkbox.checked
     saveTodos()
   })
    newLi.append(todo.text)
    newLi.append(checkbox)
    list.append(newLi)
}
function saveTodos (){
    localStorage.setItem('todos',JSON.stringify(todos))
}

form.addEventListener("submit",handleSubmit)