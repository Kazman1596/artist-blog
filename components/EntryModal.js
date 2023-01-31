import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../atom/modalAtom';
import { keyState } from '../atom/keyAtom';
import Image from 'next/image';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function EntryModal() {

    const [entries, setEntries] = useState([])
    const [open, setOpen] = useRecoilState(modalState)
    const [projectId, setProjectId] = useRecoilState(keyState)
   

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'entries'), (snapshot) => {
                setEntries(snapshot.docs)
            }
        )
    })

    const openEntry = entries.find(entry => entry.id === projectId)
    
    return (
        <div>
            {open && (
            <Modal
                className='max-w-lg w-[90%] max-h-[550px] overflow-y-scroll p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-black text-gray-100 border-2 rounded-md shadow-md focus:ring-0'
                isOpen={open}
                onRequestClose={()=>{
                    setOpen(false)
                    setProjectId(null)
                    setEntries([])
                }}
                ariaHideApp={false}
            >
                <div>
                    <Image className='rounded-[5px] pb-3' src={openEntry.data().image} width={500} height={500} alt='project_gif' />
                    <h1 className='font-labelle text-2xl text-center underline m-2'>{openEntry.data().title}</h1>
                    <p className='text-sm'>{openEntry.data().description}</p>
                </div>
            </Modal>
            )}
        </div>
    );
}
