export interface ActiveReservation {
  id: string;
  status: 'Held' | 'Confirmed';
  expiresAt: string | null;
  userId: string;
}

export interface Slot {
  id: string;
  slotNumber: number;
  isAvailable: boolean;
  activeReservation: ActiveReservation | null;
}