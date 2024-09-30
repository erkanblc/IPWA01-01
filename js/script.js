// Erstle Loading , content1 zeigen
document.getElementById("content1").classList.add("active");




// ausgewählt anzeigen
function showContent(contentId) {
  var contentAreas = document.querySelectorAll(".content-area");
  contentAreas.forEach(function (area) {
    area.classList.remove("active");
  });

  document.getElementById(contentId).classList.add("active");
}


//Kontakt Form
function handleSubmit(event) {
  event.preventDefault(); // Formun yeniden yüklenmesini engelle

  // Form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Alert Message zeigen
  alert(`Ad: ${name}\nE-posta: ${email}\nMesaj: ${message}`);

  // Form reset
  document.getElementById('contactForm').reset();
}



//// JSON /////
// JSON verisini fetch ile yükle ve tabloya ekle
const tableBody = document.querySelector('#emissionenTable tbody');
const searchInput = document.getElementById('searchInput');
const rPageSelect = document.getElementById('rowsPerPage');
const pagination = document.getElementById('pagination');
const radioButtons = document.querySelectorAll('input[name="dataFilter"]');

const tableBodyLaender = document.querySelector('#emissionenTableLaender tbody');
const searchInputLaender = document.getElementById('searchInputLaender');
const rPageSelectLaender = document.getElementById('rowsPerPageLaender');
const paginationLaender = document.getElementById('paginationLaender');
const radioButtonsLaender = document.querySelectorAll('input[name="dataFilterLaender"]');

const tableBodyGesamt = document.querySelector('#gesamtTable tbody');
const searchInputGesamt = document.getElementById('searchInputGesamt');
const rPageSelectGesamt = document.getElementById('rowsPerPageGesamt');
const paginationGesamt = document.getElementById('paginationGesamt');
const radioButtonsGesamt = document.querySelectorAll('input[name="dataFilterGesamt"]');

let currentPage = 1;
let rPage = 10;
let filteredData = [];

let currentPageLaender = 1;
let rPageLaender = 10;
let filteredDataLaender = [];

let currentPageGesamt = 1;
let rPageGesamt = 10;
let filteredDataGesamt = [];

