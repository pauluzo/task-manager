export default class TaskModel {
  title: string;
  description: string;
  reminderInterval: string;
  dueDate: string;
  status: 'completed' | 'expired' | 'active' | 'warning'
  constructor(title: string, description: string, reminderDate: string, dueDate: string, status) {
    this.title = title;
    this.description = description;
    this.reminderInterval = reminderDate;
    this.dueDate = dueDate;
    this.status = status
  }
}