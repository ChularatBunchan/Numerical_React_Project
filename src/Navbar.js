export default function Navbar() {
    return (
        <>
            <h2>Numerical Project</h2>
            <nav className="nav">
                <ul>
                    <Link href="./Root" className="active"> Root of Equation </Link>
                    <Link href="./Linear"> Linear Algebra Equation </Link>
                    <Link href="./Interpolation">Interpolation and Extrapolation</Link>
                </ul>
            </nav>
        </>

    )
}

function Link({href ,children , ...props}){
    const path = window.location.pathname
    return(
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props}>{children}</a>
        </li>
    )
}