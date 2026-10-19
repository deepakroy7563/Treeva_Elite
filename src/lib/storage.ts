import type { Hotel, AgencySettings } from '../types/hotel';
import type { AuthState } from '../types/auth';
import { INITIAL_SAMPLE_HOTELS, INITIAL_AGENCY_SETTINGS } from './demoData';
import { clearAllImagesFromIndexedDB } from './imageStorage';

const HOTELS_KEY = 'treeva_elite_hotels';
const SETTINGS_KEY = 'treeva_elite_settings';
const AUTH_KEY = 'treeva_elite_auth';

export function getStoredHotels(): Hotel[] {
  try {
    const raw = localStorage.getItem(HOTELS_KEY);
    if (!raw) {
      // First time initialization: populate with sample data
      localStorage.setItem(HOTELS_KEY, JSON.stringify(INITIAL_SAMPLE_HOTELS));
      return INITIAL_SAMPLE_HOTELS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_SAMPLE_HOTELS;
  } catch (error) {
    console.error('Failed to parse hotels from LocalStorage:', error);
    return INITIAL_SAMPLE_HOTELS;
  }
}

export function saveStoredHotels(hotels: Hotel[]): void {
  try {
    localStorage.setItem(HOTELS_KEY, JSON.stringify(hotels));
  } catch (error) {
    console.error('Failed to save hotels to LocalStorage:', error);
  }
}

export function getStoredSettings(): AgencySettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_AGENCY_SETTINGS));
      return INITIAL_AGENCY_SETTINGS;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse settings from LocalStorage:', error);
    return INITIAL_AGENCY_SETTINGS;
  }
}

export function saveStoredSettings(settings: AgencySettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings to LocalStorage:', error);
  }
}

export function getStoredAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) {
      return { isAuthenticated: false, user: null };
    }
    return JSON.parse(raw);
  } catch (error) {
    return { isAuthenticated: false, user: null };
  }
}

export function saveStoredAuth(auth: AuthState): void {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } catch (error) {
    console.error('Failed to save auth state:', error);
  }
}

export function clearStoredAuth(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('Failed to clear auth state:', error);
  }
}

export async function resetDemoToDefaults(): Promise<Hotel[]> {
  try {
    await clearAllImagesFromIndexedDB();
    localStorage.setItem(HOTELS_KEY, JSON.stringify(INITIAL_SAMPLE_HOTELS));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_AGENCY_SETTINGS));
    return INITIAL_SAMPLE_HOTELS;
  } catch (error) {
    console.error('Failed to reset demo data:', error);
    return INITIAL_SAMPLE_HOTELS;
  }
}
