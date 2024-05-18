import { CORE_CONCEPTS } from "../../data";
import { CoreConcept } from "./CoreConcept";


export function CoreConceptsSection(){
    return(
        <section id="core-concepts">
          <h2>Core concepsts</h2>
          <ul>
            {/* {/* We can set in here the properties of our component
            <CoreConceps
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
              adjective="Cool"
            />
            {/*We can use a shortcode if we have the data stored in a file as data.js
            <CoreConceps {...CORE_CONCEPTS[1]} />
            <CoreConceps {...CORE_CONCEPTS[2]} />
            <CoreConceps {...CORE_CONCEPTS[3]} /> */}

            {/* Definetely the best way to print many objects in a component is using .map() */}
            {CORE_CONCEPTS.map((conceptItems) => (
              <CoreConcept key={conceptItems.title} {...conceptItems} />
            ))}
          </ul>
        </section>
    )
}