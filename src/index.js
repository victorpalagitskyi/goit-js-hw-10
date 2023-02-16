import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.getElementById("search-box")
const countryInfo = document.querySelector(".country-info")
const countryList = document.querySelector(".country-list")
let searchCountry = ''

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    searchCountry = e.target.value.trim();

    if (searchCountry) {
        fetchCountries(searchCountry)
        .then(response => {
            if (!response.ok && searchCountry !== '') {
                Notiflix.Notify.failure('Oops, there is no country with that name')
            }
            return response.json();
        })        
        .then((country) => {  
            if (country.length > 10) {  
                Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');  
            }
            if (country.length > 1 && country.length <=10) {
                const markup = createMarkupCountryList(country)
                return updateListMarkup(markup);
                
            }
            if (country.length === 1) {
                resetCountryList();
                const markup = createMarkupCountryData(country) 
                return updateCountryMarkup(markup)
            }           
        })
            .catch(error => {
                Error
            })
    }
};

function updateCountryMarkup(markup) {
     countryInfo.innerHTML = markup;
};
function updateListMarkup(markup) {
    countryList.innerHTML = markup;
}
function resetCountryList() {
    countryList.innerHTML = "";
}



function createMarkupCountryData(country) {   
    return country.map(country => 
        `
    <span>
        <img src="${country.flags.svg}" width="30px" height="30px">
        </span> ${country.name.official}
    <p> Capital: ${country.capital}</p>
    <p> Population: ${country.population}</p>
    <p> Languages: ${Object.values(country.languages).join(",")}</p>
    `).join("");
};

 function createMarkupCountryList(country) {
    return country.map(country => 
        `
    <li>
        <span>
        <img src="${country.flags.svg}" width="30px" height="30px">
        </span> ${country.name.official}
    </li>
        `).join("");
};