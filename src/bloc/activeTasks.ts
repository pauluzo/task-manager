// import from rxjs
import { BehaviorSubject, Subscription } from 'rxjs';
// import models
import TaskModel from '../models';
// Class for handling the business logic of active tasks.
class ActiveTasks {
  // internal state holder for the active tasks.
  private activeTasksList: TaskModel[] = [];

  private activeTasks = new BehaviorSubject<TaskModel[]>([]);

  init(data: TaskModel[]) {
    this.activeTasksList = data;
    this.activeTasks.next(this.activeTasksList);
  }

  activeTaskStream (setState: any): Subscription {
    let subscription = this.activeTasks.subscribe(setState);
    return subscription;
  }

  addTask(data: TaskModel) : void {
    this.activeTasksList.push(data);
    this.activeTasks.next(this.activeTasksList);
    // call backend network to register new task, here.
  }

  editTask(data: TaskModel, index: number) : void {
    console.log('edit task console', this.activeTasksList);
    if(this.activeTasksList.length >= index) {
      this.activeTasksList.splice(index, 1, data);
      this.activeTasks.next(this.activeTasksList);
      // call backend service to register edited task, here.
    }
  }

  deleteTask(index: number) : void {
    if(this.activeTasksList.length >= index) {
      this.activeTasksList.splice(index, 1);
      this.activeTasks.next(this.activeTasksList);
      // call backend service to register deleted task, here.
    }
  }
}

export const activeTask = new ActiveTasks();
