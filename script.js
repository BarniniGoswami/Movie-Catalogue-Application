let apiurl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const imagPath='https://image.tmdb.org/t/p/w1280';
const searchURL="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');

//initially getting top movies on the page
getMovies(apiurl);
async function getMovies(url){
    console.log('hello');
    const response=await fetch(url);
    const responseData=await response.json();
    console.log(responseData);
    
    showMovies(responseData.results);
} 

function showMovies(movies){
    //clear main
    main.innerHTML='';

    movies.forEach(movie =>{
        if(movie.poster_path){
            const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=` 
        <img src="${imagPath+movie.poster_path}" alt="${movie.title}" > 
               <div class="movie-info">
                  <h3>
                   ${movie.title}
                   </h3>
                   <span class="${getClassByRate(movie.vote_average)} "> ${movie.vote_average} </span>
               </div>
                <div class="overview">
                  <h4>Overview:</h4>
                  ${movie.overview}
                  </div>`;
        
         main.appendChild(movieEl);
        }
        
    });
}

function getClassByRate(vote){
    if(vote>=8){
        return 'green';
    }
    else if(vote>=5)
        {
            return 'orange';
        }
    else{
        return 'red';
    }
}

form.addEventListener('submit',function(event){
//    we donot want to submit the form and perfom the expected thus done this
    event.preventDefault();
    
    const searchTerm=search.value;
    console.log(searchTerm);
    
    if(searchTerm){
        getMovies(searchURL+searchTerm);
        search.value='';
    }
    
    
})