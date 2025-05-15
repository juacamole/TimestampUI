import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../../data/user';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../../dialogs/edit-user-dialog/edit-user-dialog.component';
import { AddUserDialogComponent } from '../../dialogs/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUser().subscribe((users) => { 
      this.users = users;
      console.log('Users loaded:', this.users);
    });
  }

  formatWorkTime(hours: number, minutes: number): string {
    return `${hours}h ${minutes}m`;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      panelClass: 'add-user-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe(newUser => {
          this.users.push(newUser);
          this.loadUsers(); 
        });
      }
    });
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: user,
      panelClass: 'edit-user-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe(updatedUser => {
          const index = this.users.findIndex(u => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
        });
        window.location.reload();
      }
    });
  }

  deleteUser(user: User, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== user.id);
      });
    }
  }
}
