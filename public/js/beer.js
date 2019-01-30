const clearBeerButton = document.querySelector("#clear-beers");

clearBeerButton.addEventListener("click", event => {
  fetch("/",{
    method:'DELETE'
  });
  location.reload();
})