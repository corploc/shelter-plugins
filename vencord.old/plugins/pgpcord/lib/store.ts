import { PluginSettings, UserKeyPair } from './types';

const SETTINGS_KEY = 'pgpcord_settings';
const KEYS_KEY = 'pgpcord_keys';
const LOCK_STATE_KEY = 'pgpcord_lock_state';

export const Store = {
    get settings(): PluginSettings {
        try {
            return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
        } catch {
            return {} as PluginSettings;
        }
    },
    set settings(v: PluginSettings) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(v));
    },
    get keys(): UserKeyPair | undefined {
        try {
            const data = localStorage.getItem(KEYS_KEY);
            return data ? JSON.parse(data) : undefined;
        } catch {
            return undefined;
        }
    },
    set keys(v: UserKeyPair | undefined) {
        if (v) {
            localStorage.setItem(KEYS_KEY, JSON.stringify(v));
        } else {
            localStorage.removeItem(KEYS_KEY);
        }
    },
    get lockState(): Record<string, boolean> {
        try {
            return JSON.parse(localStorage.getItem(LOCK_STATE_KEY) || '{}');
        } catch {
            return {};
        }
    },
    set lockState(v: Record<string, boolean>) {
        localStorage.setItem(LOCK_STATE_KEY, JSON.stringify(v));
    }
};

// Global secure mode state (in-memory)
let _isSecureMode = false;
const listeners: (() => void)[] = [];

export const isSecureMode = () => _isSecureMode;
export const setSecureMode = (v: boolean) => {
    _isSecureMode = v;
    listeners.forEach(l => l());
};

export const addSecureModeListener = (cb: () => void) => {
    listeners.push(cb);
    return () => {
        const idx = listeners.indexOf(cb);
        if (idx !== -1) listeners.splice(idx, 1);
    };
};
