import { Component, OnInit } from '@angular/core';
import { todo } from './../../models/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos : todo[] = [];

  inputTodo:String = "";

  constructor() { }

  ngOnInit(): void {
    //creating an array storing all entered todos
    //TODO: Manage this in the back-end?
    //@ts-ignore
    this.todos = JSON.parse(localStorage.getItem('todos'))|| [];
  }

  toggleDone (id: number) {
    this.todos.map((v,i)=>{
        if(i==id) v.completed = !v.completed;
        return v;
    })
  }

  deleteTodo(id: number){
    this.todos = this.todos.filter((v,i) => i !== id);
    localStorage.setItem('todos',JSON.stringify(this.todos));
  }

  //Not the best solution -> uses the input above
  editTodo(id: number){
    if(this.inputTodo === ""){
      alert('Please enter text above and press the button again');
    }else{
      this.todos.map((v,i)=>{
      if(i==id) v.content = this.inputTodo;
      return v;
      });
      localStorage.setItem('todos',JSON.stringify(this.todos));
    }

  }

  addTodo (){
    if(this.inputTodo === ""){
      alert('Please enter text');
    }
    else{
      this.todos.push({
        content: this.inputTodo,
        completed: false

      });
      localStorage.setItem('todos',JSON.stringify(this.todos));
      this.inputTodo = "";
    }
  }

}
