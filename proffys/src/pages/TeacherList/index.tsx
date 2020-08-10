import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';


function TeacherList(){

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

        const response = await api.get('classes', {

            params:{
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
    }

    return(

        <div id="page-teacher-list" className="container">   

            <PageHeader title="There are some teachers available." >
                <form id="search-teachers" onSubmit={searchTeachers}>

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
                    <Select 
                        name="week_day" 
                        label="Week Day"
                        value={week_day}
                        onChange={(e) => {setWeekDay(e.target.value)}}
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
                    <Input 
                        type="time" 
                        name="time" 
                        label="Time" 
                        value={time}
                        onChange={(e) => {
                            setTime(e.target.value) 
                        }}
                    />

                    <button type="submit">Search</button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
                
            </main>
            
        </div>
    );
}

export default TeacherList;