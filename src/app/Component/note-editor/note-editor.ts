import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-note-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.html',
  styleUrl: './note-editor.css',
})
export class NoteEditor implements OnInit {

  clients: Client[] = [];
  selectedClientId = '';
  noteText = '';

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.clients = this.storage.getClients();
    if (this.clients.length > 0) {
      this.selectedClientId = this.clients[0].id;
    }
  }

  saveNote(): void {
    if (!this.selectedClientId || !this.noteText.trim()) {
      return;
    }
    this.clients = this.storage.addNote(this.selectedClientId, this.noteText.trim());
    this.noteText = '';
  }

  get selectedClient(): Client | undefined {
    return this.clients.find(c => c.id === this.selectedClientId);
  }
}
