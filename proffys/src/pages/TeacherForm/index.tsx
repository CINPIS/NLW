import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import api from '../../services/api';

import WarningIcon from '../../assets/icons/warning.svg';
import './styles.css';

function TeacherForm(){

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleTime, setSchedule] = useState([
        {   week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem(){

        setSchedule([
            ...scheduleTime,
            {   week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string){
        const updatedScheduleItems = scheduleTime.map((scheduleTime, index) => {
            if (index === position){
                return  { ...scheduleTime, [field]: value }
            }
            return scheduleTime;
        });
        
        
        setSchedule(updatedScheduleItems);

    } // [field] pq é uma variavel

    function handleCreateClass(e: FormEvent){

        api.post('classes', {
            name, 
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleTime
        }).then(() => {
            alert('Congratulation for appling succesfully to be a teacher at Proffys!');
            history.push('/');
        }).catch(() => {
            alert('Unespected Error');
        });

        e.preventDefault();
        console.log({
            name, 
            avatar, 
            whatsapp, 
            bio,
            subject, 
            cost,
            scheduleTime
        });
    }

    return(

        <div id="page-teacher-form" className="container">        
           <PageHeader 
                title="It is amazing that you want to teach!" 
                description="The first step is to fill this sing up form"
           />

           <main>
               <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Your Data</legend>
                        <Input 
                            name="name" 
                            label="Full Name" 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}} />
                        <Input 
                            name="avatar" 
                            label="Avatar" 
                            value={avatar} 
                            onChange={(e) => {setAvatar(e.target.value)}}/>
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp" 
                            value={whatsapp} 
                            onChange={(e) => {setWhatsapp(e.target.value)}}/>
                        <Textarea 
                            name="bio" 
                            label="Biography" 
                            value={bio} 
                            onChange={(e) => {setBio(e.target.value)}} />
                </fieldset>

                <fieldset>
                    <legend>About the Class</legend>
                        <Select 
                            name="subject" 
                            label="Subject"
                            value={subject} 
                            onChange={(e) => {setSubject(e.target.value)}} 
                            options={[
                                { value: 'Administration', label: 'Administration' },
                                { value: 'Mathematical Logic', label: 'Mathematical Logic' },
                                { value: 'Portuguese', label: 'Portuguese' },
                                { value: 'Computing', label: 'Computing' },
                                { value: 'Databases', label: 'Databases' },
                                { value: 'Software Engineering', label: 'Software Engineering' },
                                { value: 'Information Architecture', label: 'Information Architecture' },
                                { value: 'Ethic in Puclic Administration', label: 'Ethic in Puclic Administration' },
                                { value: 'Health Legislation', label: 'Health Legislation' },
                                { value: 'Constitutional Right', label: 'Constitutional Right' },
                                { value: 'Statistic', label: 'Statistic' },
                                { value: 'Behavioral Psychology', label: 'Behavioral Psychology' },
                                { value: 'Programming', label: 'Programming' },
                                { value: 'Computer Architecture', label: 'Computer Architecture' },

                            ]}
                        />
                        <Input 
                            name="cost" 
                            label="Cost per hour"
                            value={cost} 
                            onChange={(e) => {setCost(e.target.value)}} 
                        />

                </fieldset>

                <fieldset>
                    <legend>Hours Available
                        <button type="button" onClick={addNewScheduleItem}>
                            + New time
                        </button>
                    </legend>

                    {scheduleTime.map((time, index) => {
                        return (
                            <div key={time.week_day} className="schedule-item">
                                <Select 
                                    name="week_day" 
                                    label="Week Day"
                                    value={time.week_day}
                                    onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                    options={[
                                        { value: '0', label: 'Sunday' },
                                        { value: '1', label: 'Monday' },
                                        { value: '2', label: 'Tuesday' },
                                        { value: '3', label: 'Wednesday' },
                                        { value: '4', label: 'Thursday' },
                                        { value: '5', label: 'Friday' },
                                        { value: '6', label: 'Saturday' }
                                    ]}
                                />
                                <Input 
                                    name="from" 
                                    label="from" 
                                    type="time" 
                                    value={time.from}
                                    onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                />
                                <Input 
                                    name="to" 
                                    label="to" 
                                    type="time"
                                    value={time.to}
                                    onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                />
                            </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={WarningIcon} alt="Important"/>
                            Important! <br />
                            Fill the fields above
                        </p>
                        <button 
                            type="submit">
                                Register
                        </button>
                    </footer>
                </form>
           </main>
        </div>
    );
}

export default TeacherForm;