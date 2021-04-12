export default class MovieService {  
  static async search(searchText) {
    let allData = [];
    let morePagesAvailable = true;
    let currentPage = 0;

    while (morePagesAvailable) {
      currentPage++;
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${searchText}&page=${currentPage}`);
        if (!response.ok) {
          throw Error(response.statusText)
        }
  
        let { results, total_pages } = await response.json();

        results.forEach(movie => allData.push(movie));
        morePagesAvailable = currentPage < total_pages;
      } catch (error) {
        return error.message;
      }
    }

    return allData.sort((a, b) => {
      if ((!a.release_date || !b.release_date) || a.release_date < b.release_date) {
        return -1;
      }
      if (a.release_date > b.release_date) {
        return 1;
      }

      return 0;
    });
  }

  static async getMovie(movieId) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`);
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json();
    } catch (error) {
      return error.message;
    } 
  }

  static async getTrailer(movieId) {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.API_KEY}&language=en-US`);
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}