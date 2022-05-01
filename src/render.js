const failureText = "Sorry, there are no images matching your search query. Please try again"
import { totalHitsNotify } from './totalHits.js';
import Notiflix from 'notiflix';
import { smoothScroll } from './scroll.js';
import SimpleLightbox from "simplelightbox";
let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

export function renderGallery(r, i,  gallery,loadMore) {
  if (!r.data.total) {
    Notiflix.Notify.failure(failureText)
    return
  } 

  renderHtml(r,gallery)

  lightbox.refresh()

  
  totalHitsNotify(r,i,loadMore)
  smoothScroll(i)
}
function renderHtml(r, gallery) {
  const markup = r.data.hits.map((e) => `<a class="item" href = "${e.largeImageURL}"><img height="300px" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" /><div class="info"><p class="info-item"><b>Likes</b><br>${e.likes}</p><p class="info-item"><b>Views</b><br>${e.views}</p><p class="info-item"><b>Comments</b><br>${e.comments}</p><p class="info-item"><b>Downloads</b><br>${e.downloads}</p></div></a>`).join("")
  gallery.insertAdjacentHTML("beforeend", markup)
}