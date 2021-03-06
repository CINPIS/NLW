import React, { useState, useEffect } from 'react';
import './styles.css';  
import { Link } from 'react-router-dom';

import LogoImg from '../../assets/images/logo.svg';
import LandingImg from '../../assets/images/landing.svg';
import StudyIcon from '../../assets/icons/study.svg';
import GiveClassesIcon from '../../assets/icons/give-classes.svg';
import PurpleHeartIcon from '../../assets/icons/purple-heart.svg';
import api from '../../services/api';


function Landing(){

    const [totalConnections, setTotalConnections] = useState(0);
    useEffect(() => {
        api.get('connections').then(response => {
            // console.log(response);
            const {total} = response.data;

            setTotalConnections(total);
        });
    }, [])

    return (

        <div id="page-landing">
            <div id="page-landing-content" className="container">

                <div className="logo-container">
                    <img src={LogoImg} alt="Proffys"/>
                    <h2>Online plataform right next to you.</h2>
                </div>

                <img 
                    src={LandingImg} 
                    alt="Landing" 
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={StudyIcon} alt="Study"/>
                        Study
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={GiveClassesIcon} alt="Teach"/>
                        Teach
                    </Link>
                </div>

                <span className="total-connections">
                    Total of {totalConnections} connections already done.
                    <img src={PurpleHeartIcon} alt="Purple Heart"/>
                </span>
            </div>
        </div>
    );
}

export default Landing;