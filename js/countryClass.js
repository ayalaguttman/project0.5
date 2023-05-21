export default class CountryClass{
    constructor(_parent, _item, _initCard){
        this.parent = _parent;
        this.name = _item.name.common;
        this.flag = _item.flags.png;
        this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
        this.realPop = _item.population;
        this.capital = _item.capital ? _item.capital : "none";
        this.countryCode = _item.ccn3;
        this.languages=_item.languages? Object.values(_item.languages).join():none
        this.borders = _item.borders;
        this.reg = _item.subregion || this.name;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.initCard = _initCard;
        this.region = _item.region || this.name;



    }
    render(){
        if(this.realPop < 1000000){
            this.pop = `${(Math.floor((this.realPop / 10000) * 10)).toLocaleString()}K`
        }else if(this.realPop < 100000){
            this.pop = `${(Math.floor((this.realPop / 100) * 100)).toLocaleString()}`
        }

        let div = document.createElement("div");
        div.className = " col-12 col-md-6 col-lg-4 mt-3"
        div.innerHTML = `
            <div class="m-2 box col-11 border border-2 shadow text-dark text-center">
            <img src="${this.flag}" alt="${this.name}" class="my-2 mx-auto col-11" height="200" width="170" >
            <h2>${this.name}</h2>
            <div class="information">
            <p>population: ${this.pop}</p>
            <p class="mb-2">capital: ${this.capital}</p>

            <p class="mb-2">region: ${this.region}</p>
            </div>
            <h4 class=" badge p-3 col-12 text-black">Press for more info</h4>
            </div>
        `
        document.querySelector(`${this.parent}`).append(div);
        div.addEventListener("click", () => {
            this.initCard(`name/${this.name}`);
        })

    }
}