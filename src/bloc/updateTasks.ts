// import rxjs component
import {BehaviorSubject, Subscription} from 'rxjs';
// import the model
import TaskModel from '../models';

// this class only receives data via init()
// this class never sends data over network.
class UpdateTasks {
  private updateTasksList: TaskModel[] = [];

  private updateTasks = new BehaviorSubject<TaskModel[]>([]);

  init(data: TaskModel[]) {
    this.updateTasksList = data;
    this.updateTasks.next(this.updateTasksList);
  }

  completedTaskStream (setState: any): Subscription {
    let subscription = this.updateTasks.subscribe(setState);
    return subscription;
  }

  addTask(data: TaskModel) : void {
    this.updateTasksList.push(data);
    this.updateTasks.next(this.updateTasksList);
  }

  deleteTask(index: number) : void {
    if(this.updateTasksList.length >= index) {
      this.updateTasksList.splice(index, 1);
      this.updateTasks.next(this.updateTasksList);
    }
  }
}

export const updateTasks = new UpdateTasks();
