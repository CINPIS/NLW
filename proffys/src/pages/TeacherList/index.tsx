import React from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';

import './styles.css';
import Select from '../../components/Select';

function TeacherList(){
    return(

        <div id="page-teacher-list" className="container">   

            <PageHeader title="There are some teachers available." >
                <form id="search-teachers">

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
                    <Input type="time" name="time" label="Time" />

                </form>
            </PageHeader>

            <main>
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                
            </main>
            
        </div>
    );
}

export default TeacherList;