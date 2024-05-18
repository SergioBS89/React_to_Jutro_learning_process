import { EXAMPLES } from "../../data";

export default function ExamplesCode({selectedtopic}) {
    return (
        <div id="tab-content">
            <h3>{EXAMPLES[selectedtopic].title}</h3>
            <p>{EXAMPLES[selectedtopic].description}</p>
            <pre>
                <code id="code">
                    {EXAMPLES[selectedtopic].code}
                </code>
            </pre>
        </div>)
}