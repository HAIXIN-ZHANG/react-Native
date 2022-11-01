import {getDistance} from 'geolib';

/**
 * Calculate the nearest location
 *
 * @param {locations} array.
 * @param {userLocation} object.
 * @param {payload} payload data.
 * @return {Object}.
 */
export function calculateDistance(locations, userLocation) {
  const nearestLocations = locations
    ?.map(location => {
      const metres = getDistance(userLocation, location.coordinates);
      location['distance'] = {
        metres: metres,
        nearby: metres <= 100 ? true : false,
      };
      return location;
    })
    .sort((previousLocation, thisLocation) => {
      return previousLocation.distance.metres - thisLocation.distance.metres;
    });
  return nearestLocations.shift();
}