// JSON data lesen mit fetch
fetch('json/emissionen_data.json')
  .then(response => response.json())
  .then(data => {

    // Filter UnternehmenNahme a>b
    const unternehmenData = data.filter(item => item.type === 'Unternehmen');
    filteredData = unternehmenData;
    const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
    filteredData = sortedData;
    populateTable(filteredData, rPage, currentPage);
    setupPagination(filteredData, rPage);

    // Filter mit RadioButton (Unternehmen)
    radioButtons.forEach(radio => {
      radio.addEventListener('change', () => {
        filteredData = unternehmenData.filter(item =>
          filterRadio(item, searchInput.value.toLowerCase())
        );
        currentPage = 1;
        populateTable(filteredData, rPage, currentPage);
        setupPagination(filteredData, rPage);
      });
    });

    // Filter mit inputBox (Unternehmen)
    searchInput.addEventListener('input', () => {
      filteredData = unternehmenData.filter(item =>
        filterRadio(item, searchInput.value.toLowerCase())
      );
      currentPage = 1;
      populateTable(filteredData, rPage, currentPage);
      setupPagination(filteredData, rPage);
    });

// die Anzahl der Zeilen aktualisieren (Unternehmen)
rPageSelect.addEventListener('change', () => {
  rPage = parseInt(rPageSelect.value);
  currentPage = 1;
  populateTable(filteredData, rPage, currentPage);
  setupPagination(filteredData, rPage);
});



    // Filter LandName a>b
    const laenderData = data.filter(item => item.type === 'Land');
    filteredDataLaender = laenderData;
    const sortedDataLander = filteredDataLaender.sort((a, b) => a.name.localeCompare(b.name));
    filteredDataLaender = sortedDataLander;
    populateTableLaender(filteredDataLaender, rPageLaender, currentPageLaender);
    setupPaginationLaender(filteredDataLaender, rPageLaender);

    // Filter mit RadioButton (Laender)
    radioButtonsLaender.forEach(radio => {
      radio.addEventListener('change', () => {
        filteredDataLaender = laenderData.filter(item =>
          filterRadioLaender(item, searchInputLaender.value.toLowerCase())
        );
        currentPageLaender = 1;
        populateTableLaender(filteredDataLaender, rPageLaender, currentPageLaender);
        setupPaginationLaender(filteredDataLaender, rPageLaender);
      });
    });

    // Filter mit inputBox (Laender)
    searchInputLaender.addEventListener('input', () => {
      filteredDataLaender = laenderData.filter(item =>
        filterRadioLaender(item, searchInputLaender.value.toLowerCase())
      );
      currentPageLaender = 1;
      populateTableLaender(filteredDataLaender, rPageLaender, currentPageLaender);
      setupPaginationLaender(filteredDataLaender, rPageLaender);
    });

// die Anzahl der Zeilen aktualisieren (Laender)
rPageSelectLaender.addEventListener('change', () => {
  rPageLaender = parseInt(rPageSelectLaender.value);
  currentPageLaender = 1;
  populateTableLaender(filteredDataLaender, rPageLaender, currentPageLaender);
  setupPaginationLaender(filteredDataLaender, rPageLaender);
});



    // Data Sort (Gesamt) (Emissionen 0 > 99)
    filteredDataGesamt = data.sort((a, b) => a.emissionen - b.emissionen);
    populateTableGesamt(filteredDataGesamt, rPageGesamt, currentPageGesamt);
    setupPaginationGesamt(filteredDataGesamt, rPageGesamt);

    // Filter mit RadioButton (Gesamt)
    radioButtonsGesamt.forEach(radio => {
      radio.addEventListener('change', () => {
        filteredDataGesamt = data.filter(item =>
          filterRadioGesamt(item, searchInputGesamt.value.toLowerCase())
        );
        currentPageGesamt = 1;
        populateTableGesamt(filteredDataGesamt, rPageGesamt, currentPageGesamt);
        setupPaginationGesamt(filteredDataGesamt, rPageGesamt);
      });
    });

    // Filter mit inputBox (Gesamt)
    searchInputGesamt.addEventListener('input', () => {
      filteredDataGesamt = data.filter(item =>
        filterRadioGesamt(item, searchInputGesamt.value.toLowerCase())
      );
      currentPageGesamt = 1;
      populateTableGesamt(filteredDataGesamt, rPageGesamt, currentPageGesamt);
      setupPaginationGesamt(filteredDataGesamt, rPageGesamt);
    });

    // die Anzahl der Zeilen aktualisieren (Gesamt)
    rPageSelectGesamt.addEventListener('change', () => {
      rPageGesamt = parseInt(rPageSelectGesamt.value);
      currentPageGesamt = 1;
      populateTableGesamt(filteredDataGesamt, rPageGesamt, currentPageGesamt);
      setupPaginationGesamt(filteredDataGesamt, rPageGesamt);
    });
  })
  .catch(error => {
    console.error('JSON-Datei konnte nicht geladen werden:', error);
  });

//Data sortieren endet hier

////// Filter Funktion  //////
// Filter (Unternehmen)
function filterRadio(item, searchTerm) {
  const selectedRadio = document.querySelector('input[name="dataFilter"]:checked').value;

  if (selectedRadio === 'name') {
    return item.name.toLowerCase().includes(searchTerm);
  } else if (selectedRadio === 'emissionen') {
    return item.emissionen.toString().includes(searchTerm);
  }
}

// Filter (Laender)
function filterRadioLaender(item, searchTerm) {
  const selectedRadio = document.querySelector('input[name="dataFilterLaender"]:checked').value;

  if (selectedRadio === 'name') {
    return item.name.toLowerCase().includes(searchTerm);
  } else if (selectedRadio === 'emissionen') {
    return item.emissionen.toString().includes(searchTerm);
  }
}

// Filter (Gesamt)
function filterRadioGesamt(item, searchTerm) {
  const selectedRadio = document.querySelector('input[name="dataFilterGesamt"]:checked').value;

  if (selectedRadio === 'name') {
    return item.name.toLowerCase().includes(searchTerm);
  } else if (selectedRadio === 'emissionen') {
    return item.emissionen.toString().includes(searchTerm);
  } else if (selectedRadio === 'type') {
    return item.type.toLowerCase().includes(searchTerm);
  }
}


