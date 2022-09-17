import data from "./data/data.json" assert {type: "json"}
let data_postal = []
const data_prov = []
const provinsi = document.querySelector("#prov")

const select = document.querySelector("#prov")
const select_kab = document.querySelector("#kab")
const kab = document.querySelector("#kab")

document.addEventListener('DOMContentLoaded', function () {
    addprov()
    setKab()
    result()
    form()
});

function setKab() {
    provinsi.addEventListener("change", function () {
        const id = provinsi.value
        const postal = data.postal[id]
        select_kab.innerText = ''
        data_prov.push(postal)
        const city = [...new Set(postal.map((data) => {
            return data.city;
        }))]

        city.map((data) => {
            makeOptionKab(data)
        })
    })
}

function addprov() {
    const prov = Object.entries(data.province)
    prov.map((data) => {
        makeOption(data[1])
    })
}

function makeOption(provinsi) {
    const option = document.createElement('option')
    option.innerText = provinsi.province_name;
    option.setAttribute('value', provinsi.province_code)
    // console.log(option);
    select.append(option)
    return select
}

function makeOptionKab(kabupaten) {
    const option = document.createElement('option')
    // console.log(kabupaten);
    option.innerText = kabupaten;
    option.setAttribute('value', kabupaten)
    // console.log(option);
    select_kab.append(option)
    return select
}

function result() {

    kab.addEventListener("change", function () {

        // console.log(data_prov);
        const value = kab.value;
        const result = data_prov[0].filter((data) => {
            if ( value  == data.city) return data
        })
        result.map((data) => {
            data_postal.push(data)
        })
        
        data_postal.map((data)=>{
            makeResult(data)
        })
    })


}

function makeResult(data) {
    const container = document.querySelector(".result");
    const div = document.createElement("div")
    const title = document.createElement("h3")
    const p = document.createElement("p")
    title.innerText = `Daerah : ${data.urban}`
    // console.log(title);
    p.innerText = `kode pos: ${data.postal_code}`
    // console.log(p);
    div.classList.add("card")
    div.append(title, p)
    // console.log(div);
    container.append(div)
    return container
}

function form(){
    const cariForm = document.getElementById("form")
    cariForm.addEventListener("submit",function(e){
        e.preventDefault()
        const title = document.getElementsByTagName("p");
        const cari = document.querySelector("#cari")    
        const filter = document.getElementsByClassName("card");
        const value = cari.value;
        // console.log(value);
        for (let i = 0, list; list = title[i]; i++) {
            // console.log(list[i]);
            let text = list.innerHTML;
            if (text.indexOf(value) > -1) {
                filter[i].style.display = "";
            } else if (value.length == 0) {
                // document.dispatchEvent(new Event(RENDER_EVENT));
                console.log("hai");
            } else
                filter[i].style.display = "none";
        }

    })
    
}
