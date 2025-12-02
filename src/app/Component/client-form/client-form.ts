import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css',
})
export class ClientForm {

  constructor(private storage: StorageService, private router: Router) {}

  // Simple reactive form for name, email, and tags.
  ClientProfileForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    tags: new FormControl<string>('vip', { nonNullable: true }),
  });

  
  saveClient(): void {
    if (this.ClientProfileForm.invalid) {
      return;
    }

    const name = this.ClientProfileForm.value.name ?? '';
    const email = this.ClientProfileForm.value.email ?? '';
    const tags = this.ClientProfileForm.value.tags ?? '';

    const before = this.storage.getClients();
    const after = this.storage.addClient(name, email, tags);

    if (after.length === before.length) {
      alert('This client already logged in. Same email cannot login again.');
      return;
    }

    console.log('Saved clients:', after);
    this.router.navigate(['/list']);
  }
}