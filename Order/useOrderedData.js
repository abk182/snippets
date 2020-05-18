// @flow
import orderBy from 'lodash/orderBy';
import { useOrder } from './index';

export default function<S: {}> (
  data?: Array<S> = [],
  initialState?: Map<$Keys<S>, "asc" | "desc"> = new Map(),
): [Map<$Keys<S>, "asc" | "desc">, (key: $Keys<S>) => void, Array<S>] {
  const [order, setOrder] = useOrder<S>(initialState);

  return [
    order,

    setOrder,

    order.size > 0 && data.length > 1
      ? orderBy(data, Array.from(order.keys()), Array.from(order.values()))
      : data,
  ];
}
