const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = 1245;

// Use the routes defined in full_server/routes/index.js
app.use(routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
