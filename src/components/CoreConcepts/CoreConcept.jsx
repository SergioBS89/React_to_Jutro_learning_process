import { FooterCoreConcepts } from "./FooterCoreConcepts";

/**The structure HTML should be equal as the file*/
export function CoreConcept(props) {
    return (
      <li>
        <img src={props.image} alt="" />
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        {/* We can call components inside other components, and get the parameter from the father*/}
        <FooterCoreConcepts adjective={props.adjective}>Wow! this is </FooterCoreConcepts>
      </li>
    )
  }