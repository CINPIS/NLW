import path from 'path';

module.exports = { // sintaxe mais antigo pro knex entender

    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
}; 

// vamos sobrescrever o migrate mae e migrate latest
// para executar as migrações disponiveis, vamos alterar um pouco o funcionamento.
// primeiro cria a migration: na mao pra nao ser em js.
