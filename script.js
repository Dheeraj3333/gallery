class Animal {
  constructor(name, gender, image) {
    this.name = name;
    this.gender = gender;
    this.image = image;
  }

  setImage(src) {
    this.image = src;
  }
}

let animalCount = 0;
let animal;
let animalCollection = [];

// Add a new animal
const addBtn = document.querySelector(".add-new");
addBtn.addEventListener("click", function (event) {
  event.preventDefault();
  showForm();
});

const submitAnimalInfoBtn = document.querySelector("input[type='Submit']");
submitAnimalInfoBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let animalName = document.querySelector("input[name='name']").value;
  let animalGender = document.querySelectorAll("input[name='gender']")[0]
    .checked
    ? document.querySelectorAll("input[name='gender']")[0].value
    : document.querySelectorAll("input[name='gender']")[1].value;
  let animalImage = document.querySelector("input[name='image']").files[0];

  if (
    animalName.trim() === "" ||
    animalGender === undefined ||
    animalImage === undefined
  ) {
    alert("Please fill out all fields in the form.");
  } else {
    const reader = new FileReader();
    reader.onload = function (e) {
      console.log(e.target);
      // console.log(e.target.result);

      animal = new Animal(animalName, animalGender, e.target.result); // Use Base64 string
      animalCollection.push(animal);
      localStorage.setItem("allAnimals", JSON.stringify(animalCollection));

      createAnimalCard(animal, animalCount);
      animalCount++;

      hideForm();
    };
    reader.readAsDataURL(animalImage); // Convert image to Base64
  }
});

// Show form
function showForm() {
  document.querySelector("form").setAttribute("style", "display:flex");
}

// Hide form and reset
function hideForm() {
  document.querySelector("form").setAttribute("style", "display:none");
  document.querySelector("form").reset();
}

// Create animal card
function createAnimalCard(animal, number) {
  // Main card
  const animalCard = document.createElement("div");
  animalCard.classList.add("animal-card");

  // Image tag
  const animalImage = document.createElement("img");
  animalImage.classList.add("animal-image");
  animalImage.setAttribute("src", animal.image); // Use Base64 image
  animalCard.appendChild(animalImage);

  // h2 tag
  const animalName = document.createElement("h2");
  animalName.classList.add("animal-name");
  animalName.innerText = animal.name;
  animalCard.appendChild(animalName);

  document.querySelector("main").prepend(animalCard);
}

// Cancel form
document.querySelector(".cancel").addEventListener("click", () => {
  hideForm();
});

// On page load, load stored animals
window.onload = function () {
  if (localStorage.getItem("allAnimals")) {
    animalCollection = JSON.parse(localStorage.getItem("allAnimals"));
    animalCollection.forEach((animal, idx) => {
      createAnimalCard(animal, idx);
    });
  }
};
