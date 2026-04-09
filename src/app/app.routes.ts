import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/resource-list/resource-list.component')
        .then(m => m.ResourceListComponent)
  },
  {
    path: 'resources/:id',
    loadComponent: () =>
      import('./features/slot-grid/slot-grid.component')
        .then(m => m.SlotGridComponent)
  },
  { path: '**', redirectTo: '' }
];