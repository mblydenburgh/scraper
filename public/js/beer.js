const clearBeerButton = document.querySelector("#clear-beers");
const saveBeerButtons = document.querySelectorAll(".btn-save");
const beersDiv = document.querySelector("#beers");

document.addEventListener("DOMContentLoaded", event => {

  clearBeerButton.addEventListener("click", async event => {
    console.log(`clicked`);
    await fetch("/",{
      method:'DELETE'
    });

    window.location.assign("/");
  });
  
  // Content dynamically generated, delete click listeners 
  beersDiv.addEventListener("click", async event => {

    if(event.target && event.target.matches(".btn-save")){
      console.log(`clicked button ${event.target.id}`);
      const id = event.target.id;
      await fetch(`/${id}`,{
        method:"PUT"
      });

      window.location.assign("/");
    }

  });
  
  
});
