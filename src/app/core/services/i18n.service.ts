import { Injectable, signal, computed } from '@angular/core';
import { Lang, Translations, TRANSLATIONS } from './i18n.translations';

const STORAGE_KEY = 'slotflow_lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly _lang = signal<Lang>(this.getInitialLang());

  readonly lang = this._lang.asReadonly();
  readonly t = computed<Translations>(() => TRANSLATIONS[this._lang()]);

  toggle(): void {
    this.setLang(this._lang() === 'en' ? 'es' : 'en');
  }

  setLang(lang: Lang): void {
    this._lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
  }

  private getInitialLang(): Lang {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === 'en' || stored === 'es') return stored;

    // Detectar idioma del navegador
    const browser = navigator.language.slice(0, 2).toLowerCase();
    return browser === 'es' ? 'es' : 'en';
  }
}