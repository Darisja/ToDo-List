import { Component, OnDestroy, OnInit } from '@angular/core';
import {remult} from "remult";
import { TasksController } from 'src/shared/TasksController';
import {Task} from "../../shared/Task";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy{
  
  newTaskTitle ="";
  async addTask() {
    try {
      const newTask = await this.taskRepo.insert({title : this.newTaskTitle})
      //.this.tasks.push(newTask) line no longer nneeededd nigga
      this.newTaskTitle=""
    } catch (error: any) {
      alert(error.message)
    }
  }
  async saveTask(task:Task){
    try{
      await this.taskRepo.save(task)
    } catch (error:any){
      alert(error.message)
    }
  }
  async deleteTask(task:Task){
    await this.taskRepo.delete(task);
    //this.tasks = this.tasks.filter(t => t !== task); no longer needded my guy
  }
  async setAllCompleted(completed: boolean){
    await TasksController.setAllCompleted(completed);
    
  }
  taskRepo = remult.repo(Task)
  tasks: Task[] = []
  unsubscribe = () => {}
  
  
  ngOnInit() {
    this.unsubscribe = this.taskRepo
      .liveQuery({
        limit: 20,
        orderBy: { completed: "asc" }
        //where: { completed: true },
      })
      .subscribe(info => (this.tasks = info.applyChanges(this.tasks)))
  }
  ngOnDestroy(){
      this.unsubscribe()
  }
}
