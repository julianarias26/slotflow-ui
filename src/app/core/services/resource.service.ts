import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../models/resource.model';
import { Slot } from '../models/slot.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  getAll(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.base}/resources`);
  }

  getSlots(resourceId: string): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.base}/resources/${resourceId}/slots`);
  }
}