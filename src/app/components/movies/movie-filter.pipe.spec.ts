import { MovieFilterPipe } from './movie-filter.pipe';
import { Movie } from '../../DataModel/Movie';

describe('MovieFilterPipe', () => {
  let pipe: MovieFilterPipe;

  const dummyMovies: Movie[] = [
    { id: 1, title: 'Movie 1', duration: 120,
      author: { id: 1, name: 'Author 1', surname: 'Surname', age: 20 }, ageRestriction: 18,
      category: { id: 1, name: 'Category 1', description: 'desc' }, description: 'Description 1',
      poster: 'url'
    },
    { id: 2, title: 'Movie 2', duration: 118, poster: 'url', category: { id: 1, name: 'Category 1', description: 'desc' },
      ageRestriction: 12, author: { id: 1, name: 'Author 2', surname: 'Surname', age: 20 }, description: 'Description 2',
    },
  ];

  beforeEach(() => {
    pipe = new MovieFilterPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if items is null', () => {
    const searchText = 'search';

    const result = pipe.transform(dummyMovies, searchText);

    expect(result).toEqual([]);
  });

  it('should return items if searchText is empty', () => {
    const searchText = '';

    const result = pipe.transform(dummyMovies, searchText);

    expect(result).toEqual(dummyMovies);
  });

  it('should return filtered items based on searchText', () => {
    const searchText = 'Movie 1';

    const result: Movie[] = pipe.transform(dummyMovies, searchText);

    expect(result).toEqual([dummyMovies[0]]);
  });

  it('should perform case-insensitive search', () => {
    const searchText = 'movie 2';

    const result = pipe.transform(dummyMovies, searchText);

    expect(result).toEqual([dummyMovies[1]]);
  });


});
