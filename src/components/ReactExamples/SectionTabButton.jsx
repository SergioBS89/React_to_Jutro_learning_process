export default function SectionTabButton({title, children, ...props}){
    return(
        //We are getting the id from the wrap component
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}