import React from 'react';

const RelTech = () => {
    const techArray = [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Java',
        'SQL',
    ]

    return (
        <div className='flex justify-center'>
            <div className=''>
                <p className='font-labelle text-xl text-center'>Relevant Technologies</p>
                <div className='flex'>
                    <ul className='flex columns-3'>
                        {techArray.map(tech => (
                            <li className='p-5 text-center text-xs' key={tech}>{tech}</li>
                        ))}
                    </ul> 
                </div>
            </div>
        </div>
    );
}

export default RelTech;