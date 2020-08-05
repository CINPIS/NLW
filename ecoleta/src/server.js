const express = require("express")
const server = express()

//pegar banco de dados
const db = require("./database/db.js")

//public folder access
server.use(express.static("public"))

//habilitar uso do req.body. USE para configurar.
server.use(express.urlencoded({ extended: true }))

server.get("/", (req, res) => {
    return res.render("index.html", {
        title: "Um título"
    })
})

//com o formulario preenchido, precisamos
//de requisição tbm, atributo req.query, pois
//estamos pegando a query string ou link enviado pelo front
//form
server.get("/create-point", (req, res) => {
    
    //console.log(req.query)
    //req.query

    return res.render("create-point.html")
    // TESTE return res.render("create-point.html", { saved: true })

})
//outra rota para ele
//no navegador o verbo é get. 
//o post (lá no form: action="/save-point" method="POST")
server.post("/save-point", (req, res) => {
    
    //corpo do form. Mas tem que habilitar 
    //console.log(req.body)
    //agora tem que inserir os dados do form no bd
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

        //return res.send("OK! Formulário enviado!")
        return res.render("create-point.html", { saved: true })
    }
    
    db.run(query, values, afterInsertData)  //- JÁ foi criado.
})


server.get("/search", (req, res) => {

    const search = req.query.search
    if( search == "" ){
        return res.render("search-points.html", {total:0})
        //mostra a pg html com os do banco total vazio = 0 ou nada
    }

    //pegar dados do bd - template literals ou strings aceita 
    //a ${} entre aspas simples. Like e % para aprox antes e depois.
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(error, rows){
        if(error){
            return console.log(error)
        }

        const total = rows.length

        //console.log("aqui estão os registros.")
        //console.log(rows)
        return res.render("search-points.html", {places: rows, total:total})
        //mostra a pg html com os do banco

    })

})

//nunjuckes - template engine
const nunjuckes = require("nunjucks")
nunjuckes.configure("src/views", {
    express: server,
    noCache: true
})


//ligar o servidor, ouça a porta 3000
server.listen(3000)

