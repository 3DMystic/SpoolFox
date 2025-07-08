const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');
const filamentSpools = JSON.parse(fs.readFileSync('./filamentSpools.json', 'utf8'));

const path = require('path');

// Serve frontend from public/
app.use(express.static(path.join(__dirname, '../public')));


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
        res.status(200).json(spools);
    } else {
        res.status(404).json({message: `Fliament type ${materialType} not found`});
    }
});

//get single filament spool by id
app.get("/api/filamentSpools/id/:id", (req, res) => {
    const id = req.params.id.toLocaleLowerCase();

    // merged all filament types into a single array
    const allFilamentTypes = [
        ...filamentSpools.PLA,
        ...filamentSpools.PETG,
        ...filamentSpools.TPU
    ];

    // find the spool with the matching id
    const spool = allFilamentTypes.find(spool => spool.id.toLowerCase() === id);
    if (spool) {
        res.status(200).json(spool);
    } else {
        res.status(404).json({message: 'Filament spool not found'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Press Ctrl+C to end this process.");
});
