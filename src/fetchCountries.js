export default function fetchCountries(searchCountry) {
    return fetch(`https://restcountries.com/v3.1/name/${searchCountry}?fields=flags,name,capital,languages,population`)       
}




// export fetchCountries(name)