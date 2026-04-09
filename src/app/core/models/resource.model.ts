export interface Resource {
  id: string;
  name: string;
  description: string;
  holdDurationMinutes: number;
  totalSlots: number;
  availableSlots: number;
  isActive: boolean;
  createdAt: string;
}