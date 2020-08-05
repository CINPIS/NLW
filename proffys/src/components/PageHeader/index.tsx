import React from 'react';
import { Link } from 'react-router-dom';

import BackIcon from '../../assets/icons/back.svg';
import LogoImage from '../../assets/images/logo.svg';

import './styles.css';

interface PageHeaderProps {
    title: string;    
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to='/'>
                    <img src={BackIcon} alt="Go Back"/>
                </Link>
                <img src={LogoImage} alt="Proffy"/>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                
                {props.children}
            </div>

        </header>
    );
}

export default PageHeader;