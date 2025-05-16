import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from "../../../../data/user";

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  userForm: FormGroup;
  validationRules = {
    username: {
      minLength: 3,
      pattern: '^[a-zA-Z0-9._-]*$',
      description: 'Username must be at least 3 characters and can only contain letters, numbers, dots, underscores, and hyphens'
    },
    name: {
      minLength: 2,
      pattern: '^[a-zA-Z]*$',
      description: 'Names must be at least 2 characters and can only contain letters'
    },
    workHours: {
      min: 0,
      max: 23,
      description: 'Work hours must be between 0 and 23'
    },
    workMinutes: {
      min: 0,
      max: 59,
      description: 'Work minutes must be between 0 and 59'
    }
  };

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      id: [data.id],
      username: [data.username, [
        Validators.required,
        Validators.minLength(this.validationRules.username.minLength),
        Validators.pattern(this.validationRules.username.pattern)
      ]],
      firstname: [data.firstname, [
        Validators.required,
        Validators.minLength(this.validationRules.name.minLength),
        Validators.pattern(this.validationRules.name.pattern)
      ]],
      lastname: [data.lastname, [
        Validators.required,
        Validators.minLength(this.validationRules.name.minLength),
        Validators.pattern(this.validationRules.name.pattern)
      ]],
      workhours: [data.workhours, [
        Validators.required,
        Validators.min(this.validationRules.workHours.min),
        Validators.max(this.validationRules.workHours.max)
      ]],
      workminutes: [data.workminutes, [
        Validators.required,
        Validators.min(this.validationRules.workMinutes.min),
        Validators.max(this.validationRules.workMinutes.max)
      ]]
    });

    // Subscribe to form changes to show alerts for violations
    this.userForm.valueChanges.subscribe(() => {
      this.checkFormValidation();
    });
  }

  checkFormValidation(): void {
    if (this.userForm.dirty && !this.userForm.valid) {
      Object.keys(this.userForm.controls).forEach(key => {
        const control = this.userForm.get(key);
        if (control?.invalid && control.dirty) {
          const errorMessage = this.getErrorMessage(key);
          if (errorMessage) {
            this.showAlert(errorMessage);
          }
        }
      });
    }
  }

  showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['validation-alert']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      
      // Additional validation before save
      if (!this.validateTimeValues(formValue.workhours, formValue.workminutes)) {
        this.showAlert('Invalid time values. Please check work hours and minutes.');
        return;
      }

      this.dialogRef.close(formValue);
    } else {
      this.showFormErrors();
    }
  }

  validateTimeValues(hours: number, minutes: number): boolean {
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  }

  showFormErrors(): void {
    const errorMessages: string[] = [];
    
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      if (control?.errors) {
        const message = this.getErrorMessage(key);
        if (message) errorMessages.push(message);
      }
    });

    if (errorMessages.length > 0) {
      this.showAlert('Please fix the following errors:\n' + errorMessages.join('\n'));
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${minLength} characters`;
    }
    if (control?.hasError('pattern')) {
      switch(controlName) {
        case 'username':
          return this.validationRules.username.description;
        case 'firstname':
        case 'lastname':
          return this.validationRules.name.description;
        default:
          return 'Invalid format';
      }
    }
    if (control?.hasError('min')) {
      const min = control.errors?.['min'].min;
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${min}`;
    }
    if (control?.hasError('max')) {
      const max = control.errors?.['max'].max;
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must not exceed ${max}`;
    }
    return '';
  }
} 