const express = require ('express')
const dotenv = require ('dotenv')
const dbconnect = require('./config/db.js')

dotenv.config()

const app = express()
app.use(express.json())

dbconnect();

const authroutes = require ('./routes/auth.routes.js')
const taskRoutes = require ('./routes/task.routes.js')

app.use('/api/auth', authroutes);
app.use('/api/task', taskRoutes);

app.get('/', (req,res)=> {
    res.send('Api is running...')
})

const PORT = process.env.PORT || 7000
app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})