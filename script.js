const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

///New Today
//const API_URL = 'http://localhost:2121/api'
const API_URL = 'https://fdsapias.onrender.com/api'
const SEARCH_API = 'http://localhost:2121/api/:id?'


// Get initial movies
getPosts(API_URL)
//getMovies(SEARCH_API)
async function getPosts(url) {
    const res = await fetch(url)
    const data = await res.json()
    showPosts(data)
}

function showPosts(posts) {
    main.innerHTML = ''

    posts.forEach((posts) => {
        const { title, image, likes, description } = posts

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
        <img src="${image}" alt="${title}">
        <div class="movie-info">
      <h3>${title}</h3>
      <span id="rate">Reviews</span>
      <span class="${getClassByRate(likes)}">${likes}</span>
        </div>
        <div class="overview">
      <h3>Store Descripton</h3>
      ${description}
    </div>
    `
        main.appendChild(movieEl)

        
    })
}

function getClassByRate(likes) {
    if(likes >= 8) {
        return 'green'
    } else if(likes >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getPosts(SEARCH_API)

        search.value = ''
    } else {
        window.location.reload()
    }
})