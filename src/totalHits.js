import Notiflix from 'notiflix';
let totalHits = 0;
export function totalHitsNotify(r,i,loadMore) {
    totalHits = totalHits + 40;    
    if (document.querySelector(".item")) {
        loadMore.style.display = "block"
    }
    if (r.data.totalHits - totalHits < 1) {        
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results")
        loadMore.style.display = "none" 
    }
    if (r.data.totalHits&&i===1) {
        Notiflix.Notify.info(`Hooray! We found ${r.data.totalHits} images.`)
    }  
}
export function nullify() {
    totalHits = 0
}