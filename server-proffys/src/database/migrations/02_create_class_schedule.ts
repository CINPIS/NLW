import Knex from 'knex';

// TypeScript

export async function up(knex: Knex){

    return knex.schema.createTable('class_schedule', table => {

        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();


        table.integer('class_id') //relacionamento
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')  // atualiza tbm de forma cascade
            .onDelete('CASCADE'); // deleta o professor e as aulas dele
            

    }); // o parametro recebido é a tabela criada

} // alteracoes no bd

export async function down(knex: Knex){

    return knex.schema.dropTable('class_schedule');

}