//This is my application-level configuration object
require("dotenv").config();
//Create configuration object
const configuration = {
    ConnectionString:{
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    }
}
//Export the configuration object
module.exports = configuration;