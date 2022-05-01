import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import Notiflix from 'notiflix';
import { smoothScroll } from './scroll';
const failureText = "Sorry, there are no images matching your search query. Please try again"
const gallery = document.querySelector(".gallery")
const axios = require('axios');
const key = "27028263-30a4c0e676d46eddbf4883679"
const baseUrl = "https://pixabay.com/api/"
const form = document.querySelector("#search-form")
const loadMore = document.querySelector('.load-more')

let i = "";
let value = "";
let totalHits = 0;
loadMore.style.display = "none"
let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
async function getData(value) {
  try {    
    const response = await axios.get(`${baseUrl}?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${i}`);     
    if (response.data.totalHits&&i===1) {
      Notiflix.Notify.info(`Hooray! We found ${response.data.totalHits} images.`)
    }
    renderGallery(response)
  } catch (error) {
    console.error(error);
  }
}   
loadMore.addEventListener("click", (e) => {
  i = i + 1
  getData(value)  
})
form.addEventListener("submit", (e) => {
  value = form.searchQuery.value.trim()
  loadMore.style.display = "none" 
  i = 1;
  totalHits = 0;
  e.preventDefault()
  gallery.innerHTML=""
  if (!value) {
    Notiflix.Notify.info("type something")
    return
  }  
  getData(value)
})
function renderGallery(r) {
  if (!r.data.total) {
    Notiflix.Notify.failure(failureText)
    return
  }
  const markup = r.data.hits.map((e) => `<a class="item" href = "${e.largeImageURL}"><img height="300px" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" /><div class="info"><p class="info-item"><b>Likes</b><br>${e.likes}</p><p class="info-item"><b>Views</b><br>${e.views}</p><p class="info-item"><b>Comments</b><br>${e.comments}</p><p class="info-item"><b>Downloads</b><br>${e.downloads}</p></div></a>`).join("")
  gallery.insertAdjacentHTML("beforeend", markup)  
  lightbox.refresh()
  if (document.querySelector(".item")) {
    loadMore.style.display = "block"
  }
  totalHits = totalHits + 40;
  if (r.data.totalHits - totalHits < 1) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results")
    loadMore.style.display = "none" 
  }
  smoothScroll()
}
