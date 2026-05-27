import { http, HttpResponse, delay } from 'msw';

const TMDB_BASE = 'https://api.themoviedb.org/3';

export const handlers = [
  http.get(`${TMDB_BASE}/movie/popular`, async ({ request }) => {
    await delay(800);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    return HttpResponse.json({
      page,
      total_pages: 10,
      total_results: 200,
      results: Array.from({ length: 20 }, (_, i) => ({
        id: page * 100 + i,
        title: `Film testowy ${page}-${i + 1}`,
        overview: 'Opis testowego filmu wygenerowanego przez MSW.',
        poster_path: null,
        release_date: '2024-01-01',
        vote_average: Number((6 + Math.random() * 3).toFixed(1)),
        genre_ids: [28, 12],
      })),
    });
  }),

  http.get('https://rickandmortyapi.com/api/character', () => {
    return HttpResponse.json({
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
        { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
      ],
    });
  }),
];
