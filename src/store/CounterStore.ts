'use client';

import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { createStoreProvider } from '@/providers/StoreProvider';

export type CounterStore = {
  count: number;
  incrementCount: () => void;
  decrementCount: () => void;
};

export const createCounterStore = () => {
  return createStore<CounterStore>()(
    persist(
      (set) => ({
        count: 0,
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
        decrementCount: () => set((state) => ({ count: state.count - 1 })),
      }),
      { name: 'counter-store' }
    )
  );
};

export const {
  StoreProvider: CounterStoreProvider,
  useStoreHook: useCounterStore,
} = createStoreProvider(createCounterStore);
