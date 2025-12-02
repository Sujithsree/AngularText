import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-client-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './client-detail.html',
  styleUrl: './client-detail.css',
})
export class ClientDetail implements OnInit {

  clientList: Client[] = [];
  selectedClient: Client | null = null;

  // For adding a new note
  newNoteText = '';

  // For editing an existing note
  editingNoteId: string | null = null;
  editNoteText = '';

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.clientList = this.storage.getClients();
    if (this.clientList.length > 0) {
      this.selectClient(this.clientList[0]);
    }
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
    this.cancelEdit();
  }

  addNote(): void {
    if (!this.selectedClient || !this.newNoteText.trim()) {
      return;
    }
    this.clientList = this.storage.addNote(this.selectedClient.id, this.newNoteText.trim());
    this.refreshSelectedClient();
    this.newNoteText = '';
  }

  startEdit(noteId: string, currentText: string): void {
    this.editingNoteId = noteId;
    this.editNoteText = currentText;
  }

  saveEdit(): void {
    if (!this.selectedClient || !this.editingNoteId) {
      return;
    }
    this.clientList = this.storage.updateNote(this.selectedClient.id, this.editingNoteId, this.editNoteText);
    this.refreshSelectedClient();
    this.cancelEdit();
  }

  deleteNote(noteId: string): void {
    if (!this.selectedClient) {
      return;
    }
    this.clientList = this.storage.deleteNote(this.selectedClient.id, noteId);
    this.refreshSelectedClient();
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingNoteId = null;
    this.editNoteText = '';
  }

  private refreshSelectedClient(): void {
    if (!this.selectedClient) {
      return;
    }
    // Find the updated version of the same client from the list
    const updated = this.clientList.find(c => c.id === this.selectedClient!.id) || null;
    this.selectedClient = updated;
  }
}
