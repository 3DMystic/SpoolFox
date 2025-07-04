# SpoolFox
To run this project as of right now you will need to go to your terminal:

1. git clone https://github.com/3DMystic/SpoolFox.git
cd your-repo-name
2. npm install
3. go to your package.json and change your "script" to look like this:
         "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "node --watch server.js"
  }
  4. change directory to were you are in SpoolFox-capstone-2025/api
  5. npm run dev

  Once you are running you can go to http://localhost:8080/api/filamentSpools for a full list of current example filament
  that I used to get backend running.