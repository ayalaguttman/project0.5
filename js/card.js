import cardCountry  from "./cardClass.js";

export const initCard = (id) => {
    console.log(id);
    doApiCard(id);
}

const doApiCard = async (id) => {
    console.log(id);
    document.querySelector("#id_row").innerHTML = " ";

    let url = `https://restcountries.com/v3.1/${id}`;
    console.log(url);
    let resp = await fetch(url);
    let data = await resp.json();
    console.log(data);
    document.querySelector("#inputs").classList.add("d-none");
    document.querySelector("#return").classList.replace("d-none", "d-block");
    hideLoading();
    let card = new cardCountry("#id_row",data[0],initCard);
    card.render();

}

const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
  }

