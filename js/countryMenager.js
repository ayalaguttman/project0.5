import CountryClass from "./countryClass.js";
import { initCard } from "./card.js";
import { init } from "./app.js";

let openPage_ar = ["israel", "united states", "thailand", "france"];
let arr = [];

export const createCountryList = (countriesArr) => {
    document.querySelector("#return").classList.add("d-none");
    document.querySelector("#inputs").classList.remove("d-none");
    document.querySelector("#id_message").classList.add("d-none");
    document.querySelector("#id_row").innerHTML = " ";
    hideLoading();
    arr = countriesArr;
    console.log( arr);
    openPage_ar = arr.filter(item => openPage_ar.includes(item.name.common.toLowerCase()))
    console.log(openPage_ar);
    if (openPage_ar.length > 0) {
        arr = openPage_ar;
        openPage_ar.forEach(item => {
            let card = new CountryClass("#id_row", item, initCard);
            console.log(item);
            card.render();
            openPage_ar = [];
        });
    } else {
        countriesArr.forEach(item => {
            let card = new CountryClass("#id_row", item, initCard);
            card.render();
        })
    }
}



export const declareAllEvent = (doApi) => {
    let search = document.querySelector("#id_search");
    let searchBtn = document.querySelector("#searchBtn");
    let sort = document.querySelector("#sort_id");
    let selectList = document.querySelector("#id_select");
    let messageBtn = document.querySelector("#closeBtn");
    let message = document.querySelector("#id_message");

    searchBtn.addEventListener("click", () => {
        doApi(`name/${search.value}`);
    })
    search.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            doApi(`name/${search.value}`)
        }
    })
    messageBtn.addEventListener("click", () => {
        createCountryList(arr);
    })
    sort.addEventListener("change", () => {
        let sortVal = document.querySelector("#sort_id").value
        arr = _.sortBy(arr, sortVal);
        createCountryList(arr);
    })
    selectList.addEventListener("change", () => {
        let selectVal = document.querySelector("#id_select").value;
        initCard(`alpha/${selectVal}`);
    })

    document.querySelector("#all").addEventListener("click", () => {
        init();
    })
    document.querySelector("#israel").addEventListener("click", () => {
        initCard("alpha/376");
    })
    document.querySelector("#usa").addEventListener("click", () => {
        initCard("alpha/840");
    })
    document.querySelector("#thailand").addEventListener("click", () => {
        initCard("alpha/764");
    })
    document.querySelector("#france").addEventListener("click", () => {
        initCard("alpha/250");
    })

}

export const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex"
}