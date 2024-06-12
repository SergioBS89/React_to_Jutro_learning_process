import { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button';

const Modal = forwardRef(function ModalValidations({ children, buttonCaption }, ref) {
    const dialog = useRef()

    useImperativeHandle(ref, () => {
        return {
            openModal() {
                dialog.current.showModal();//provided by js 
            }
        }
    });

    return createPortal(
        <dialog ref={dialog} className='backdrop:bg-stone-900/90 rounded-md shadow-md p-4'>
            {children}
            <form method='dialog' className='mt-4 text-right '>
                <Button label={buttonCaption}/>
            </form>
        </dialog>, document.getElementById('modal-root')
    )
});

export default Modal;
