import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { editModalState } from '../atom/editModalAtom';
import { keyState } from '../atom/keyAtom';
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { CameraAltOutlined } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { deleteObject, getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage';

export default function EditModal() {
    const [entries, setEntries] = useState([])
    const [originalFile, setOriginalFile] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [titleEl, setTitleEl] = useState('')
    const [descriptionEl, setDescriptionEl] = useState('')
    const [loading, setLoading] = useState(false)
    const [editOpen, setEditOpen] = useRecoilState(editModalState)
    const [projectId, setProjectId] = useRecoilState(keyState)

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'entries'), (snapshot) => {
                setEntries(snapshot.docs)
            }
        )
    })

    const openEntry = entries.find(entry => entry.id === projectId)

    function addImageToPost(e) {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    async function updatePost() {

        setLoading(true)

        //Updating the title and description

        const docRef = await updateDoc(doc(db, 'entries', openEntry.id), {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            updatedAt: serverTimestamp()
        })

        
        if (selectedFile !== originalFile) {
            
            //Adding new image to storage

            const imageRef = ref(storage, `entries/${openEntry.id}/image`)

            //Updating new Image URL

            uploadString(imageRef, selectedFile, 'data_url').then(
                async(snapshot) => {
                    const downloadURL = await getDownloadURL(imageRef)
                    await updateDoc(doc(db, 'entries', openEntry.id), {
                        image: downloadURL,
                    })
                }
            )

        }

        
        setLoading(false)
        setEditOpen(false)
    }

    async function deletePost() {
        
        setLoading(true)

        deleteObject(ref(storage, `entries/${openEntry.id}/image`))
        
        await deleteDoc(doc(db, 'entries', openEntry.id))

        setLoading(false)
        setEditOpen(false)
    }

    const titleRef = useRef(null)
    const descriptionRef = useRef(null)
    const filePickerRef = useRef(null)

    return (
        <div>
            {editOpen && 
                <Modal
                    className='max-w-xl w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] rounded-md shadow-lg focus:ring-0 bg-black'
                    isOpen={editOpen}
                    onAfterOpen={() => {
                        setTitleEl(openEntry.data().title)
                        setDescriptionEl(openEntry.data().description)
                        setOriginalFile(openEntry.data().image)
                        setSelectedFile(openEntry.data().image)
                    }}
                    onRequestClose={() => {
                        setEditOpen(false);
                        setProjectId(null)
                        setSelectedFile(null)
                        setLoading(false)
                    }}
                    ariaHideApp={false}
                >
                    <div className='flex justify-center'>
                        {selectedFile ? (
                            <Image className='w-auto max-h-[300px] object-cover cursor-pointer' onClick={() => setSelectedFile(null)} src={selectedFile} width={300} height={300} alt='selected_image' />
                        ) : (<CameraAltOutlined onClick={() => filePickerRef.current.click()} className='text-5xl m-2 p-1 text-white cursor-pointer border border-black hover:border-white hover:text-sky-500 duration-200' />)}
                        <input type='file' hidden ref={filePickerRef} onChange={addImageToPost} />
                    </div>
                    <h1 className='text-white font-labelle text-2xl text-center m-2'>{openEntry?.data().title}</h1>
                    <div className='flex justify-center m-5'>
                        <input 
                            className='w-[400px]'
                            type='text' 
                            name="title"
                            id="title" 
                            placeholder="Title"
                            value={titleEl}
                            onChange={(e) => setTitleEl(e.target.value)}
                            ref={titleRef}
                        />
                    </div>
                    <div className='flex justify-center m-5'>
                        <textarea
                            className='w-[500px] h-[250px]'
                            name='description'
                            id='description' 
                            placeholder="Write something here..." 
                            value={descriptionEl}
                            onChange={(e) => setDescriptionEl(e.target.value)}
                            ref={descriptionRef}
                        />
                    </div>
                    {!loading ? (
                        <div className='text-white flex justify-center'>
                            <button className='m-5' onClick={() => updatePost()}> Save Changes </button>
                            <button className='m-5' onClick={() => deletePost()}> Delete </button>
                        </div>
                     ) : (
                        <div className='flex text-white justify-center'>
                            <CircularProgress color='success' />
                        </div>
                    )}
                    
                    

                </Modal>
            }
        </div>
    );
}
