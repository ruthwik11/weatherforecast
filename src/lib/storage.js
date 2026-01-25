const LOCATION_KEY = 'weatherAppLocation';

export function getLocation() {
  return localStorage.getItem(LOCATION_KEY) || null;
}

export function setLocation(location) {
  if (location) localStorage.setItem(LOCATION_KEY, location);
  else localStorage.removeItem(LOCATION_KEY);
}
