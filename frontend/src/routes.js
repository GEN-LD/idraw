export const ROUTES = {
  HOME: '/',
  CATEGORY: '/category',
  SUBJECTS: '/subjects/:category',
  DRAWING: '/draw',
  COLORING: '/coloring/:subject',
  SETTINGS: '/settings',
};

export function getSubjectsPath(category) {
  return `/subjects/${category}`;
}
