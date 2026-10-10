/**
 * hooks/useLocalStorage.js
 * ─────────────────────────────────────────────────────────────
 * Custom hook that syncs React state with localStorage.
 *
 * CONCEPT: Custom Hook pattern — extracting stateful logic from
 * components into a reusable function with lazy initialization.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useCallback } from 'react';

/**
 * @param {string} key         - localStorage key
 * @param {*}      initialValue - fallback if nothing stored
 * @returns {[value, setValue]} - same API as useState
 */
function useLocalStorage(key, initialValue) {
  // Lazy initializer: reads localStorage only on first render
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Failed to read key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * setValue: accepts either a new value or an updater function
   */
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`[useLocalStorage] Failed to write key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

export default useLocalStorage;
