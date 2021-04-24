const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

require("./routes/user.js")(app);

app.listen(port, (err, res) => {
  if (err) console.log(err);
  else console.log(`Server my-crud running on ${port}...`);
});
