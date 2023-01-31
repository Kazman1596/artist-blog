import React, { useEffect, useState } from 'react';
import Entry from './Entry';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const Projects = () => {
    const [entries, setEntries] = useState([])
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'entries'), orderBy(('timestamp'), 'desc')), (snapshot) => {
                setEntries(snapshot.docs)
            }
        )
        
    })

    return (
        <div id='projects' className='flex justify-center'>
        
                <div className='m-5'>
                    {entries.map(entry => (
                        <Entry 
                            key={entry.id} 
                            title={entry.data().title} 
                            id={entry.id} 
                            description={entry.data().description} 
                            img={entry.data().image} 
                        />
                    ))}
                </div>
        </div>
    );
}

export default Projects;
