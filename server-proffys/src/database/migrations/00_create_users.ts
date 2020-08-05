import Knex from 'knex';

// TypeScript

export async function up(knex: Knex){

    return knex.schema.createTable('users', table => {

        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();

    }); // o parametro recebido é a tabela criada

} // alteracoes no bd

export async function down(knex: Knex){

    return knex.schema.dropTable('users');

} // voltar alteracao em caso de precisar