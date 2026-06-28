import { DrawingCategory } from './constants.js';

const subjects = [
  {
    id: 'panda',
    name: '熊猫',
    category: DrawingCategory.ANIMAL,
    icon: 'IcSubjectPanda',
    lineArt: 'LineartPanda',
  },
  {
    id: 'rabbit',
    name: '小兔子',
    category: DrawingCategory.ANIMAL,
    icon: 'IcSubjectRabbit',
    lineArt: 'LineartRabbit',
  },
  {
    id: 'giraffe',
    name: '长颈鹿',
    category: DrawingCategory.ANIMAL,
    icon: 'IcSubjectGiraffe',
    lineArt: 'LineartGiraffe',
  },
  {
    id: 'excavator',
    name: '挖掘机',
    category: DrawingCategory.VEHICLE,
    icon: 'IcSubjectExcavator',
    lineArt: 'LineartExcavator',
  },
  {
    id: 'fire_truck',
    name: '消防车',
    category: DrawingCategory.VEHICLE,
    icon: 'IcSubjectFireTruck',
    lineArt: 'LineartFireTruck',
  },
  {
    id: 'police_car',
    name: '警车',
    category: DrawingCategory.VEHICLE,
    icon: 'IcSubjectPoliceCar',
    lineArt: 'LineartPoliceCar',
  },
  {
    id: 'train',
    name: '小火车',
    category: DrawingCategory.VEHICLE,
    icon: 'IcSubjectTrain',
    lineArt: 'LineartTrain',
  },
  {
    id: 'crane',
    name: '吊车',
    category: DrawingCategory.VEHICLE,
    icon: 'IcSubjectCrane',
    lineArt: 'LineartCrane',
  },
];

export function getSubjects(category) {
  if (category === DrawingCategory.ANIMAL || category === DrawingCategory.VEHICLE) {
    return subjects.filter((s) => s.category === category);
  }
  return [];
}

export function getSubjectById(id) {
  return subjects.find((s) => s.id === id) || null;
}

export function getCategoryTitle(category) {
  switch (category) {
    case DrawingCategory.ANIMAL:
      return '动物';
    case DrawingCategory.VEHICLE:
      return '交通工具';
    default:
      return '';
  }
}
