import React, { useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { openModalFunc } from '../redux/generalSlice';
import Button from './Button';

const Modal = ({ title, content, onClick, btnName }) => {
    const dispatch = useDispatch()

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, []);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            dispatch(openModalFunc())
        }
    }

    return (
        <div 
            className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 backdrop-blur-sm transition-all'
            onClick={handleBackdropClick}
        >
            <div className='relative w-full max-w-xl transform rounded-lg bg-white shadow-2xl transition-all sm:w-[500px] animate-modal-enter'>
                {/* Header */}
                <div className='flex items-center justify-between border-b border-gray-200 px-6 py-4'>
                    <h3 className='text-2xl font-semibold text-gray-900'>{title}</h3>
                    <button 
                        onClick={() => dispatch(openModalFunc())}
                        className='rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none'
                    >
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className='px-6 py-4'>
                    {content}
                </div>

                {/* Footer */}
                <div className='border-t border-gray-200 px-6 py-4'>
                    <Button text={btnName} onClick={onClick}/>
                </div>
            </div>
        </div>
    )
}

export default Modal