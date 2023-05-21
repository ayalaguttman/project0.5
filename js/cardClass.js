import { init } from "./app.js";
import { initCard } from "./card.js";

export default class cardCountry {
    constructor(_parent, _item, _initCard) {
        this.parent = _parent;
        this.name = _item.name.official;
        this.cioc = _item.cioc;
        this.img = _item.flags.png;
        this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
        this.realPop = _item.population;
        this.region = _item.region || this.name;
        this.languages = Object.values(_item.languages);
        this.capital = _item.capital;
        this.borders = _item.borders || "none borders exist";
        this.location = _item.latlng;
        this.coins = (Object.keys(_item.currencies)) + "," + Object.values(Object.values(_item.currencies)[0])[0];
    }

    render() {
        if (this.realPop < 1000000) {
            this.pop = `${(Math.floor((this.realPop / 10000) * 10)).toLocaleString()}K`
        }
        if (this.realPop < 100000) {
            this.pop = `${(Math.floor((this.realPop / 100) * 100)).toLocaleString()} pepople`
        }

        let div = document.createElement("div");
        div.className = "container mt-4 text-white"
        div.innerHTML = `
        <div class="row">
         <img src="${this.img}" alt="${this.cioc}" class="col-12 col-lg-6 my-auto" height="280">
         <div class="col-12 col-lg-5 pt-1 ps-3 text-center text-lg-start">
            <h2 class="m-3">${this.name}</h2>
            <table class="table table-striped table-danger col-10">
                <tbody>
                <tr>
                 <th scope="row">population: </th>
                 <td> ${this.pop}</td>
                </tr>
                <tr>
                 <th scope="row">region: </th>
                 <td> ${this.region}</td>
                </tr>  
                <tr>
                 <th scope="row">Languages: </th>
                 <td> ${this.languages}</td>
                </tr>  
                <tr>
                 <th scope="row">Coins: </th>
                 <td> ${this.coins}</td>
                </tr>  
                <tr>
                 <th scope="row">Capital:   </th>
                 <td>${this.capital} </td>
                </tr> 
                </tbody>
            </table>
         </div>  
        </div>
        <div class="pt-3 justify-content-between container-fluid">
          <iframe src="https://maps.google.com/maps?q=${this.location[0]},${this.location[1]}&z=7&output=embed"  height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="w-100 float-end m-2"></iframe>
          <div class="">
             <h4 class="text-center">States with borders:  </h4>
             <p id="border" class="text-center"></p>
          </div>
        </div>
        `

        document.querySelector(this.parent).append(div);
        document.querySelector("#return").addEventListener("click", () => {
            document.querySelector("#id_row").innerHTML = "";
            init();
          })
        let p = document.createElement("p");
        p.className = "text-info ms-3"
        document.querySelector("#border").append(p);
        
        if (this.borders != "none borders exist") {
            this.borders.forEach(item => {
              p.innerHTML += `<span class="p-2" id="${item}">${item}</span>`
              document.querySelector("#border").append(p)
              p.style = " cursor: pointer; text-decoration: underline;"
            });
      
            let borders_ar = this.borders;
            borders_ar.forEach(item => {
              document.querySelector(`#${item}`).addEventListener("click", () => {
                initCard(`alpha/${item}`);
              })
            })
          }else {
            p.innerHTML = `${this.borders}`;
      
          }

    }
}