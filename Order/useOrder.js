// @flow
import { useState } from 'react';

export default function<S: {}> (
  initialState?: Map<$Keys<S>, "asc" | "desc"> = new Map(),
): [Map<$Keys<S>, "asc" | "desc">, (key: $Keys<S>) => void] {
  const [order, setOrder] = useState<Map<$Keys<S>, "asc" | "desc">>(
    initialState,
  );

  return [
    order,
    (key) => {
      const newOrder = new Map(order);
      switch (newOrder.get(key)) {
        case undefined:
        case null:
          newOrder.set(key, 'asc');
          break;
        case 'asc':
          newOrder.set(key, 'desc');
          break;
        default:
          newOrder.delete(key);
      }
      setOrder(newOrder);
    },
  ];
}
