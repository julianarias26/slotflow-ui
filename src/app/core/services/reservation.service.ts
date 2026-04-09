import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  hold(slotId: string, userId: string): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${this.base}/reservations/hold`,
      { slotId },
      { headers: this.userHeader(userId) }
    );
  }

  confirm(reservationId: string, userId: string): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${this.base}/reservations/${reservationId}/confirm`,
      {},
      { headers: this.userHeader(userId) }
    );
  }

  cancel(reservationId: string, userId: string): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${this.base}/reservations/${reservationId}/cancel`,
      {},
      { headers: this.userHeader(userId) }
    );
  }

  private userHeader(userId: string): HttpHeaders {
    return new HttpHeaders({ 'X-User-Id': userId });
  }
}