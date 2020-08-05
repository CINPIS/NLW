import knex from 'knex';
import path from 'path';

const db = knex({

    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true, // por padrão sql lite não sabe preencher algo vazio, então atribuimos, nesse caso, o null
});

export default db;

// nisso se popula e cria as tabelas do banco,
// no caso, vamos usar conceito de histórico, ou seja, migration,
// para controlar a versão do banco e evitar duplicidades em caso
// de mais de um programador trabalhar no mesmo código.
// migrations serão executados e vão ver as atualizações.
// knex tem uma cli... executando na linha de comando...
// antes, ele executa com JavaScript, não TypeScript. Por isso
// vamos criar na raiz do projeto um knexfile.ts.
// dirname passa a raiz da aplicação, o diretorio,