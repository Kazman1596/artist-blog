import React from 'react';
import AboutMe from './AboutMe';

const About = () => {

    return (
        <div id='about' className='container-layout'>
            <div className='w-full h-full'>
                <h1 className='t-0 p-[30px] border-b-2 border-sky-700 text-4xl text-sky-700'>about me.</h1>
                <AboutMe />
            </div>
        </div>
    );
}

export default About;
