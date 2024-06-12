import Tasks from "../tasks/Tasks"

export default function SelectedProjectView({ project, onDelete, onAddTask, onDeleteTask, tasks }) {

    const formatterDate = new Date(project.date).toLocaleTimeString('en-UD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

    return (
        <div className="w-1/2 mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600">{project.title}</h1>
                    <button onClick={onDelete} className="text-stone-100 hover:text-stone-400 hover:bg-slate-700 bg-slate-500 px-6 rounded-sm">Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{formatterDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
            </header>
            <Tasks onAddTask={onAddTask} onDeleteTask={onDeleteTask} tasks={tasks}/>
        </div>
    )
}
