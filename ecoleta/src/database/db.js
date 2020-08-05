const sqlite = require("sqlite3").verbose()

const db = new sqlite.Database("./src/database/database.db")

module.exports = db

    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    
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
        "https://images.unsplash.com/photo-1533626904905-cc52fd99285e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80", 
        "Coletoria", "Guilherme Gembala, Jardim América",
        "N° 260", 
        "Santa Catarina", 
        "Rio do Sul", 
        "Resíduos Orgânicos"
    ]

    function afterInsertData(error){
        if(error){
            return console.log(error)
        }
        console.log("cadastro realizado com sucesso!")
        console.log(this)
    }

    db.run(query, values, afterInsertData)  //- JÁ foi criado.

    db.all(`SELECT * FROM places`, function(error, rows){
        if(error){
            return console.log(error)
        }
        console.log("aqui estão os registros.")
        console.log(rows)
    })

 db.run(`DELETE FROM places WHERE id = ?`, [5], function(error){
        if(error){
            return console.log(error)
        }
        console.log("registro deletado com sucesso.")
    })

}) 
