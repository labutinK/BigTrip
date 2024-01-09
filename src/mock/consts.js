import {generateUnicNumber, getRandomInteger} from "../utils/common";

export const pointTypes = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

export const towns = [
  `Yerevan`,
  `Moscow`,
  `Liverpool`,
  `Rostov`,
  `Riga`,
  `Pskov`,
  `Saint Petersburg`,
  `London`,
  `Rome`,
  `Genoa`,
  `Berlin`,
];

export const descriptions = [
  `Узкие булыжные улочки этого города переплетаются, создавая уникальный узор истории, культуры и современной жизни.`,
  `Высокие небоскрёбы отражают радужные отблески утреннего света, придавая городу величественный и современный вид.`,
  `Через город протекают живописные реки, создавая идиллические зоны отдыха и связывая различные районы в единое целое.`,
  `Пышные зеленые парки придают городу ощущение тропического райского уголка, наполненного свежим воздухом и пением птиц.`,
  `Главная площадь, оживленная и яркая, становится местом встречи для местных жителей и туристов, желающих насладиться культурой и гастрономией.`,
  `Исторические здания с вековыми росписями рядом с ультрасовременной архитектурой создают уникальный контраст старины и новизны.`,
  `Уютные кафе на каждом углу улиц предлагают вкуснейшие местные блюда, привлекая гурманов со всего мира.`,
  `Набережные этого города идеально подходят для вечерних прогулок, где можно насладиться видами на оживленную реку и городские огни.`,
  `Вечерний город оживает благодаря ярким неоновым вывескам и уличным музыкантам, создавая неповторимую атмосферу радости и свободы.`,
  `В этом городе современные арт-галереи и музеи соседствуют с античными руинами, напоминая о богатой исторической наследии.`,
];

const fillPhotos = () => {
  const newPhotoGenerator = generateUnicNumber(1, 150);
  return new Array(getRandomInteger(1, 5)).fill().map(() => `http://picsum.photos/248/152?r=${newPhotoGenerator()}`);
};

export const destinations = new Map(
    [
      [
        towns[0],
        {
          description: `Узкие булыжные улочки этого города переплетаются, создавая уникальный узор истории, культуры и современной жизни.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[1],
        {
          description: `Высокие небоскрёбы отражают радужные отблески утреннего света, придавая городу величественный и современный вид.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[2],
        {
          description: `Через город протекают живописные реки, создавая идиллические зоны отдыха и связывая различные районы в единое целое.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[3],
        {
          description: `Пышные зеленые парки придают городу ощущение тропического райского уголка, наполненного свежим воздухом и пением птиц.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[4],
        {
          description: `Узкие булыжные улочки этого города переплетаются, создавая уникальный узор истории, культуры и современной жизни.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[5],
        {
          description: `Главная площадь, оживленная и яркая, становится местом встречи для местных жителей и туристов, желающих насладиться культурой и гастрономией.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[6],
        {
          description: `Исторические здания с вековыми росписями рядом с ультрасовременной архитектурой создают уникальный контраст старины и новизны.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[7],
        {
          description: `Уютные кафе на каждом углу улиц предлагают вкуснейшие местные блюда, привлекая гурманов со всего мира.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[8],
        {
          description: `Набережные этого города идеально подходят для вечерних прогулок, где можно насладиться видами на оживленную реку и городские огни.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[9],
        {
          description: `Вечерний город оживает благодаря ярким неоновым вывескам и уличным музыкантам, создавая неповторимую атмосферу радости и свободы.`,
          photos: fillPhotos(),
        }
      ],
      [
        towns[10],
        {
          description: `В этом городе современные арт-галереи и музеи соседствуют с античными руинами, напоминая о богатой исторической наследии.`,
          photos: fillPhotos(),
        }
      ]
    ]);


export const offers = new Map([
  [
    pointTypes[0],
    [
      {
        name: `Некурящий водитель`,
        cost: 2,
        formName: `non_smoking_driver`
      },
      {
        name: `Помощь с багажом`,
        cost: 10,
        formName: `luggage_help`
      },
      {
        name: `Бронь на время`,
        cost: 20,
        formName: `time_booking`
      },
    ]
  ],
  [
    pointTypes[1],
    [
      {
        name: `Выслать расписание`,
        cost: 2,
        formName: `get_schedule`
      },
    ]
  ],
  [
    pointTypes[2],
    [
      {
        name: `Выслать расписание`,
        cost: 2,
        formName: `get_schedule`
      },
      {
        name: `Доп. место для питомца`,
        cost: 10,
        formName: `additional_pet_place`
      },
    ]
  ],
  [
    pointTypes[3],
    [
      {
        name: `Просторная каюта`,
        cost: 45,
        formName: `large_place`
      },
      {
        name: `Ужин включен`,
        cost: 15,
        formName: `dinner_included`
      },
      {
        name: `Страховка`,
        cost: 25,
        formName: `insurance`
      },
    ]
  ],
  [
    pointTypes[4],
    [
      {
        name: `Помощь с выбором`,
        cost: 10,
        formName: `choice_help`
      },
    ]
  ],
  [
    pointTypes[5],
    [
      {
        name: `Водитель на день`,
        cost: 200,
        formName: `one_day_driver`
      },
      {
        name: `Помощь с багажом`,
        cost: 10,
        formName: `luggage_help`
      },
      {
        name: `Бронь на время`,
        cost: 20,
        formName: `time_booking`
      },
    ]
  ],
  [
    pointTypes[6],
    [
      {
        name: `Багаж`,
        cost: 20,
        formName: `luggage_help`
      },
      {
        name: `Ненормативный багаж`,
        cost: 40,
        formName: `unformat_luggage`
      },
      {
        name: `Регистрация заранее`,
        cost: 20,
        formName: `registration_in_advance`
      },
    ]
  ],
  [
    pointTypes[7],
    [
      {
        name: `Некурящий водитель`,
        cost: 2,
        formName: `non_smoking_driver`
      },
      {
        name: `Помощь с багажом`,
        cost: 10,
        formName: `luggage_help`
      },
      {
        name: `Бронь на время`,
        cost: 20,
        formName: `time_booking`
      },
    ]
  ],
  [
    pointTypes[8],
    [
      {
        name: `Некурящий водитель`,
        cost: 2,
        formName: `non_smoking_driver`
      },
      {
        name: `Помощь с багажом`,
        cost: 10,
        formName: `luggage_help`
      },
      {
        name: `Бронь на время`,
        cost: 20,
        formName: `time_booking`
      },
    ]
  ],
  [
    pointTypes[9],
    [
      {
        name: `Столик у окна`,
        cost: 15,
        formName: `table_by_window`
      },
      {
        name: `Бронь на время`,
        cost: 20,
        formName: `time_booking`
      },
    ]
  ],
]);


export const menuItems = [
  {
    label: `Table`,
    href: `#`,
    checked: true
  },
  {
    label: `Stats`,
    href: `#`,
    checked: false
  }
];
