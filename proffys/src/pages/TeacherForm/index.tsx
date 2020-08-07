import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import WarningIcon from '../../assets/icons/warning.svg';
import './styles.css';

function TeacherForm(){

    const [scheduleTime, setSchedule] = useState([
        {   week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem(){

        setSchedule([
            ...scheduleTime,
            {   week_day: 0, from: '', to: '' }
        ]);
    }

    return(

        <div id="page-teacher-form" className="container">        
           <PageHeader 
                title="It is amazing that you want to teach!" 
                description="The first step is to fill this sing up form"
           />


           <main>
                <fieldset>
                    <legend>Your Data</legend>

                    <Input name="name" label="Full Name"/>
                    <Input name="avatar" label="Avatar"/>
                    <Input name="whatsapp" label="WhatsApp"/>
                    <Textarea name="bio" label="Biography" />

                </fieldset>
                <fieldset>
                    <legend>About the Class</legend>

                    <Select 
                        name="subject" 
                        label="Subject"
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

                    <Input name="cost" label="Cost per hour"/>

                </fieldset>

                <fieldset>
                    <legend>Hours Available
                        <button type="button" onClick={addNewScheduleItem}>
                            + New time
                        </button>
                    </legend>

                    {scheduleTime.map(time => {
                        return (
                            <div key={time.week_day} className="schedule-item">
                                <Select 
                                    name="week_day" 
                                    label="Week Day"
                                    options={[
                                        { value: '0', label: 'Sunday' },
                                        { value: '1', label: 'Monday' },
                                        { value: '2', label: 'Tuesday' },
                                        { value: '3', label: 'Wednesday' },
                                        { value: '4', label: 'Thursday' },
                                        { value: '5', label: 'Friday' },
                                        { value: '6', label: 'Saturday' },

                                    ]}
                                />
                                <Input name="from" label="from" type="time" />
                                <Input name="to" label="to" type="time" />
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
                    <button type="button">Register</button>
                </footer>
           </main>
        </div>
    );
}

export default TeacherForm;