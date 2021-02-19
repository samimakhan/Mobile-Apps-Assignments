const express = require('express');
const app = express();
 
// Importing Routes
const locationRoute = require('./routes-and-models/locationRoute');

app.use("/", locationRoute);

PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});