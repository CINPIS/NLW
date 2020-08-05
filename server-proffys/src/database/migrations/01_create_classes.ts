import Knex from 'knex';

// TypeScript

export async function up(knex: Knex){

    return knex.schema.createTable('classes', table => {

        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        table.integer('user_id') //relacionamento
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')  // atualiza tbm de forma cascade
            .onDelete('CASCADE'); // deleta o professor e as aulas dele
            

    }); // o parametro recebido é a tabela criada

} // alteracoes no bd

export async function down(knex: Knex){

    return knex.schema.dropTable('classes');

}