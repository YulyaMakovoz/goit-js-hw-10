import './sass/index.scss';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', onInputChange);


// Запускает поиск по странам + ошибка если нет такой страны ---ДОБАВИТЬ!!!!
function onInputChange(event) {
    const searchItem = fetchCountries(event.target.value.trim());
    searchItem
        .then((countries) => { onStartSearch(countries); })
        .catch (error => {
        console.log(error);
    });
}
function onStartSearch(countries) {
    if (countries.length > 10) {
        alert("Too many matches found. Please enter a more specific name.");
    } else if (countries.length <= 10 && countries.length > 1) {
        countries.map (country => 
        showList(country.name.common, country.flags.svg))
    } else if (countries.length === 1) {
        showCard(countries[0]);
     }
 }

function showList(name, flag) {
     countryListEl.insertAdjacentHTML('beforeend',`<li class="item"><img src="${flag}" alt="" width="50"> <h2>${name}</h2></li>`)
}
 
function showCard(country) {
    const { name, capital,  population,flags, languages } = country;
    countryInfoEl.insertAdjacentHTML('beforeend', `<div class=""><img src="${flags.svg}" alt="" width="50"><h1>${name.common}</h1></div>
      <ul class="">
      <li>Capital:${capital}</li>
      <li>Population:${population}</li>
      <li>Languages:${Object.values(languages)}</li>
    </ul>`);
}




// fetch(`https://restcountries.com/v3.1/all/`);
