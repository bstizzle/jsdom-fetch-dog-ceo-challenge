console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", function(){
    loadImgs();
    loadBreeds();
});

function loadImgs() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl).then(resp => resp.json())
        .then(imgs => {
            imgs.message.forEach(url => {
                let container = document.querySelector("#dog-image-container");
                let newImg = document.createElement("img");
                newImg.src = url;
                container.appendChild(newImg);
            })
        });
};

function loadBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl).then(resp => resp.json())
        .then(json => {
            const breeds = Object.keys(json.message);
            const ul = document.querySelector("#dog-breeds");
            
            allBreeds(breeds, ul);

            const dropdown = document.querySelector("#breed-dropdown");

            dropdown.addEventListener('change', function(event){
                allBreeds(breeds, ul);
                ul.querySelectorAll("li").forEach(breed => {
                    let firstLetter = breed.innerText.charAt(0);
                    if(firstLetter !== event.target.value){
                        ul.removeChild(breed);
                    };
                });
            });
        });
};

function allBreeds(breeds, ul) {
    breeds.forEach(breed => {
        let newBreed = document.createElement("li");
        newBreed.innerText = breed;
        ul.appendChild(newBreed);
        newBreed.addEventListener('click', function(){
            newBreed.style.color = "red";
        });
    });
};