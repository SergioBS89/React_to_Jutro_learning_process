import { useState } from "react"

export default function NewTask({ onAddTask }) {

  const [enteredTask, setEnteredTask] = useState('')

  function handleChange(event) {
    setEnteredTask(event.target.value)
  }

  function handleOnClick() {
    if (enteredTask.trim() === '') {
      return;
    }
    onAddTask(enteredTask)
    setEnteredTask('')
  }

  return (
    <div className="flex items-center gap-4">
      <input onChange={handleChange} defaultValue={enteredTask} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" />
      <button onClick={handleOnClick} className="text-stone-100 hover:text-stone-400 hover:bg-slate-700 bg-slate-500 px-6 rounded-sm">Add Task</button>
    </div>
  )
}
