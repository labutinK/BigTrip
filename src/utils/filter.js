import {FilterType} from '../const.js';
import dayjs from 'dayjs';

export const filtersUtils = {
  [FilterType.ALL]: (points) => points.filter((point) => true),
  [FilterType.PAST]: (points) => points.filter((point) => point.dateEnd.isBefore(dayjs(), `minute`)),
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateEnd, `minute`)),
};
