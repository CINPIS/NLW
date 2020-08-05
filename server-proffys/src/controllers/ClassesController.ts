import db from '../database/connection';
import convertHourToMinutes from '../database/utils/convertHourToMinutes';
import { Request, Response } from 'express';

interface ScheduleItem{
    week_day: number,
    from: string,
    to: string
} // hora * 60

export default class ClassesController {

    // get chama o index

    async index(request: Request, response: Response){

        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time ){
            return response.status(400).json({
                error: 'Missing filters'
            })
        }

        const timeInMinutes = convertHourToMinutes(time);

        // console.log(timeInMinutes);

        const classes = await db('classes')
            .whereExists(function() { // se existe hora disponivel
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') // `` pq é tabela, não coluna
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) // o ?? é para um parâmetro
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id') 
            //nome, foto, tudo, entao join pq o id do user na tabela
            // class tem que ser igual ao id na tabela users - é um inner join
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    // post chama create

    async create(request: Request, response: Response) {

    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    //transction
    const trx = await db.transaction();

   try{

     // importar o db de forma assincrona - promise
     const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
    });

    const user_id = insertedUsersIds[0];

    const insertedClassesId = await trx('classes').insert({
        subject,
        cost,
        user_id
    });

    const class_id = insertedClassesId[0];

    // converter horas em minutos. o typescritp ajuda na tipagem e seleciona diretamente as variaveis necessarias
    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return{
            class_id,
            week_day: scheduleItem.week_day,
            from: convertHourToMinutes(scheduleItem.from),
            to: convertHourToMinutes(scheduleItem.to)
        }
    });

    await trx('class_schedule').insert(classSchedule); // msm formato do bd

    await trx.commit(); // fazer alteracoes ao mesmo tempo por causa do transition

    return response.status(201).send();

   } catch(err) {

     // console.log(err);
     await trx.rollback(); // altera as alteracoes do banco nesse meio tempo

     return response.status(400).json({
        error: 'Unexpected error while creating a new class'
     });
   }
}
}