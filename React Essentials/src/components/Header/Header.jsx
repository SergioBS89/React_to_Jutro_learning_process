export { Header };
//We can target any image to store it in a variable, and then call it from our component
import reactImg from '../../assets/react-core-concepts.png'
//Very important to call the styles from the component
import "./Header.css"

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

function genRandomInt(max) {
    return Math.floor(Math.random() * (max + 1))
}


function Header() {
    // We can declare this variable in this block
    const description = reactDescriptions[genRandomInt(2)]
    return (<header>
        <img src={reactImg} alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
            {description} React concepts you will need for almost any app you are
            going to build!
        </p>
    </header>)
}