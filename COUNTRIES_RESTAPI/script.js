const filterByRegion = document.querySelector(".filterByRegion");
const clearFilter = document.querySelector(".clearFilter");
const searchInput = document.querySelector(".search-container input");
const themeChanger = document.querySelector(".theme-changer");
const themeChangerName = document.querySelector(".theme-changer").innerHTML;
let allCountriesData;

// Fetch data
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    allCountriesData = data;
    renderCards(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render cards
function renderCards(countries) {
  const cardContainer = document.getElementsByClassName(
    "countries-container"
  )[0];
  cardContainer.innerHTML = ""; // Clear existing content

  countries.forEach((country) => {
    const cardHTML = `
      <a href="./country.html?name=${
        country.name.common
      }" class="country-card card" style="">
        <img
          src="${country.flags.svg}"
          class="card-img-top"
          alt="${country.name.common} flag"
        />
        <div class="card-body">
          <div class="headerAndLogo" style="display: flex;align-items: center; justify-content: space-between;">
            <h4 class="card-title"><b>${country.name.common}</b></h4>
            ${
              country.coatOfArms.svg
                ? `<img
              style="width: 20%; object-fit: cover;"
              src="${country.coatOfArms.svg}"
              class="img-fluid"
              alt="${country.name.common} coat of arms"
            />`
                : ""
            }
          </div>
          <p class="card-text"><b>Population: </b>${country.population.toLocaleString(
            "en-IN"
          )}</p>
          <p class="card-text"><b>Region: </b>${country.region}</p>
          <p class="card-text"><b>Capital: </b>${
            country.capital ? country.capital[0] : "N/A"
          }</p>
        </div>
      </a>
    `;

    if (cardContainer) {
      cardContainer.innerHTML += cardHTML;
    }
  });
}

// Toggle Clear Filter button visibility
function toggleClearFilterButton() {
  const hasRegionFilterApplied = filterByRegion.value !== "-1";
  clearFilter.style.display = hasRegionFilterApplied ? "inline-block" : "none";
}

// Initial data fetch
fetchData("https://restcountries.com/v3.1/all");

// Filter by region
filterByRegion.addEventListener("change", (e) => {
  const region = e.target.value;
  if (region !== "-1") {
    fetchData(`https://restcountries.com/v3.1/region/${region}`);
  } else {
    fetchData("https://restcountries.com/v3.1/all"); // Fetch all countries if no region is selected
  }
  toggleClearFilterButton(); // Show the button if a region filter is applied
});

// Clear filter
clearFilter.addEventListener("click", () => {
  fetchData("https://restcountries.com/v3.1/all"); // Fetch all countries
  filterByRegion.value = "-1"; // Reset dropdown selection to default
  toggleClearFilterButton(); // Hide the button after clearing filters
});

// Search
searchInput.addEventListener("input", (e) => {
  const search = e.target.value.trim();
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );
  renderCards(filteredCountries); // Render the filtered countries
});

//theme changer
themeChanger.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  
  if (document.body.classList.contains("dark")) {
    themeChanger.innerHTML = '<i class="fa-regular fa-sun"></i>&nbsp; <b>Light Mode</b>';
  } else {
    themeChanger.innerHTML = '<i class="fa-regular fa-moon"></i>&nbsp; <b>Dark Mode</b>';
  }
});

