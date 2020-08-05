//importar bd, verbose configura informações
const sqlite = require("sqlite3").verbose()

//iniciar objeto de bd para operações no bd
//forma de constructor, classe
const db = new sqlite.Database("./src/database/database.db")


//depois de popular o db, é necessário exportar ele, objeto db, para
//que a aplicação faça uso
module.exports = db

/*
//utilizar o objeto de banco para o site
db.serialize(() => {
    //criar tabela com comandos sql. template literals (string sql):
    
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
    // `para quebrar linhas sem danos. 
    // places de locais de coleta

    //inserir dados na tabela places ons nomes 
    //seguintes e campos com os valores dados pelos clientes
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

    //função do tipo callback, chamada depois de um certo tempo
    //e a aplicação não fica esperando travada, mas continua normalmente
    //essa função guarda e executa mais tarde, ele chama de volta a função
    //depois que terminar o que continuu, e executar, assim, a função callback.
    
    db.run(query, values, afterInsertData)  //- JÁ foi criado.

    //esse this é referência a essa resposta. Nesse caso não se usa arrow funcions.
    //nesse caso ela está sendo passada por referencia, executada depois de rodar tudo, 
    //não no instante em que chega na linha da maq visualizar a função.
    //Até porque ela é do tipo callback

    //consultar dados
    db.all(`SELECT * FROM places`, function(error, rows){
        if(error){
            return console.log(error)
        }
        console.log("aqui estão os registros.")
        console.log(rows)
    })

    //deletar dado na tabela, um dado especigico, 
    //no caso, o um do array: o que fizemos acima
    //o número de id deletado nunca será reutilizado, 
    //pula ele e conitnua contanto
  /* db.run(`DELETE FROM places WHERE id = ?`, [5], function(error){
        if(error){
            return console.log(error)
        }
        console.log("registro deletado com sucesso.")
    })
  */
//})  //? É para tirar coleção de itens, aqui só tem um ?
