import { Injectable } from '@angular/core';


export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  tags: string[];    
  createdAt: string;   
  notes: Note[];
}


const STORAGE_KEY = 'clientnotes_v21_1234';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  
  private createId(): string {
    return 'id-' + Math.random().toString(36).substring(2, 10);
  }


  private loadClients(): Client[] {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) {
      return [];
    }
    try {
      const parsed = JSON.parse(json);
      return Array.isArray(parsed) ? parsed as Client[] : [];
    } catch {
      
      return [];
    }
  }

  private saveClients(clients: Client[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }

  

  getClients(): Client[] {
    return this.loadClients();
  }

  addClient(name: string, email: string, tagsInput: string): Client[] {
    const clients = this.loadClients();

    
    const alreadyExists = clients.some(c => c.email.toLowerCase() === email.toLowerCase());
    if (alreadyExists) {
    
      return clients;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newClient: Client = {
      id: this.createId(),
      name,
      email,
      tags,
      createdAt: new Date().toISOString(),
      notes: [],
    };

    clients.push(newClient);
    this.saveClients(clients);
    return clients;
  }

  addNote(clientId: string, noteContent: string): Client[] {
    const clients = this.loadClients();
    const client = clients.find(c => c.id === clientId);
    if (!client) {
      return clients;
    }

    const newNote: Note = {
      id: this.createId(),
      content: noteContent,
      createdAt: new Date().toISOString(),
    };

    client.notes.push(newNote);
    this.saveClients(clients);
    return clients;
  }

  updateNote(clientId: string, noteId: string, newContent: string): Client[] {
    const clients = this.loadClients();
    const client = clients.find(c => c.id === clientId);
    if (!client) {
      return clients;
    }
    const note = client.notes.find(n => n.id === noteId);
    if (!note) {
      return clients;
    }
    note.content = newContent;
    this.saveClients(clients);
    return clients;
  }

  deleteNote(clientId: string, noteId: string): Client[] {
    const clients = this.loadClients();
    const client = clients.find(c => c.id === clientId);
    if (!client) {
      return clients;
    }
    client.notes = client.notes.filter(n => n.id !== noteId);
    this.saveClients(clients);
    return clients;
  }

  
  deleteClient(clientId: string): Client[] {
    const clients = this.loadClients();
    const filtered = clients.filter(c => c.id !== clientId);
    this.saveClients(filtered);
    return filtered;
  }

  
  mergeFromSeed(seed: string): Client[] {
    
    const existing = this.loadClients();
    if (existing.length > 0) {
      return existing;
    }

    
    const s = parseInt(seed, 10);
    if (isNaN(s)) {
      return existing;
    }

    const seededClients: Client[] = [];

    
    for (let i = 1; i <= 3; i++) {
      const name =
        'Client-' +
        String.fromCharCode(65 + ((s + i) % 26)) +
        '-' +
        (s * i);

      const email = name
        .toLowerCase()
        .replace(/\s+/g, '') +
        '@exam.local';

      const tags = ['seeded', 'g' + ((s + i) % 5)];

      const createdAt = new Date(Date.now() - i * 86400000).toISOString();

      const client: Client = {
        id: this.createId(),
        name,
        email,
        tags,
        createdAt,
        notes: [],
      };

      seededClients.push(client);
    }

    const merged = [...existing, ...seededClients];
    this.saveClients(merged);
    return merged;
  }
}
