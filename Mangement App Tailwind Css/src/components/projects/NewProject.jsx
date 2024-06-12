import { useRef } from 'react'
import InputNewProject from './InputNewProject'
import ModalValidations from '../ModalValidations'
import Button from '../Button'

export default function NewProject({ addNewProject, cancelProject }) {
    const title = useRef()
    const description = useRef()
    const date = useRef()
    const myModalRefValidator = useRef()

    function handleValidationsBeforeSaving() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDate = date.current.value;

        if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDate.trim() === '') {
            myModalRefValidator.current.openModal()
            //We stop the execution in this point
            return;
        }

        addNewProject({
            title: enteredTitle,
            description: enteredDescription,
            date: enteredDate,
        })
    }
    return (
        <>
            {/* This ref takes all the information from Modal using imperative */}
            <ModalValidations ref={myModalRefValidator} buttonCaption="Close">
                <h2 className='text-xl font-bold text-stone-500 mt-4 my-4'>Please enter a Project...</h2>
                <p className='text-stone-400 mb-4'>All the fiels should be refilled before saving the project</p>
            </ModalValidations>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li><button className='text-stone-800 hover:text-stone-950' onClick={cancelProject}>
                        Cancel
                    </button>
                    </li>
                    <li>
                        <Button label="Save" onClick={handleValidationsBeforeSaving} />
                    </li>
                </menu>
                <div>
                    <InputNewProject type="text" ref={title} label="Title" />
                    {/* An implicit way to send a property true (isTextArea) */}
                    <InputNewProject ref={description} label="Description" isTextArea />
                    <InputNewProject type="date" ref={date} label="Due Date" />
                </div>
            </div>
        </>
    )
}
