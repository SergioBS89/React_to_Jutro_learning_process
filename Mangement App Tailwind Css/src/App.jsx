import { useState } from 'react';
import NewProject from './components/projects/NewProject';
import NoProjectSelected from './components/projects/NoProjectSelected';
import Sidebar from './components/Sidebar';
import SelectedProjectView from './components/projects/SelectedProjectView';

function App() {

  const [existingProjects, setExistingProjects] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  /**
 * Function to create a new project and return the whole historic of project into an array
 * @param {*} projectData values entered by the user
 */
  const handleNewAddProject = (projectData) => {
    setExistingProjects(prevState => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  };

  /**
   * Cancel the form to add a new project
   */
  function handleCancel() {
    setExistingProjects(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    })
  }

  /**
 * Take the project selected in sidebar
 */
  function handleSelectedProject(id) {
    setExistingProjects(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    })
  }

  /**
   * Delete project from the sidebar
   */
  function handleDeleteProject() {
    setExistingProjects(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        //With filter we can drop the project which has the same id as the selected one
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      };
    });
  }

  function handleAddTask(task) {
    setExistingProjects(prevState => {
      const taskId = Math.random()
      const newTask = {
        id: taskId,
        projectId: prevState.selectedProjectId,
        text: task
      };
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask]
      };
    });
  }

  function handleDeleteTask(id) {
    setExistingProjects(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id)
      };
    });
  }

  //.find() is a JS method to find an element whithin the array
  const selectedProject = existingProjects.projects.find((project) => project.id === existingProjects.selectedProjectId)

  let content = <SelectedProjectView
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={existingProjects.tasks} />;

  /**
   * Function to set the State of the application to hide or display projects
   * @param {*} setExistingProjects 
   */
  const handleStartingProjects = () => {
    setExistingProjects(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    })
  };





  /**
   * We are displaying a different component depending which state has the hook 
   */
  if (existingProjects.selectedProjectId === null) {
    content = <NewProject addNewProject={handleNewAddProject} cancelProject={handleCancel} />
  } else if (existingProjects.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartingProjects} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onStartAddProject={handleStartingProjects}
        listProjects={existingProjects.projects}
        onSelectedProject={handleSelectedProject} 
        selectedProjectID={existingProjects.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
