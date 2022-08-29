export async function getLocationDetails(place, token) {
  const encodedPlace = encodeURIComponent(place);

  const url = new URL('https://api.mapbox.com/');
  url.pathname = `/geocoding/v5/mapbox.places/${encodedPlace}.json`;
  url.searchParams.set('proximity', 'ip');
  url.searchParams.set('types', 'place');
  url.searchParams.set('access_token', token);

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error(res);
  }

  const { features = [] } = await res.json();
  const location = features[0];

  return location;
}
