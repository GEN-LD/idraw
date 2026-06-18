export const ROUTES = {
  HOME: '/',
  CATEGORY: '/category',
  SUBJECTS: '/subjects/:category',
  DRAWING: '/draw',
  SETTINGS: '/settings',
};

export function getSubjectsPath(category) {
  return `/subjects/${category}`;
}
