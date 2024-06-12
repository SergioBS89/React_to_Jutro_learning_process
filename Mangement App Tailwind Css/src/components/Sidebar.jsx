export default function Sidebar({ onStartAddProject, listProjects, onSelectedProject, selectedProjectID }) {

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your projects</h2>
            <div>
                <button onClick={onStartAddProject} className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 hover:bg-stone-600 hover:text-stone-100">+ Add Project</button>
            </div>
            <ul className="mt-8">
                {listProjects.map((project) => {
                    let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200"
                    //If the selected project is equal to the element of the array, we change the styles
                    if(project.id === selectedProjectID){
                        cssClasses += ' bg-stone-800 text-stone-200'
                    }else{
                        cssClasses += ' text-stone-400'
                    }

                    return (<li key={project.id}>
                        <button className={cssClasses}
                            onClick={() => onSelectedProject(project.id)}>
                            {project.title}
                        </button>
                    </li>)
                }
                )}
            </ul>
        </aside>
    )
}