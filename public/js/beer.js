const clearBeerButton = document.querySelector("#clear-beers");
const saveBeerButtons = document.querySelectorAll(".btn-save");

document.addEventListener("DOMConententLoaded", event => {
  
  clearBeerButton.addEventListener("click", event => {
    fetch("/",{
      method:'DELETE'
    });
    location.reload();
  });
  
  document.querySelector("#beers").addEventListener("click", event => {
    console.log(event.target);
    if(event.target && event.target.matches(".btn-save")){
      console.log(`clicked ${event.target}`);
    }
  });
  
  // saveBeerButtons.forEach(button => {
  //   button.addEventListener("click", event => {
  //     console.log(`clicked ${event.target}`);
  //   });
  // });
  
});
