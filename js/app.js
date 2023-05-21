import { createCountryList , declareAllEvent ,hideLoading,} from "./countryMenager.js";

export const init = (s) => {
    doApi();
    declareAllEvent(doApi, createCountryList)
}

const doApi = async (search = 'all') => {
    showLoading();
    let url = `https://restcountries.com/v3.1/${search}`;
    let resp = await fetch(url);
    let data = await resp.json();
    data=data.filter(item=>item.name.common!="palastine")
    console.log(data);
    console.log(resp.status);
    if(data.status != 404){
        console.log(data);
        createAllSelects(data);
        createCountryList(data);
    }else{
        hideLoading();
        document.querySelector("#id_row").innerHTML = " "
        document.querySelector("#id_message").classList.remove("d-none");
    }

}

const showLoading = () =>{
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}

export const createAllSelects = (countriesArr) => {
    console.log(countriesArr);
    let select = document.querySelector("#id_select");
    let sortedArr = _.sortBy(countriesArr,"name.common");
    console.log(sortedArr);
    sortedArr.forEach(item => {
        select.innerHTML += `<option value="${item.cca3}">${item.name.common}</option>`;
    });
    document.querySelector(".pre-Footer").classList.remove("d-none")
}

init();