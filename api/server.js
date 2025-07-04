const express = require('express');
const app = express();
const PORT = 8080;
const filamentSpools = require('./filamentSpools');

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to the Filament Spools API! Use /filamentSpools to access the data.");
});

// get all filament spools
app.get("/api/filamentSpools", (req, res) => {
    res.json(filamentSpools);
});

// get all filament spools by type
app.get("/api/filamentSpools/:materialType", (req, res) => {
    const materialType = req.params.materialType.toUpperCase();
    const spools = filamentSpools[materialType];

    if (spools) { 
        res.json(spools);
    } else {
        res.status(404).json({message: `Fliament type @{materialType} not found`});
    }
});

//get single filament spool by id
app.get("/api/filamentSpools/id/:id", (req, res) => {
    const id = req.params.id;

    // merged all filament types into a single array
    const allFilamentTypes = [
        ...filamentSpools.PLA,
        ...filamentSpools.PETG,
        ...filamentSpools.TPU
    ];

    // find the spool with the matching id
    const spool = allFilamentTypes.find(spool => spool.id ===id);

    if (spool) {
        res.json(spool);
    } else {
        res.status(404).json({message: 'Filament spool not found'});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
