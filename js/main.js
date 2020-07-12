

let addUserBtn = document.querySelector("#adduser");
let refreshBtn = document.querySelector("#refreshdb");
let nameValue = document.querySelector("#nameinput");
let ageValue = document.querySelector("#ageinput");
let sexValueMale = document.querySelector("#sexinput_male");
let sexValueFemale = document.querySelector("#sexinput_female");
let tableBody = document.querySelector("#TableBody");
let gender;


sexValueMale.addEventListener("click", (e) => {
    sexValueFemale.checked = false;
    sexValueMale.checked = true;
    gender = "Male";
})
sexValueFemale.addEventListener("click", (e) => {
    sexValueMale.checked = false;
    sexValueFemale.checked = true;
    gender = "Female";
})



for(let i = 0; i < 100; i++) {
    let option = document.createElement("option");
    let value = 0;
    i == 0 ? value = "Select Age" : value = i;
    option.innerHTML = value;
    option.value = value;
    ageValue.appendChild(option);
}

let fetchOptionsGET = {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default"
};


let refreshData = () => {
const fetchData = fetch("https://zoli1228.github.io/db/db.json", fetchOptionsGET).then(
    data => data.json().then(users => {
        for(let row of users) {
            let tr = document.createElement("tr");
            for(let i in row) {
                let td = document.createElement("td");
                td.innerHTML = row[i];
                if(i == "id") {
                    td.setAttribute("style", "font-weight: 700")
                }
                tr.appendChild(td);
            }
            
            tableBody.appendChild(tr);
        }      
        }),
    
    err => {alert(`There was an error. Details: ${err}`)}
    );
    }

    let addUsrBtnClicked = (e) => {
        e.preventDefault();
        try {
            let FetchOptionsPOST = {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: addUserToDB(VAL_NAME(nameValue.value), VAL_AGE(ageValue.value), gender)          
            }

            fetch('https://zoli1228.github.io/db/db.json', FetchOptionsPOST).then(
                resp => console.log(resp),
                err => console.error(err)
            );
        }

        catch (e) {
            console.error("There was an error:", e);
        }
        console.log("User added"); 
    }
    let refreshDbBtnClicked = (e) => {
        e.preventDefault();
        try {
            tableBody.innerHTML = "";
            refreshData();
            console.log("Database Refreshed");
        }
        catch (e) {
            console.error(e);
        }
    }

    function addUserToDB(name, age, sex) {
        let id = tableBody.childElementCount + 1;
        let dataToPost = 
            {'id' : `${id}`, 'name' : `${name}`, 'age' : `${age}`, 'sex' : `${sex}`};
            return JSON.stringify(dataToPost);
    }


    let numValidate = (num) =>
    {
        if(isNaN(num)) {
            alert(`${num} is not a number!`);
            num = "N/A";
            return num;
        }
    }
    addUserBtn.addEventListener("click", addUsrBtnClicked);
    refreshBtn.addEventListener("click", refreshDbBtnClicked);

    const VAL_AGE = (i) => {
        if(isNaN(i) || i > 99 || i < 1) {i = "N/A";} else {
        i = parseInt(i);
        
        }
        return i;
    }

    const VAL_NAME = (i) => {
        if(!i) {i="_EMPTY";}; 
        let pattern = /^([-\w'.\s])*$/;
        if(pattern.test(i)) {return i;} else {
            return "INVALID_NAME";}

    }
