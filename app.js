let searchInput = document.getElementById("searchInput");
let obj = [];
let spinner = document.getElementById("spinner");
let searchResults = document.getElementById("searchResults");
let errorMsg = document.getElementById("errorMsg")
let searchResultsHeading = document.getElementById("searchResultsHeading")


function createAndAppend(result) {
    let div1 = document.createElement("div1");
    div1.classList.add("country-card", "col-12", "col-sm-6", "col-md-4", "mr-auto", "ml-auto", "d-flex", "flex-row", "justify-content-center", "col-lg-3");
    searchResults.appendChild(div1);
    let div = document.createElement("div");
    div.classList.add("m-3", "cardimg");
    div1.appendChild(div);
    let img = document.createElement("img");
    img.src = result.imageLink;
    div.appendChild(img);
    let p = document.createElement("p");
    p.classList.add("mt-3")
    p.style.fontWeight = "bold";
    p.style.fontSize = "1.5rem"
    p.innerHTML = result.author;
    div.appendChild(p);

}

function displaylist(obj) {

    spinner.classList.add("d-none");
    for (let result of obj) {
        let name = result.title;
        if (name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            createAndAppend(result)
        }
    }
}

function validateUrl() {

    let url = "https://apis.ccbp.in/book-store?title=" + searchInput.value;
    spinner.classList.remove("d-none")

    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            // if(searchInput.value === jsonData.title)
            obj = jsonData.search_results;
            let h1 = document.createElement("h1");
            if (obj.length !== 0) {
                h1.textContent = "Popular Books";
                searchResults.appendChild(h1);
                displaylist(obj);
                h1.classList.add("m-3", "col-12");

            } else {
                h1.textContent = "No Record Found";
                h1.classList.add("text-center");
                searchResults.appendChild(h1);
                h1.classList.add("m-3", "col-12");
                spinner.classList.add("d-none");
            }

        })


}


function searchBook(event) {
    if (event.key === "Enter") {
        validateUrl();
        searchResults.textContent = "";
    }
}
validateUrl()
searchInput.addEventListener("keydown", searchBook)