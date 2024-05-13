const mongoose = require('mongoose')
const connectionString = process.env.DB_CONNECTION

mongoose.connect(connectionString).then(() => {
    console.log("MongoDB successfully connected with Todo server ");
}).catch((error) => {
    console.log(`Connection failed, Error : ${error}`);
}) 