import { BehaviorSubject, Subscription } from 'rxjs';
// import models
import TaskModel from '../models';

class CompletedTasks {
  private completedTasksList: TaskModel[] = [];

  private completedTasks = new BehaviorSubject<TaskModel[]>([]);

  init(data: TaskModel[]) {
    this.completedTasksList = data;
    this.completedTasks.next(this.completedTasksList);
  }

  completedTaskStream (setState: any): Subscription {
    let subscription = this.completedTasks.subscribe(setState);
    return subscription;
  }

  addTask(data: TaskModel) : void {
    this.completedTasksList.push(data);
    this.completedTasks.next(this.completedTasksList);
    // call backend network to register new task, here.
  }

  deleteTask(index: number) : void {
    if(this.completedTasksList.length >= index) {
      this.completedTasksList.splice(index, 1);
      this.completedTasks.next(this.completedTasksList);
      // call backend service to register deleted task, here.
    }
  }
}

export const completedTask = new CompletedTasks();