import Knex from 'knex';

// TypeScript

export async function up(knex: Knex){

    return knex.schema.createTable('connections', table => {
        // conexão com o professor
        table.increments('id').primary();

        table.integer('user_id') //relacionamento
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')  // atualiza tbm de forma cascade
            .onDelete('CASCADE'); // deleta o professor e as aulas dele
            
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable(); // marcar a hora e id do professor

    }); // o parametro recebido é a tabela criada

} // alteracoes no bd

export async function down(knex: Knex){

    return knex.schema.dropTable('class_schedule');
}