/**
 * hooks/useLocalStorage.js
 * ─────────────────────────────────────────────────────────────
 * Custom hook that syncs React state with localStorage.
 *
 * CONCEPT: This is the "Custom Hook" pattern — extracting
 * stateful logic from components into a reusable function.
 *
 * HOW IT WORKS:
 *  1. On mount, we read the stored JSON from localStorage.
 *     If nothing exists, we use `initialValue` (seed data).
 *  2. The `setValue` wrapper updates React state AND writes
 *     to localStorage on every change — keeping them in sync.
 *  3. We use a lazy initializer in useState(() => ...) so the
 *     JSON.parse only runs once, not on every render.
 *
 * ALGORITHM: O(1) read/write — localStorage is synchronous
 * key-value store in the browser's process.
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from 'react';

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
      // If a stored value exists, parse and return it
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`[useLocalStorage] Failed to read key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * setValue: accepts either a new value or an updater function
   * (same API as React's own setState).
   */
  const setValue = useCallback(
    (value) => {
      try {
        // Allow value to be a function (functional update pattern)
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        // Persist to localStorage
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
