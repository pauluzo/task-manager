export default class TaskModel {
  title: string;
  description: string;
  reminderDate: string;
  dueDate: string;
  isCompleted: boolean
  constructor(title: string, description: string, reminderDate: string, dueDate: string, isCompleted: boolean) {
    this.title = title;
    this.description = description;
    this.reminderDate = reminderDate;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted
  }
}