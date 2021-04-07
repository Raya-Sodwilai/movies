import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MovieService from './movie-service.js';

function clearSearch() {
  $('.movieSearch').val("");
  $('.showErrors').text("");
}

$(document).ready(function() {
  $('.movieSearch').click(function() {
    const searchText = $('.search').val();
    const posterBaseUrl = 'https://www.themoviedb.org/t/p/original';
    clearSearch();
    const promise = MovieService.search(searchText);
    promise.then(function(response) {
      const body = JSON.parse(response);
      body.results.forEach(movieObj => { 
        $('.movies-area').prepend(`<div>
          <img class='movie-img' src="${movieObj.backdrop_path ? posterBaseUrl + movieObj.backdrop_path : 'https://applehurst.com/wp-content/plugins/wp-ulike/assets/img/no-thumbnail.png'}" />
          <span>Title: ${movieObj.original_title}</span>
          <span>Overview: ${movieObj.overview}</span>
          <span>Popularity: ${movieObj.popularity}</span>
          </div> 
        `)
      });
    });
  });
});