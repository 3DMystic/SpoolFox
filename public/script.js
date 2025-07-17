
const mainContent = document.querySelector('.main-content') || document.getElementById('main-content');

// Function to fetch spools from the server
async function fetchSpools() {
    try {
        const response = await fetch('/api/filamentSpools')
        console.log('Fetch response:', response);
        if (!response.ok) {
            throw new Error('msg Error: ' + response.statusText);
        }
        const data = await response.json();
        
        // Flattens all filament spools into a single array
        const allSpools = [];
        Object.entries(data).forEach(([materialType, spools]) => {
            if (Array.isArray(spools)) {
                spools.forEach(spool => {
                    spool.material = materialType; // Add material type to each spool
                    allSpools.push(spool);
                });
            }
        });
        return allSpools;
    } catch (error) {
        console.error('Error fetching spools: ', error);
    }
}


// Function to render filament spools in the main content area for all types of filament
// This function is called when the page loads to display all spools
async function createSpoolCards() {
    const spools = await fetchSpools();
    if (spools && spools.length > 0) {
        console.log(spools.photo)
        mainContent.innerHTML = ''; // Clear existing content
        spools.forEach(spool => {
            const card = document.createElement('div');
            card.className = 'spool-card';
            card.innerHTML = `
                <h3>${spool.name}</h3>
                <img src=${spool.photo} alt="photo of a filament spool" class="spool-img"/>
                <p>Color: ${spool.color}</p>
                <p>Material: ${spool.material}</p>
                <p>Weight: ${spool.weight}</p>
            `;
            mainContent.appendChild(card);
        });
    }
}

createSpoolCards();

//Event Listeners
//menu button
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle('show');
});

//search bar
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const logo = document.getElementById('logo-img');
    const searchInput = document.querySelector(".search-input"); //needs work so that while search bar is showing, the logo won't be and vis vera
    while (searchInput.classList.toggle('show') === true ) {
        logo.classList.remove('show');
    }
})

//Quick Filter for Mobile
const materialBtn = document.getElementById('material-btn');

materialBtn.addEventListener('click', () => {
    console.log('material clicked');
    const displayMaterialOptions = document.querySelector('.material-btn-options');
    displayMaterialOptions.classList.toggle('show');
});

const brandBtn = document.getElementById('brand-btn');

brandBtn.addEventListener('click', () => {
    console.log('brand clicked');
    const displayBrandOptions = document.querySelector('.brand-btn-options');
    displayBrandOptions.classList.toggle('show');
});

//hide dropdowns and search bar
const hideBoxes = document.querySelectorAll('.hide');

document.addEventListener('mouseup', (event) => {
    hideBoxes.forEach((box) => {
        if (!box.contains(event.target)) {
            box.classList.remove('show');
        }
    })
})
