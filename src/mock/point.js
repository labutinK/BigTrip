import {getRandomInteger, generateUnicNumber} from '../utils';
import dayjs from 'dayjs';
import {pointTypes, towns, descriptions, offers} from './consts';

const fillPhotos = () => {
  const newPhotoGenerator = generateUnicNumber(1, 150);
  return new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${newPhotoGenerator()}`);
};

export const generatePoint = () => {
  const date = dayjs().add(getRandomInteger(1, 5), `day`).add(getRandomInteger(5, 10), `hour`).add(getRandomInteger(1, 6) * 10, `minute`);
  const type = pointTypes[getRandomInteger(0, pointTypes.length - 1)];
  const offerss = offers.get(type);
  return {
    type,
    offers: offerss.filter((offer) => {
      if (getRandomInteger(0, 1)) {
        return offer;
      }
      return null;
    }),
    town: towns[getRandomInteger(0, towns.length - 1)],
    destination: {
      description: descriptions[getRandomInteger(0, descriptions.length - 1)],
      photos: fillPhotos(),
    },
    cost: getRandomInteger(0, 149) * 5,
    dateStart: date,
    dateEnd: date.add(getRandomInteger(5, 10), `hour`).add(getRandomInteger(1, 6) * 10, `minute`),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

