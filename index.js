const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectBD = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const swaggerDocs = require('./config/swagger'); // Import Swagger cấu hình
const app= express()
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://titan-tech-fe.vercel.app', 
            'http://localhost:3000'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api",router)

// Swagger configuration
swaggerDocs(app);

const PORT = process.env.PORT || 8080;

connectBD().then(()=>{

    app.listen(PORT,()=>{
        console.log('connect to DB')
        console.log("sever is running")
    })
})