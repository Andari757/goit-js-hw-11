export function smoothScroll(i){
if (i >= 2) {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
    })
    }
}
