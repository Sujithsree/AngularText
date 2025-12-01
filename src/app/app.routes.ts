import { Routes } from '@angular/router';
import { ClientForm } from './Component/client-form/client-form';
import { ClientList } from './Component/client-list/client-list';
import { ClientDetail } from './Component/client-detail/client-detail';
import { NoteEditor } from './Component/note-editor/note-editor';

export const routes: Routes = [
    {path:'', component :ClientForm},
    {path:'list', component :ClientList},
    {path:'details', component :ClientDetail},
    {path:'notes', component :NoteEditor},
];
