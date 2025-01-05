import { Component, OnInit } from '@angular/core';
import { Usr } from '../usr';

@Component({
  selector: 'app-user',
  standalone: false,
  
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: Usr[] = [];
  selectedUser: any = null;


  ngOnInit(): void {
    // Retrieve users from local storage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
    else {
      // Default users
      this.users = [
        { id: 1, name: 'Ahmed Ali', email: 'ahmed.ali@example.com' },
        { id: 2, name: 'Sara Mohammed', email: 'sara.mohammed@example.com' },
        { id: 3, name: 'Ali Hassan', email: 'ali.hassan@example.com' },
        { id: 4, name: 'Mona Yasser', email: 'mona.yasser@example.com' },
        { id: 5, name: 'Youssef Khaled', email: 'youssef.khaled@example.com' }
      ];
  }
}

  addUser(newUser: Usr): void {
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  deleteUser(userId: number): void {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
  selectUser(user: Usr): void {
    this.selectedUser = user;
  }
  editUser(updatedUser: Usr): void {
    const user = this.users.find(u => u.id === updatedUser.id);
    if (user) {
      Object.assign(user, updatedUser);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  cancelEdit(): void {
    this.selectedUser = null; 
  }
}
