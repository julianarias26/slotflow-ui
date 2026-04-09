export type Lang = 'en' | 'es';

export interface Translations {
  // Header
  tagline: string;

  // Resource list
  availableResources: string;
  resourceSubtitle: string;
  loadingResources: string;
  noResources: string;
  availability: string;
  active: string;
  minHold: string;

  // Slot grid
  backToResources: string;
  sessionId: string;
  loadingSlots: string;
  slotsLabel: string;
  slotFree: string;
  slotHeld: string;
  slotYours: string;
  slotDone: string;
  legendAvailable: string;
  legendHeldByOthers: string;
  legendYourHold: string;
  legendConfirmed: string;

  // Reservation panel
  activeReservation: string;
  timeRemaining: string;
  confirmReservation: string;
  release: string;
  slotConfirmedMsg: string;

  // Feedback
  expiredMsg: string;
  releasedMsg: string;
  confirmedMsg: string;
  errorReserve: string;
  errorConfirm: string;
  errorCancel: string;
  errorLoadSlots: string;
}

export const EN: Translations = {
  tagline: 'Temporary slot reservation engine',

  availableResources: 'Available Resources',
  resourceSubtitle: 'Select a resource to view and reserve slots',
  loadingResources: 'Loading resources...',
  noResources: 'No resources found. Create one via the API.',
  availability: 'Availability',
  active: 'Active',
  minHold: 'min hold',

  backToResources: 'Back to resources',
  sessionId: 'Session ID',
  loadingSlots: 'Loading slots...',
  slotsLabel: 'Slots — click an available slot to reserve',
  slotFree: 'Free',
  slotHeld: 'Hold',
  slotYours: 'Yours',
  slotDone: 'Done',
  legendAvailable: 'Available',
  legendHeldByOthers: 'Held by others',
  legendYourHold: 'Your hold',
  legendConfirmed: 'Confirmed',

  activeReservation: 'Active reservation',
  timeRemaining: 'Time remaining to confirm',
  confirmReservation: 'Confirm reservation',
  release: 'Release',
  slotConfirmedMsg: 'Slot #{n} is confirmed and secured.',

  expiredMsg: 'Your reservation expired. The slot is available again.',
  releasedMsg: 'Reservation released. Slot is available again.',
  confirmedMsg: 'Slot #{n} confirmed. Select another slot to reserve.',
  errorReserve: 'Failed to reserve slot.',
  errorConfirm: 'Failed to confirm reservation.',
  errorCancel: 'Failed to cancel reservation.',
  errorLoadSlots: 'Failed to load slots.',
};

export const ES: Translations = {
  tagline: 'Motor de reserva temporal de cupos',

  availableResources: 'Recursos disponibles',
  resourceSubtitle: 'Selecciona un recurso para ver y reservar cupos',
  loadingResources: 'Cargando recursos...',
  noResources: 'No se encontraron recursos. Crea uno desde la API.',
  availability: 'Disponibilidad',
  active: 'Activo',
  minHold: 'min reserva',

  backToResources: 'Volver a recursos',
  sessionId: 'ID de sesión',
  loadingSlots: 'Cargando cupos...',
  slotsLabel: 'Cupos — haz clic en un cupo disponible para reservar',
  slotFree: 'Libre',
  slotHeld: 'Reservado',
  slotYours: 'Tuyo',
  slotDone: 'Listo',
  legendAvailable: 'Disponible',
  legendHeldByOthers: 'Reservado por otros',
  legendYourHold: 'Tu reserva',
  legendConfirmed: 'Confirmado',

  activeReservation: 'Reserva activa',
  timeRemaining: 'Tiempo restante para confirmar',
  confirmReservation: 'Confirmar reserva',
  release: 'Liberar',
  slotConfirmedMsg: 'El cupo #{n} está confirmado y asegurado.',

  expiredMsg: 'Tu reserva expiró. El cupo está disponible nuevamente.',
  releasedMsg: 'Reserva liberada. El cupo está disponible nuevamente.',
  confirmedMsg: 'Cupo #{n} confirmado. Selecciona otro cupo para reservar.',
  errorReserve: 'No se pudo reservar el cupo.',
  errorConfirm: 'No se pudo confirmar la reserva.',
  errorCancel: 'No se pudo cancelar la reserva.',
  errorLoadSlots: 'No se pudieron cargar los cupos.',
};

export const TRANSLATIONS: Record<Lang, Translations> = { en: EN, es: ES };