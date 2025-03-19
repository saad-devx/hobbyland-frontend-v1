import { setGlobal, addCallback } from 'reactn';

/**
 * Initializes ReactN global states with default values.
 */
export function initializeGlobalState(persistFields = []) {
    const initialState = {};

    persistFields.forEach((field) => {
        const value = localStorage.getItem(field);
        initialState[field] = value ? JSON.parse(value) : null;
    });

    setGlobal({
        ...initialState,
        isAuthenticated: !!initialState.user,
        notifications: [],
        cart: [],
    });
}

/**
 * Dynamically registers a persistence callback for specified states.
 * Array of global state keys to persist.
 */
export function registerPersistCallback() {
    const statesToPersist = []
    addCallback((globalState) => {
        statesToPersist.forEach((stateKey) => {
            if (stateKey in globalState) {
                const value = globalState[stateKey];
                if (value !== undefined && value !== null) {
                    localStorage.setItem(stateKey, JSON.stringify(value));
                } else {
                    localStorage.removeItem(stateKey); // Remove if state is null/undefined
                }
            }
        });
    });
}
