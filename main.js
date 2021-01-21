
let openModalButtons = document.querySelectorAll('[data-modal-target]')

document.forms["movie"].addEventListener("submit", function (e){
  e.preventDefault();
  console.log(this["movieTitle"].value)

  var inputs = this["movieTitle"].value;

  console.log(inputs)
  const url = `http://www.omdbapi.com/?apikey=7054d985&`+`s=${inputs}`

  console.log(url)
  document.querySelector("#movieCard").innerHTML = ""
    fetch(url).then((response) => response.json().then((data) => {
    

      for (i=0; i< 10; i++) {
      let element = data.Search[i] 
        console.log(element)
        let title  = element.Title
        let date = element.Year
        let image = element.Poster

        
        document.querySelector("#movieCard").innerHTML += ` 
        
        <div  data-aos="fade-down" data-aos-easing="linear" data-aos-duration="15000" class="card" id ="movieCard" style="width: 18rem;">
        <div class="card-body">
        <img class="card-img-top" src=${image} alt="Card image cap">
        <p id ="title"> Titre : ${title} </p><br>
        <p class="card-text" id = "date"> Date : ${date}</p>
        <button data-modal-target = "#modal"> Voir plus </button>
        </div>
        </div>
        `;

        document.querySelector("#modal").innerHTML = `<img class="card-img-top" src=${image} alt="Card image cap"><h1 id ="titleModal"> Titre : ${title} </h1><br><p class="card-text" id = "date"> Date : ${date}</p>`


      }


        openModalButtons = document.querySelectorAll('[data-modal-target]')
        test()

    }))

});



let options = {
  root: null, // relative to document viewport 
  rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
  threshold: 1.0 // visible amount of item shown in relation to root
};
 
let observer = new IntersectionObserver(onChange, options);

function onChange(changes, observer) {
  changes.forEach(change => {
      if (change.intersectionRatio > 0) {
          // your observer logic
      }
  });
}

let card = document.querySelectorAll('card');
card.forEach(img => observer.observe(img));




const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

function test () {
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    console.log(button)
    openModal(modal)

  })
})
}

overlay.addEventListener("click",() => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)

  })
})

function openModal(modal){
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
  console.log("ouvert")
}

function closeModal(modal){
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}
