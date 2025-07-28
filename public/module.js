
function createSpoolCards (listener) {
    listener.addEventListener('click', async (event) => {
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
};

export {createSpoolCards}