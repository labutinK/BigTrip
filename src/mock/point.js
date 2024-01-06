import {getRandomInteger, generateUnicNumber} from "../utils/common";
import dayjs from 'dayjs';
import {nanoid} from "nanoid";
import {pointTypes, towns, offers, destinations} from './consts';

export const generatePoint = (newPoint = false) => {
  const date = dayjs().add(getRandomInteger(1, 5), `day`).add(getRandomInteger(5, 10), `hour`).add(getRandomInteger(1, 6) * 10, `minute`);
  const type = pointTypes[getRandomInteger(0, pointTypes.length - 1)];
  const pointOffers = offers.get(type);
  const townInd = getRandomInteger(0, towns.length - 1);
  return {
    id: nanoid(10),
    type,
    offers: newPoint ? [] : pointOffers.filter((offer) => {
      if (getRandomInteger(0, 1)) {
        return offer;
      }
      return null;
    }).map((offer) => offer.formName),
    town: newPoint ? `` : towns[townInd],
    cost: newPoint ? `` : getRandomInteger(0, 149) * 5,
    dateStart: date,
    dateEnd: date.add(getRandomInteger(5, 10), `hour`).add(getRandomInteger(1, 6) * 10, `minute`),
    isFavorite: newPoint ? false : Boolean(getRandomInteger(0, 1))
  };
};

