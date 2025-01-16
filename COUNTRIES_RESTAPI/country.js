const countryName = new URLSearchParams(location.search).get("name");
const backBtn = document.getElementsByClassName('back-btn');
const themeChanger = document.querySelector('.theme-changer');
const themeChangerName = document.querySelector(".theme-changer").innerHTML;

async function FetchDataCountry() {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
    const data = await response.json();
    // console.log(data);
    const countryDetails =
      document.getElementsByClassName("country-details")[0];
    if (countryDetails) {
      countryDetails.innerHTML = `
      <a href ="${data[0].maps.googleMaps}"><img style="border: 0.5px solid #ddd" class="img-fluid" src=${data[0].flags.svg} alt=${data[0].name.common}></a>
      
        <div class="details-text-container">
          <h1>${data[0].name.common}</h1>
          <div class="details-text">
            <p><b>Native Name: </b>${
              // if nativename exists then
              data[0].name.nativeName
                ? Object.values(data[0].name.nativeName)[0].common
                : data[0].name.common
            }</p>
            <p><b>Population: </b>${data[0].population.toLocaleString('en-IN')}</p>
            <p><b>Region: </b>${data[0].region ? data[0].region : "N/A"}</p>
            <p><b>Sub Region: </b>${data[0].subregion ? data[0].subregion : "N/A"}</p>
            <p><b>Capital: </b>${data[0].capital ? data[0].capital.join(' , ') : "N/A"}</p>
            <p><b>Top Level Domain: </b>${data[0].tld ? data[0].tld.join(', ') : "N/A"}</p>
            <p><b>Currencies: </b>${data[0].currencies ? Object.values(data[0].currencies)[0].name : "N/A"}</p>
            <p><b>Languages: </b>${data[0].languages ? Object.values(data[0].languages).join(' , '): "N/A"}</p>
          </div>
          <div class="border-countries">`
           
          const borderCountriesContainer = document.getElementsByClassName("border-countries")[0];
        if (data[0].borders) {
          borderCountriesContainer.innerHTML = `<p><b>Border Countries: </b></p>`
          data[0].borders.forEach(borderCountry => {
            async function fetchBorderCountries() {
              const response = await fetch(
                `https://restcountries.com/v3.1/alpha/${borderCountry}`
              );
              const  data2 = await response.json();
              borderCountriesContainer.innerHTML += `
              &nbsp;&nbsp;<a href="./country.html?name=${data2[0].name.common}">${data2[0].name.common}</a>`
            }
            fetchBorderCountries();
          });
        }
            `
          </div>
        </div>`;
    }
  } catch (error) {
    console.error("Error fetching country data:", error);
  }
}

FetchDataCountry();


//theme changer
themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  
  if (document.body.classList.contains("dark")) {
    themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp; <b>Light Mode</b>';
  } else {
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp; <b>Dark Mode</b>';
  }
});