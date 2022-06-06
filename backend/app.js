const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 9001;
const cors = require('cors');

// parse requests of content-type: application/json
app.use(express.json());
app.use(cors());

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
