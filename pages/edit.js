import {React, useState, useRef } from 'react';
import Menu from '../components/Menu';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase'
import { CameraAltOutlined } from '@mui/icons-material';
import Image from 'next/image';

// try {
//     const docRef = addDoc(collection(db, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }

export default function Edit() {
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

        const docRef = await addDoc(collection(db, 'events'), {
            title: titleRef.current.value,
            description: descriptionRef.current.value
        })
    }

    const titleRef = useRef(null)
    const descriptionRef = useRef(null)

    return (
        <div className='bg-black w-screen h-screen'>
            <Menu />
            <div className='flex justify-center'>
                {selectedFile ? (
                    <Image onClick={() => setSelectedFile(null)} src={selectedFile} width={300} height={300} alt='selected_image' />
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
                <input
                    className='w-[500px]'
                    type='text' 
                    name='description' 
                    id='description' 
                    placeholder="Write something here..." 
                    ref={descriptionRef}
                />
            </div>
            <div className='flex justify-center m-5'>
                <button
                    disabled = {loading}
                    className='text-white cursor-pointer border p-1 border-black hover:border-white hover:text-sky-500 duration-200' 
                    onClick={uploadPost}>
                        Upload
                </button>
            </div>
        </div>
    );
}
