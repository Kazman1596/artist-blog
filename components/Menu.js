import { React, useState } from 'react';
import SignIn from './SignIn';
import MenuItem from './MenuItem';
import { Facebook, Instagram, CloudCircle as SoundCloud, GraphicEq as Spotify, Twitter } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil'
import { uploadModalState } from '../atom/uploadAtom';

const Menu = () => {
    const [click, setClick] = useState(false)
    const {data: session } = useSession()
    const [open, setOpen] = useRecoilState(uploadModalState)
    const permission = process.env.PERMISSIONS

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    // closeMobileMenu does not work at the moment //


    return (
        <span>
            <div onClick={handleClick} className='absolute m-5 top-5 right-0 md:hidden cursor-pointer text-gray-100 hover:text-amber-500 duration-200'>
                {click ? <MenuIcon /> : <CloseIcon /> }
            </div>
            <div className={`${click ? 'hidden' : '' } bg-black p-8 w-full`}>
                <div className='absolute right-[75px]'>
                    <SignIn />
                    {(session) ? <button className='text-white text-[.73rem] ' onClick={() => setOpen(true)}>add new post</button> : null}
                </div>
                <h1 className='font-labelle text-6xl m-5 text-gray-50 text-center'>KAZ</h1>
                <div className='justify-center items-center flex'>
                    <MenuItem onClick={closeMobileMenu} link='/' text='music'/>
                    <MenuItem onClick={closeMobileMenu} link='/' text='shows'/>
                    <MenuItem onClick={closeMobileMenu} link='/' text='travel'/>
                    <MenuItem onClick={closeMobileMenu} link='/' text='news'/>
                    <MenuItem onClick={closeMobileMenu} link='/' text='about'/>
                    <MenuItem onClick={closeMobileMenu} link='/' text='contact'/>
                </div>
                <div>
                    <div className='flex justify-center mt-10'>
                        <MenuItem onClick={closeMobileMenu} link='https://www.facebook.com/stephen.kaczmarowski/' Icon={Facebook} />
                        <MenuItem onClick={closeMobileMenu} link='/' Icon={SoundCloud} />
                        <MenuItem onClick={closeMobileMenu} link='/' Icon={Spotify} id='spotify' />
                        <MenuItem onClick={closeMobileMenu} link='/' Icon={Instagram} />
                        <MenuItem onClick={closeMobileMenu} link='/' Icon={Twitter} />
                    </div>
                </div>
            </div>
        </span>
    );
}

export default Menu;