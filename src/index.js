import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import Notiflix from 'notiflix';
import InfiniteScroll from "infinite-scroll"
const failureText = "Sorry, there are no images matching your search query. Please try again"
const gallery = document.querySelector(".gallery")
const axios = require('axios');
const key = "27028263-30a4c0e676d46eddbf4883679"
const form = document.querySelector("#search-form")
const baseUrl = "https://pixabay.com/api/"
const loadMore = document.querySelector('.load-more')
let i = 1;
async function getData(value) {    
  try {  
    console.log(i)    
    const response = await axios.get(`${baseUrl}?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${i}`);
    renderGallery(response)
    i = i + 1
  } catch (error) {
    console.error(error);
    }   
}
let value = "";
loadMore.addEventListener("click", (e) => {
  getData(value)
  // loadMore.style.display = "none";
})
form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (!form.searchQuery.value.trim()) {
    Notiflix.Notify.info("type something")
    return
  }
  value=form.searchQuery.value
    getData(form.searchQuery.value)
})
function renderGallery(r) {   
  if (!r.data.total) {
    Notiflix.Notify.failure(failureText)
    return
  }
  gallery.innerHTML=""
  const markup = r.data.hits.map((e) => `<a class="item" href = "${e.largeImageURL}"><img height="300px" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" /><div class="info"><p class="info-item"><b>Likes</b><br>${e.likes}</p><p class="info-item"><b>Views</b><br>${e.views}</p><p class="info-item"><b>Comments</b><br>${e.comments}</p><p class="info-item"><b>Downloads</b><br>${e.downloads}</p></div></a>`).join("")
  gallery.insertAdjacentHTML("beforeend", markup)  
  let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250});
  lightbox.refresh()  
}
