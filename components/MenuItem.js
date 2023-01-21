import Link from 'next/link';
import React from 'react';

const MenuItem = ({text, link, Icon}) => {
    
    return (
        <div className='m-2'>
             <a target={Icon ? '_blank' : '_self'} rel={'noreferrer'} href={link} className='text-gray-100 hover:text-sky-500 duration-200 md:p-5 lg:p-10'>
                {Icon ? <Icon className='cursor-pointer' /> : null}
                <span className='m-1 text-xs cursor-pointer'>{text}</span>
            </a>
        </div>
    );
}

export default MenuItem;
