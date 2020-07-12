let homeBtn = document.querySelector("#homeBtn");
let dbBtn = document.querySelector("#dbBtn");

homeBtn.addEventListener("click", () => {
    homeBtn.setAttribute("class","nav-link active");
    dbBtn.setAttribute("class", "nav-link");
    window.location.href="../index.html"
})

dbBtn.addEventListener("click", () => {
    dbBtn.setAttribute("class","nav-link active");
    homeBtn.setAttribute("class","nav-link");
    window.location.href="../database.html"
    
})