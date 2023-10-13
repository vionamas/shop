require("dotenv").config()
const express = require("express")
const cors = require("cors")
// const db = require("./config/database")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('./client')) //aquí decimos mira aquí dentro y puede usar todos los archivos que hay dentro dentro de client




const port = process.env.PORT || 2018
app.listen(port, () => {
    console.log(`listening at port ${port}`)
})

// db.execute("SELECT * FROM home").then((res) => console.log(res[0])).catch((err) => console.log(err, "not working"))

app.use("/api", require("./routes/homeProducts"))

app.get("/", (req, res) => {
    res.status(200).send("<h1>Shop final project</h1>")
})