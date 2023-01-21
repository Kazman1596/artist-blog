import {React, useState, useRef } from 'react';
import Menu from '../components/Menu';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase'

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
        <div className='bg-black'>
            <Menu />
            <div className=''>
                <form>
                    <input 
                        type='text' 
                        name="title" 
                        id="title" 
                        placeholder="Title"
                        ref={titleRef}
                    />
                    <input
                        type='text' 
                        name='description' 
                        id='description' 
                        placeholder="Write something here..." 
                        ref={descriptionRef}
                    />
                    <button
                        disabled = {loading}
                        className='text-white' 
                        onClick={uploadPost}>
                            Upload
                    </button>
                </form>

            </div>
        </div>
    );
}
