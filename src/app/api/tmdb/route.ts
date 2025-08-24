
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

export default async function tmdbFetch(endpoint: string) {
  // Ensure endpoint has leading slash, or add it
  if (!endpoint.startsWith('/')) {
    endpoint = '/' + endpoint;
  }

  // Always append API key as query param for v3 API
  const url = `${BASE_URL}${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  console.log('Fetching URL:', url); // Debug log
  console.log('Headers:', headers); // Debug log

  const res = await fetch(url, { headers });

  if (!res.ok) {
    console.error('Response not OK:', res.status, res.statusText);
    throw new Error(`TMDB fetch failed: ${res.status} ${res.statusText}`);
  }

  const text = await res.text();
  console.log('Raw response:', text); // Debug log

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
