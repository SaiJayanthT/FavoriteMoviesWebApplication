const addMovieModal = document.getElementById("add-modal");
const movieButton = document.querySelector("header button");
const addMovieButton = document.getElementById("add-movie-btn");
const cancelMovieButton = addMovieButton.previousElementSibling;
const backdropElement = document.getElementById("backdrop");
const sectionElement = document.getElementById("entry-text");
const userInputTag = addMovieModal.querySelectorAll("input");
const ulElement = sectionElement.nextElementSibling;
const deleteModal = document.getElementById("delete-modal");
const noButton = document.getElementById("no");
const yesButton = document.getElementById("yes")


// User movie list
const userMovieList = []

// Add backdrop
const addBackdropToggleEvent = () => {
    backdropElement.classList.add("visible");
};

//Remove backdrop
const removeBackdropToggleEvent = () => backdropElement.classList.remove("visible");


const toggleAddMovieButtonHandler = () => {
    addMovieModal.classList.toggle("visible");
    addBackdropToggleEvent();
    clearInputValues();

};


const toggleRemoveMovieButtonHandler = () => {
    addMovieModal.classList.toggle("visible");
    removeBackdropToggleEvent();
    clearInputValues();

}



function clearInputValues() {
    for (const inputTag of userInputTag) {
        inputTag.value = ""
    }
}

// Add movie event
const addMovieHandler = () => {
    title = userInputTag[0].value
    imageUrl = userInputTag[1].value
    movieRating = userInputTag[2].value

    if (title.trim() == "" || imageUrl.trim() == "" || movieRating.trim() == "") {
        alert("Please Enter Valid Input")
        return
    } else if (parseInt(movieRating) < 1 || parseInt(movieRating) > 5) {
        alert("Please Enter Rating Between 1 to 5")
        return
    } else {
        const obj = {}
        obj["id"] = Math.random().toString()
        obj["title"] = title
        obj["imageUrl"] = imageUrl
        obj["rating"] = movieRating
        userMovieList.push(obj)
        console.log(userMovieList)
        clearInputValues()
        updateUI()
        addMovieToLiTag(obj)

    }

};


function updateUI() {
    if (userMovieList.length == 0) {
        sectionElement.style.display = "block"
    } else {
        sectionElement.style.display = "none"
    }
}



function deleteMovie(obj, movieData) {
    console.log(obj)
    // console.log(obj.parentNode)

    obj.parentNode.removeChild(obj)
    let movieIndex = userMovieList.findIndex((value) => {
        return value["id"] === movieData["id"]
    })
    userMovieList.splice(movieIndex, 1)
    console.log(userMovieList)
    updateUI()
    deleteModal.classList.remove("visible")
    removeBackdropToggleEvent()
   

}


const movieDeleteHandler = (object, movie) => {
    const yesEventHandler = () => {
        deleteMovie(object, movie)
    }
    const noEventHandler = () => {
        deleteModal.classList.remove("visible")
        removeBackdropToggleEvent()
    }
    yesButton.onclick = yesEventHandler
    noButton.onclick = noEventHandler

}

function addMovieToLiTag(obj) {
    const liTag = document.createElement("li");
    liTag.className = "movie-element";
    liTag.innerHTML = `
    <div class="movie-element__image">
        <img src="${obj["imageUrl"]}" alt="${obj["title"]}">
    </div>
    <div class="movie-element__info">
    <h2>${obj["title"]}</h2>
    <p>${obj["rating"]}/5</p>
    <p>Language</p>
    </div>
    `;
    liTag.addEventListener("click", function () {
        
        movieDeleteHandler(liTag, obj);
        deleteModal.classList.add("visible");
        addBackdropToggleEvent();
    });
    ulElement.appendChild(liTag);


}


movieButton.addEventListener("click", toggleAddMovieButtonHandler);
cancelMovieButton.addEventListener("click", toggleRemoveMovieButtonHandler);
addMovieButton.addEventListener("click", addMovieHandler);
