const clearBeerButton = document.querySelector("#clear-beers");
const saveBeerButtons = document.querySelectorAll(".btn-save");
const beersDiv = document.querySelector("#beers");
const modals = document.querySelectorAll('.modal');
let noteModalElement;
let noteModalInstance;

document.addEventListener("DOMContentLoaded", event => {

  // const modalInstances = M.Modal.init(elems);

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

    // click event to open modal
    if(event.target && event.target.matches(".btn-notes")){
      const id = event.target.dataset.id;
      console.log(`clicked ${id}`);
      noteModalElement = document.querySelector(`#modal${id}`);
      noteModalInstance = M.Modal.init(noteModalElement);
      noteModalInstance.open();
    }

  });
  
  
});
