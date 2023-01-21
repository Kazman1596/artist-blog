import React from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState } from '../atom/projectAtom';
import { keyState } from '../atom/keyAtom';


const Project = ({img, title, description, id}) => {
    const [open, setOpen] = useRecoilState(modalState)
    const [projectId, setProjectId] = useRecoilState(keyState)

    const clickEvent = () => {
        setOpen(true);
        setProjectId(id)
    }

    return (
        <div onClick={()=> clickEvent()} className='mb-5 rounded-[15px] max-w-3xl border-sky-700 hover:cursor-pointer scale-95 hover:scale-100 duration-200'>
            <div className='flex justify-center items-center'>
                <Image className='p-2 rounded-[15px]' src={img} width={400} height={300} alt='test'/>
            </div>
            <h1 className='m-2 font-labelle text-center text-2xl underline text-white'>{title}</h1>
            <p className='m-2 text-sm text-center text-white'>{description}</p>
            <div className='flex justify-end mr-2 p-2'>
                <button className='m-2 text-xs text-white'>See More...</button>
            </div>
        </div>
    );
}

export default Project;
