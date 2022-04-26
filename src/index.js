import './css/styles.css';
const gallery = document.querySelector(".gallery")
const axios = require('axios');
const key = "27028263-30a4c0e676d46eddbf4883679"
const form = document.querySelector("#search-form")
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getData(value) {    
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`);
      console.log(response)
      renderGallery(response)
  } catch (error) {
    console.error(error);
  }   
}
form.addEventListener("submit", (e) => {
    e.preventDefault()
    getData(form.searchQuery.value)
})
function renderGallery(r) {
    console.log(r.data.hits)
    r.data.hits.forEach(e => {
        gallery.insertAdjacentHTML("afterbegin", `<a href="${e.data.hits[0].largeImageURL}"><img src="${e.data.hits[0].largeImageURL}" alt="" title=""/></a>`)
    });
    
}