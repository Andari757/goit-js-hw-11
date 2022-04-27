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
let i = 1;
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getData(value) {    
  try {
    
    
    console.log(i)
    const response = await axios.get(`${baseUrl}?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${i}`);
    i = i+1
    renderGallery(response)
  } catch (error) {
    console.error(error);
    
  }   
}
form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (!form.searchQuery.value.trim()) {
    Notiflix.Notify.info("type something")
    return
  }
    getData(form.searchQuery.value)
})
function renderGallery(r) {  
  if (!r.data.total) {
    Notiflix.Notify.failure(failureText)
    return
  }
  gallery.innerHTML=""
  const markup = r.data.hits.map((e) => `<a class="item" href = "${e.largeImageURL}">
  <img height="300px" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <br>
      ${e.likes}  
    </p>
    <p class="info-item">
      <b>Views</b>
      <br>
      ${e.views}  
    </p>
    <p class="info-item">
      <b>Comments</b>
      <br>
      ${e.comments} 
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <br>
      ${e.downloads}  
    </p>
  </div>
</a>`).join("")
  gallery.insertAdjacentHTML("beforeend", markup)
  
  let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250});
  lightbox.refresh()
  let infScroll = new InfiniteScroll( gallery, {
  // options
  path: function() {
      let pageNumber = (this.loadCount + 1);      
  return `/gallery/page${pageNumber}`;
}
});

}