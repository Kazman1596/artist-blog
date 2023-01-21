import React from 'react';
import Entry from './Entry';
import { entryArray } from '../project_data/test_entries';

const Projects = () => {

    return (
        <div id='projects' className='flex justify-center'>
                <div className='m-5'>
                    {entryArray.map(entry => (
                        <Entry key={entry.id} title={entry.title} id={entry.id} description={entry.description} img={entry.img} />
                    ))}
                </div>
        </div>
    );
}

export default Projects;
