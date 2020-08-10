import React from 'react';

import WhatsIcon from '../../assets/icons/whatsapp.svg';
import api from '../../services/api';

import './style.css';

export interface Teacher{

    id: number,
    bio: string,
    avatar: string,
    cost: number,
    name: string,
    subject: string,
    whatsapp: string  
}

interface TeacherItemProps{
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {

    function createNewConnection(){
        api.post('connections', {
            user_id: teacher.id
        });
    }

    return(
    <article className="teacher-item">
        <header>
            <img src={teacher.avatar} alt={teacher.name}/>
            <div>
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
            </div>
        </header>

        <p>{teacher.bio}</p>

        <footer>
            <p>Price/hour
                <strong>$ {teacher.cost}</strong>
            </p>
            <a 
                target="_blank"
                onClick={createNewConnection} 
                href={`https://wa.me/${teacher.whatsapp}`}>
                    
                <img src={WhatsIcon} alt="WhatsApp"/>
                Get in Touch
            </a>
        </footer>
    </article>
    );
}

export default TeacherItem;

