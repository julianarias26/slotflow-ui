import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { interval, Subscription, switchMap } from 'rxjs';
import { ResourceService } from '../../core/services/resource.service';
import { ReservationService } from '../../core/services/reservation.service';
import { I18nService } from '../../core/services/i18n.service';
import { Slot } from '../../core/models/slot.model';
import { Reservation } from '../../core/models/reservation.model';

@Component({
  selector: 'app-slot-grid',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './slot-grid.component.html'
})
export class SlotGridComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly resourceService = inject(ResourceService);
  private readonly reservationService = inject(ReservationService);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly i18n = inject(I18nService);

  resourceId = '';
  userId = 'user-' + Math.random().toString(36).slice(2, 7);

  slots: Slot[] = [];
  loading = true;
  error = '';

  confirmedReservations: Reservation[] = [];
  activeReservation: Reservation | null = null;

  actionMessage = '';
  actionError = '';
  actionLoading = false;

  remainingSeconds = 0;
  private countdownInterval?: ReturnType<typeof setInterval>;
  private pollSub?: Subscription;

  ngOnInit(): void {
    this.resourceId = this.route.snapshot.paramMap.get('id')!;
    this.loadSlots();
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
    clearInterval(this.countdownInterval);
  }

  private loadSlots(): void {
    this.resourceService.getSlots(this.resourceId).subscribe({
      next: data => {
        this.slots = data;
        this.loading = false;
        this.error = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = this.i18n.t().errorLoadSlots;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private startPolling(): void {
    this.pollSub = interval(5000)
      .pipe(switchMap(() => this.resourceService.getSlots(this.resourceId)))
      .subscribe({
        next: data => {
          this.slots = data;

          if (this.activeReservation) {
            const stillHeld = data.some(s =>
              s.activeReservation?.id === this.activeReservation?.id &&
              s.activeReservation?.status === 'Held'
            );
            if (!stillHeld) {
              this.clearActiveReservation();
              this.actionMessage = this.i18n.t().expiredMsg;
            }
          }

          this.cdr.detectChanges();
        }
      });
  }

  hold(slotId: string): void {
    this.actionLoading = true;
    this.actionError = '';
    this.actionMessage = '';

    this.reservationService.hold(slotId, this.userId).subscribe({
      next: reservation => {
        this.activeReservation = reservation;
        this.actionLoading = false;
        this.startCountdown(reservation.expiresAt);
        this.loadSlots();
        this.cdr.detectChanges();
      },
      error: err => {
        this.actionError = err.error?.message ?? this.i18n.t().errorReserve;
        this.actionLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirm(): void {
    if (!this.activeReservation) return;
    this.actionLoading = true;
    this.actionError = '';

    this.reservationService.confirm(this.activeReservation.id, this.userId).subscribe({
      next: reservation => {
        this.confirmedReservations.push(reservation);
        this.activeReservation = { ...reservation };
        this.actionLoading = false;
        clearInterval(this.countdownInterval);
        this.remainingSeconds = 0;
        this.loadSlots();
        this.cdr.detectChanges();

        setTimeout(() => {
          this.activeReservation = null;
          this.actionMessage = this.i18n.t().confirmedMsg
            .replace('{n}', String(reservation.slotNumber));
          this.cdr.detectChanges();
        }, 2000);
      },
      error: err => {
        this.actionError = err.error?.message ?? this.i18n.t().errorConfirm;
        this.actionLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancelReservation(): void {
    if (!this.activeReservation) return;
    this.actionLoading = true;
    this.actionError = '';

    this.reservationService.cancel(this.activeReservation.id, this.userId).subscribe({
      next: () => {
        this.clearActiveReservation();
        this.actionMessage = this.i18n.t().releasedMsg;
        this.actionLoading = false;
        this.loadSlots();
        this.cdr.detectChanges();
      },
      error: err => {
        this.actionError = err.error?.message ?? this.i18n.t().errorCancel;
        this.actionLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private clearActiveReservation(): void {
    this.activeReservation = null;
    clearInterval(this.countdownInterval);
    this.remainingSeconds = 0;
  }

  private startCountdown(expiresAt: string): void {
    clearInterval(this.countdownInterval);

    const update = () => {
      const diff = Math.floor(
        (new Date(expiresAt).getTime() - Date.now()) / 1000
      );
      this.remainingSeconds = Math.max(0, diff);
      this.cdr.detectChanges();
    };

    update();
    this.countdownInterval = setInterval(update, 1000);
  }

  slotClass(slot: Slot): string {
    if (!slot.activeReservation) return 'slot available';
    if (slot.activeReservation.status === 'Confirmed') return 'slot confirmed';
    if (slot.activeReservation.userId === this.userId) return 'slot held-mine';
    return 'slot held';
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
}