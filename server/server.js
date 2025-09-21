require('dotenv').config();
const app = require('./src/App')

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})