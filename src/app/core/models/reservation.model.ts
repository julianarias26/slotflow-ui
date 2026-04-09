export interface Reservation {
  id: string;
  slotId: string;
  slotNumber: number;
  resourceId: string;
  resourceName: string;
  userId: string;
  status: 'Held' | 'Confirmed' | 'Expired' | 'Released';
  heldAt: string;
  expiresAt: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
}