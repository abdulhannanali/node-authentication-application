/*
 * index.js
 * A sample application in order to authenticate and display the name of the
 * users authenticated
 * Authors: [Hannan Ali (ali.abdulhannan@gmail.com)]
 *
 */
const  express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express()

// environment specific configurations
if (process.env.NODE_ENV == "development") {
  // using morgan development logger
  app.use(morgan("dev", {}))

  // using config.js file for setting up environment variables
  require("./config")()
}
else if (process.env.NODE_ENV == "production") {
  app.use(morgan("combined", {}))
}
else {
  throw new Error("NODE_ENV not specified")
  process.exit(1)
}


const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "0.0.0.0"
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL

// connecting with the database
mongoose.connect(MONGODB_CONNECTION_URL, function (error) {
  if (error) {
    console.error(error)
    process.exit(1)
  }
  else {
    console.log("Successfully connected to the database")
  }
})


// static file serving
app.use(express.static(__dirname + "/public"))

// view engine is jade
app.set("views", __dirname + "/views")
app.set('view engine', 'jade')


// listening after all this fuss
  if (!error) {
app.listen(PORT, HOST, function (error) {
    console.log(`server is listening on PORT=${PORT} and HOST=${HOST}`)
  }
  else {
    console.log('error while listening to the server')
  }
})
