import { forwardRef } from "react"

// eslint-disable-next-line react/prop-types
const InputNewProject = forwardRef(function InputNewProject({ label, isTextArea, ...props }, ref) {

  const classInput = 'w-full p-1 boder-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:ring focus:ring-stone-400'

  return (
    <p className='flex flex-col gap-1 my-4'>
      <label className='text-sm font-bold uppercase text-stone-500'>{label}</label>
      {!isTextArea ?
        <input ref={ref} className={classInput} {...props} /> :
        <textarea ref={ref} className={classInput} {...props} />}
    </p>
  )
})
export default InputNewProject;
