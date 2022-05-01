import './css/styles.css';
import { getData } from './getData';
import "simplelightbox/dist/simple-lightbox.min.css"
import { nullify } from './totalHits';


const gallery = document.querySelector(".gallery")
const form = document.querySelector("#search-form")
const loadMore = document.querySelector('.load-more')


let i = "";
let value = "";
loadMore.style.display = "none"


loadMore.addEventListener("click", () => {
  i = i + 1
  getData(value,i,gallery,loadMore)  
})


form.addEventListener("submit", (e) => {
  value = form.searchQuery.value.trim()
  loadMore.style.display = "none" 
  i = 1;
  nullify()
  e.preventDefault()
  gallery.innerHTML=""
  if (!value) {
    Notiflix.Notify.info("type something")
    return
  }  
  getData(value,i,gallery,loadMore)
})