/////  Tabelle //////
// Tabelle ausfüllen (Unternehmen)
function populateTable(data, rPage, page) {
  tableBody.innerHTML = ''; 
  const startIndex = (page - 1) * rPage;
  const endIndex = startIndex + rPage;
  const paginatedData = data.slice(startIndex, endIndex);

  paginatedData.forEach(item => {
    const row = `<tr>
        <td>${item.name}</td>
        <td>${item.emissionen}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

// Tabelle ausfüllen (Laender)
function populateTableLaender(data, rPage, page) {
  tableBodyLaender.innerHTML = ''; 
  const startIndex = (page - 1) * rPage;
  const endIndex = startIndex + rPage;
  const paginatedData = data.slice(startIndex, endIndex);

  paginatedData.forEach(item => {
    const row = `<tr>
        <td>${item.name}</td>
        <td>${item.emissionen}</td>
      </tr>`;
    tableBodyLaender.innerHTML += row;
  });
}

// Tabelle ausfüllen (Gesamt)
function populateTableGesamt(data, rPage, page) {
  tableBodyGesamt.innerHTML = ''; 
  const startIndex = (page - 1) * rPage;
  const endIndex = startIndex + rPage;
  const paginatedData = data.slice(startIndex, endIndex);

  paginatedData.forEach(item => {
    const row = `<tr>
        <td>${item.name}</td>
        <td>${item.emissionen}</td>
        <td>${item.type}</td>
      </tr>`;
    tableBodyGesamt.innerHTML += row;
  });
}

//// Page Button///// 
// Page Button (Unternehmen)
function setupPagination(data, rPage) {
  pagination.innerHTML = '';
  const pageCount = Math.ceil(data.length / rPage);

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    if (i === currentPage) button.classList.add('active');
    button.addEventListener('click', () => {
      currentPage = i;
      populateTable(data, rPage, currentPage);
      setupPagination(data, rPage); 
    });
    pagination.appendChild(button);
  }
}

// Page Button (Laender)
function setupPaginationLaender(data, rPage) {
  paginationLaender.innerHTML = '';
  const pageCount = Math.ceil(data.length / rPage);

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    if (i === currentPageLaender) button.classList.add('active');
    button.addEventListener('click', () => {
      currentPageLaender = i;
      populateTableLaender(data, rPageLaender, currentPageLaender);
      setupPaginationLaender(data, rPageLaender); 
    });
    paginationLaender.appendChild(button);
  }
}

// Page Button (Gesamt)
function setupPaginationGesamt(data, rPage) {
  paginationGesamt.innerHTML = '';
  const pageCount = Math.ceil(data.length / rPage);

  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    if (i === currentPageGesamt) button.classList.add('active');
    button.addEventListener('click', () => {
      currentPageGesamt = i;
      populateTableGesamt(data, rPageGesamt, currentPageGesamt);
      setupPaginationGesamt(data, rPageGesamt); 
    });
    paginationGesamt.appendChild(button);
  }
}





//search in google
function performGoogleSearch(event) {
  event.preventDefault(); 
  var query = document.querySelector('.search-input').value; 
  if (query) {
    window.open('https://www.google.com/search?q=' + encodeURIComponent(query), '_blank'); 
  }
}


// Menu Fussabruck
// Öffnen und schliessen
function toggleSubMenu() {
  const subMenu = document.getElementById("subMenu");
  subMenu.classList.toggle("show");
}


function toggleSubMenu() {
  var subMenu = document.getElementById("subMenu");
  if (subMenu.classList.contains("active")) {
    subMenu.classList.remove("active");
  } else {
    subMenu.classList.add("active");
  }
}

// Kontakt Menü öffnen und schliessen
function toggleSearchForm() {
  var searchForm = document.getElementById('searchForm');
  if (searchForm.style.display === 'none' || searchForm.style.display === '') {
    searchForm.style.display = 'flex'; // öffnen
  } else {
    searchForm.style.display = 'none'; // schliessen
  }
}

//mobil menü
function toggleMenu() {
  const menu = document.querySelector("nav ul");
  menu.classList.toggle("show-menu");
}