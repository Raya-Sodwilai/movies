import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MovieService from './movie-service.js';
const posterBaseUrl = 'https://www.themoviedb.org/t/p/original';

function clearSearch() {
  $('.movieSearch').val("");
  $('.showErrors').text("");
}

function processSearchResponse(response) {
  if (response) {
    response.forEach(movieObj => { 
      $('.movies-area').prepend(`
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-1">
              <img class='movie-img' src="${movieObj.poster_path ? posterBaseUrl + movieObj.poster_path : 'https://applehurst.com/wp-content/plugins/wp-ulike/assets/img/no-thumbnail.png'}" alt="...">
            </div>
            <div class="col-md-11">
              <div class="card-body">
                <h5 class="card-title">${movieObj.original_title}</h5>
                <button class='movie-expand' id=${movieObj.id}>View</button>
                <p class="card-text"><small class="text-muted">${movieObj.release_date}</small></p>
                <p class="card-text">${movieObj.overview}</p>
              </div>
            </div>
          </div>
        </div>
      `)
    });
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

function processMovieResponse(response) {
  if (response) {
    $('.movie-wrapper').html(`
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img class='movie-wrapper-img' src="${response.poster_path ? posterBaseUrl + response.poster_path : 'https://applehurst.com/wp-content/plugins/wp-ulike/assets/img/no-thumbnail.png'}" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${response.original_title}</h5>
          <p class="card-text"><small class="text-muted">${response.release_date}</small></p>
          <p class="card-overview-text">${response.overview}</p>
        </div>
      </div>
    </div>
  </div>
    `)
  }
}

async function searchMovie(searchText) {
  const response = await MovieService.search(searchText);
  processSearchResponse(response);
}

async function getMovie(movieId) {
  const response = await MovieService.getMovie(movieId);
  processMovieResponse(response);
}

$(document).ready(function() {
  $('.movieSearch').click(function() {
    let searchText = $('.search').val();
    clearSearch();
    searchMovie(searchText);

    event.preventDefault();
  });

  $(document).on('click', '.movie-expand', function() {
    $('.movies-area').hide();
    let movieId = parseInt(event.target.id);    
    
    getMovie(movieId);
  });
});