import React from 'react';
import Modal from 'react-modal'
import {useRecoilState, useRecoilValue} from 'recoil'
import { modalState } from '../atom/projectAtom';
import { keyState } from '../atom/keyAtom';
import { entryArray } from '../project_data/test_entries';
import Image from 'next/image';

export default function EntryModal() {
    
    const [open, setOpen] = useRecoilState(modalState)
    const [entryId, setEntryId] = useRecoilState(keyState)
    const openEntry = entryArray.find(entry => entry.id === entryId)
    
    return (
        <div>
            {open && (
            <Modal
                className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md focus:ring-0'
                isOpen={open}
                onRequestClose={()=>{
                    setOpen(false)
                    setEntryId(null)
                }}
                ariaHideApp={false}
            >
                <div>
                    <Image className='rounded-[5px] pb-3' src={openEntry.img} width={500} height={500} alt='project_gif' />
                    <h1 className='font-labelle text-2xl text-center m-2'>{openEntry.title}</h1>
                    <p className='text-sm'>{openEntry.description}</p>
                </div>
                
            </Modal>
            )}
        </div>
    );
}

// Things to work on in the future:

//      - ariaHideApp={false} is not recommended. ComponentWillMount may be
//          required to let the Modal know what to attach itself to.

//      - The WAR: Cannot register Modal instance while it is already open
//      most likely has to do with the conditional rendering of the modal itself,
//      rather than letting isOpen{open} take care of the modal.

// Would love to destructure openProject (when it is undefined)
// For now, I am going to leave as is to continue with the bulk of my application.
