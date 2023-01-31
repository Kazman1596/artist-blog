import {React, useState, useRef } from 'react';
import Modal from 'react-modal'
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase'
import { CameraAltOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { uploadModalState } from '../atom/uploadAtom'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { CircularProgress } from '@mui/material';




export default function UploadModal() {
    const [open, setOpen] = useRecoilState(uploadModalState)
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    
    function addImageToPost(e) {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }
    
    const filePickerRef = useRef(null)

    async function uploadPost() {

        if(loading) return;

        setLoading(true)

        const docRef = await addDoc(collection(db, 'entries'), {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `entries/${docRef.id}/image`)

        //Retrieving the Image URL & updating docRef to have imageURL //

        await uploadString(imageRef, selectedFile, 'data_url').then(
            async(snapshot) => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db, 'entries', docRef.id), {
                    image: downloadURL,
                })
            }
        )

        setOpen(false)
        setLoading(false)
        setSelectedFile(null)
       
    }

    const titleRef = useRef(null)
    const descriptionRef = useRef(null)

    return (
        <div className=''>
            {open && (
                <Modal
                    className='max-w-xl w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] rounded-md shadow-lg focus:ring-0 bg-black'
                    isOpen={open}
                    onRequestClose={() => {
                        setOpen(false)
                        setSelectedFile(null)
                    }}
                    ariaHideApp={false}
                >
                    <div className='flex justify-center'>
                        {selectedFile ? (
                            <Image className='w-auto max-h-[300px] object-cover cursor-pointer' onClick={() => setSelectedFile(null)} src={selectedFile} width={300} height={300} alt='selected_image' />
                        ) : (<CameraAltOutlined onClick={() => filePickerRef.current.click()} className='text-5xl m-2 p-1 text-white cursor-pointer border border-black hover:border-white hover:text-sky-500 duration-200' />)}
                        <input type='file' hidden ref={filePickerRef} onChange={addImageToPost} />
                    </div>
                    <div className='flex justify-center m-5'>
                        <input 
                            className='w-[400px]'
                            type='text'
                            name="title" 
                            id="title" 
                            placeholder="Title"
                            ref={titleRef}
                        />
                    </div>
                    <div className='flex justify-center m-5'>
                        <textarea
                            className='w-[500px] h-[250px] text-sm'
                            name='description' 
                            id='description'
                            placeholder="Write something here..." 
                            ref={descriptionRef}
                        />
                    </div>
                    {!loading ? (
                        <div className='flex justify-center m-5'>
                            <button
                                className='text-white cursor-pointer border p-1 border-black hover:border-white hover:text-sky-500 duration-200' 
                                onClick={uploadPost}>
                                Upload
                            </button>
                        </div>
                     ) : (
                        <div className='flex text-white justify-center'>
                            <CircularProgress color='inherit' />
                        </div>
                    )}
                </Modal>
            )}
            
        </div>
    );
}
