import React from 'react';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState } from '../atom/modalAtom';
import { keyState } from '../atom/keyAtom';
import { editModalState } from '../atom/editModalAtom';
import { useSession } from 'next-auth/react'


const Project = ({img, title, description, id}) => {
    const { data: session } = useSession()
    const [ editOpen, setEditOpen ] = useRecoilState(editModalState)
    const [open, setOpen] = useRecoilState(modalState)
    const [projectId, setProjectId] = useRecoilState(keyState)

    const clickEvent = () => {
        setOpen(true)
        setProjectId(id)
    }
    
    const editClickEvent = () => {
        setEditOpen(true)
        setProjectId(id)        
    }

    return (
        <div className=''>
            <div className='flex justify-center'>
             {session && <button className='m-2 text-xs justify-center text-gray-100 hover:text-sky-500 duration-200' onClick={()=> editClickEvent()}>Edit</button> }
            </div>
            <div onClick={()=> clickEvent()} className='mb-5 rounded-[15px] max-w-2xl border-sky-700 hover:cursor-pointer scale-95 hover:scale-100 duration-200'>
                <div className='flex justify-center items-center'>
                    <Image className='p-2 rounded-[15px]' src={img} width={400} height={300} alt='test'/>
                </div>
                <h1 className='m-2 font-labelle text-center text-2xl underline text-white'>{title}</h1>
                <p className='m-2 text-sm text-center text-white truncate'>{description}</p>
                <div className='flex justify-end mr-2 p-2'>
                    <button className='m-2 text-xs text-white'>See More...</button>
                </div>
            </div>
        </div>
    );
}

export default Project;
