import {renderGallery} from './render'
const axios = require('axios');
const key = "27028263-30a4c0e676d46eddbf4883679"
const baseUrl = "https://pixabay.com/api/"
export async function getData(value, i, totalHits, gallery, loadMore) {
    try {    
    const response = await axios.get(`${baseUrl}?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${i}`);     
    renderGallery(response,i,totalHits,gallery,loadMore)
    } catch (error) {
    console.error(error);
    }
}   