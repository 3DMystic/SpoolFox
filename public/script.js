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
        mainContent.innerHTML = ''; // Clears existing content
        spools.forEach(spool => {
            const card = document.createElement('div');
            card.className = 'spool-card';
            card.innerHTML = `
                <h3>${spool.brand} ${spool.name}</h3>
                <a href="${spool.purchaseLink}" target="_blank"><img src=${spool.photo} alt="photo of a filament spool" class="spool-img"/><a/>
                <p>Diameter: ${spool.diameter}</p>
                <p>${spool.weight} ${spool.material} SPOOL</p>
                <p>Price: $${spool.price}</p>
                <p>${spool.reviews} <i id="review-star" class="fa fa-star"></i></p>
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
    const searchInput = document.querySelector(".search-input"); 
    searchInput.classList.toggle('show');
    logo.classList.toggle('show');
});

//search input validation and functionality
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', async (input) => {
    const searchItem = input.target.value.toLowerCase();
    const spools = await fetchSpools();
    const filteredSpools = spools.filter((spool) => 
        spool.name.toLowerCase().includes(searchItem) ||
        spool.weight.toLowerCase().includes(searchItem) ||
        spool.brand.toLowerCase().includes(searchItem) ||
        spool.materialType.toLowerCase().includes(searchItem) ||
        spool.varient.toLowerCase().includes(searchItem)
    );

    const regex = /[^a-zA-Z0-9\s]/;

    

    mainContent.innerHTML = '';
    if (!regex.test(searchItem) && filteredSpools.length > 0) {
        filteredSpools.forEach(spool => {
            const card = document.createElement('div');
            card.className = 'spool-card';
            card.innerHTML = `
                <h3>${spool.brand} ${spool.name}</h3>
                <a href="${spool.purchaseLink}" target="_blank"><img src=${spool.photo} alt="photo of a filament spool" class="spool-img"/></a>
                <p>Diameter: ${spool.diameter}</p>
                <p>${spool.weight} ${spool.material} SPOOL</p>
                <p>Price: $${spool.price}</p>
                <p>${spool.reviews} <i id="review-star" class="fa fa-star"></i></p>
            `;
            mainContent.appendChild(card);
        })
    } 
    else if (regex.test(searchItem)) {
        const alertContainer = document.createElement('div');
        alertContainer.className = 'alert-container';
        alertContainer.innerHTML = `
            <p class="alert-text">No Special Characters Allowed!</p>
        `;
        mainContent.appendChild(alertContainer);
    }
    else {
        const alertContainer = document.createElement('div');
        alertContainer.className = 'alert-container';
        alertContainer.innerHTML = `
            <h3 class="alert-h3">Sorry!</h3>
            <p class="alert-text">Search Not Found</p>
        `;
        mainContent.appendChild(alertContainer);
    }
});



//Quick Filter for Mobile
const materialBtn = document.getElementById('material-btn');

materialBtn.addEventListener('click', () => {
    const displayMaterialOptions = document.querySelector('.material-btn-options');
    displayMaterialOptions.classList.toggle('show'); 

    // to filter spools by material
    const materialOptions = document.querySelectorAll('.quick-material-option');

    if (displayMaterialOptions.classList.contains('show')) {
        materialOptions.forEach(option => {
            option.addEventListener('click', async (event) => {
                const selectedMaterial = event.target.textContent;
                const spools = await fetchSpools();
                const filteredSpools = spools.filter(spool => spool.material === selectedMaterial);
                mainContent.innerHTML = '';
                filteredSpools.forEach(spool => {
                    const card = document.createElement('div');
                    card.className = 'spool-card';
                    card.innerHTML = `
                        <h3>${spool.brand} ${spool.name}</h3>
                        <a href="${spool.purchaseLink}" target="_blank"><img src=${spool.photo} alt="photo of a filament spool" class="spool-img"/><a/>
                        <p>Diameter: ${spool.diameter}</p>
                        <p>${spool.weight} ${spool.material} SPOOL</p>
                        <p>Price: $${spool.price}</p>
                        <p>${spool.reviews} <i id="review-star" class="fa fa-star"></i></p>
                    `;
                mainContent.appendChild(card);
                })
            })
        })
    };

});

const brandBtn = document.getElementById('brand-btn');

brandBtn.addEventListener('click', () => {
    const displayBrandOptions = document.querySelector('.brand-btn-options');
    displayBrandOptions.classList.toggle('show');
    
    // to filter spools by brand
    const brandOptions = document.querySelectorAll('.quick-brand-option');

    if (displayBrandOptions.classList.contains('show')) {
        brandOptions.forEach(option => {
            option.addEventListener('click', async (event) => {
                const selectedBrand = event.target.textContent;
                const spools = await fetchSpools();
                const filteredSpools = spools.filter(spool => spool.brand === selectedBrand);
                mainContent.innerHTML = '';
                filteredSpools.forEach(spool => {
                    const card = document.createElement('div');
                    card.className = 'spool-card';
                    card.innerHTML = `
                        <h3>${spool.brand} ${spool.name}</h3>
                        <a href="${spool.purchaseLink}" target="_blank"><img src=${spool.photo} alt="photo of a filament spool" class="spool-img"/><a/>
                        <p>Diameter: ${spool.diameter}</p>
                        <p>${spool.weight} ${spool.material} SPOOL</p>
                        <p>Price: $${spool.price}</p>
                        <p>${spool.reviews} <i id="review-star" class="fa fa-star"></i></p>
                    `;
                mainContent.appendChild(card);
                })
            })
        })
    };
});

//Desktop Filter
const checkboxes = document.querySelectorAll('.checkbox')

checkboxes.forEach(box => {
    box.addEventListener('change', async () => {
        const selectedBoxes = Array.from(checkboxes).filter(box => box.checked)
        const spools = await fetchSpools();

        let filteredSpools = spools;

        selectedBoxes.forEach(selected => {
            const name = selected.name;
            const value = selected.value;
            filteredSpools = filteredSpools.filter(spool => spool[name] === value);
        });

        mainContent.innerHTML = '';
        filteredSpools.forEach(spool => {
            const card = document.createElement('div');
            card.className = 'spool-card';
            card.innerHTML = `
                <h3>${spool.brand} ${spool.name}</h3>
                <a href="${spool.purchaseLink}" target="_blank"><img src=${spool.photo} alt="photo of a filament spool" class="spool-img"/><a/>
                <p>Diameter: ${spool.diameter}</p>
                <p>${spool.weight} ${spool.material} SPOOL</p>
                <p>Price: $${spool.price}</p>
                <p>${spool.reviews} <i id="review-star" class="fa fa-star"></i></p>
            `;
            mainContent.appendChild(card);
        })
        
    })
})

//hide dropdowns and search bar
const hideBoxes = document.querySelectorAll('.hide');

document.addEventListener('mouseup', (event) => {
    hideBoxes.forEach((box) => {
        if (!box.contains(event.target)) {
            box.classList.remove('show');
        }
    })
})

/*let filteredSpools = spools;

        selectedBoxes.forEach(selected => {
            const name = selected.name;
            const value = selected.value;
            filteredSpools = filteredSpools.filter(spool => spool[name] === value);
        });*/