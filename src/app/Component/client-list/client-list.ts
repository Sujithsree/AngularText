import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-client-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit {
  clients: Client[] = [];
  searchText = '';

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.clients = this.storage.getClients();
  }

  // Simple filter by name or email using the search text.
  get filteredClients(): Client[] {
    const term = this.searchText.toLowerCase();
    if (!term) {
      return this.clients;
    }
    return this.clients.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)
    );
  }

  deleteClient(clientId: string): void {
    this.clients = this.storage.deleteClient(clientId);
  }
}
