export function TabButton({ children, isSelected, ...props }) {

    return (
        <li>
            {/* We can heredate properties from other component with ...props */}
            <button className={isSelected ? 'active' : ''} {...props}>{children}</button>
        </li>
    )
}