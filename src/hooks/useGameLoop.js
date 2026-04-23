import { useEffect, useRef } from 'react';
import { TICK_INTERVAL_MS } from '../utils/constants';

export function useGameLoop(onTick) {
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    const id = setInterval(() => {
      onTickRef.current();
    }, TICK_INTERVAL_MS);

    return () => clearInterval(id);
  }, []);
}
