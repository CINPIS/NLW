import React from 'react';

import WhatsIcon from '../../assets/icons/whatsapp.svg';

import './style.css';

function TeacherItem(){
    return(
    <article className="teacher-item">
        <header>
            <img src="https://avatars0.githubusercontent.com/u/49377882?s=460&u=1c65ae0cb8708e48c2bee95289a22dae4e1768e0&v=4" alt="CinPis"/>
            <div>
                <strong>Cinthia Pissetti</strong>
                <span>Portuguese</span>
            </div>
        </header>

        <p>
            Portuguese language is a passion.
            <br /> <br />
            Portuguese is not a simple language, but it is very beautiful from its everyday pronunciation to its placement. 
        </p>

        <footer>
            <p>Price/hour
                <strong>$ 60,00</strong>
            </p>
            <button type="button">
                <img src={WhatsIcon} alt="WhatsApp"/>
                Get in Touch
            </button>
        </footer>
    </article>
    );
}

export default TeacherItem;

