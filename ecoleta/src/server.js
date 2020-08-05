const express = require("express")
const server = express()

const db = require("./database/db.js")

server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Um título"
    })
})

server.get("/create-point", (req, res) => {
    
    return res.render("create-point.html")

})

server.post("/save-point", (req, res) => {
    
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(error){
        if(error){
            console.log(error)
            return res.send("OPS! Ocorreu erro ao Cadastrar.")
        }
        console.log("cadastro realizado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }
    
    db.run(query, values, afterInsertData)  //- JÁ foi criado.
})


server.get("/search", (req, res) => {

    const search = req.query.search
    if( search == "" ){
        return res.render("search-points.html", {total:0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(error, rows){
        if(error){
            return console.log(error)
        }

        const total = rows.length

        return res.render("search-points.html", {places: rows, total:total})
    })

})

//nunjuckes - template engine
const nunjuckes = require("nunjucks")
nunjuckes.configure("src/views", {
    express: server,
    noCache: true
})

server.listen(3000)

