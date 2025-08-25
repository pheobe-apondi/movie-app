
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

export default async function tmdbFetch(endpoint: string) {
  if (!endpoint.startsWith('/')) {
    endpoint = '/' + endpoint;
  }

  const url = `${BASE_URL}${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  console.log('Fetching URL:', url); 
  console.log('Headers:', headers); 

  const res = await fetch(url, { headers });

  if (!res.ok) {
    console.error('Response not OK:', res.status, res.statusText);
    throw new Error(`TMDB fetch failed: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  console.log('Raw response:', text); 

  if (!text) {
    throw new Error('Empty response from TMDB API');
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON parse error:', error);
    console.error('Response text:', text);
    throw new Error('Invalid JSON response from TMDB API');
  }
}
