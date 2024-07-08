import {Link} from "react-router-dom"

export function ButtonWarning({label,linkText,to}){
    return(
        <div className="flex py-2 text-sm justify-center">
            <div>
                {label}
            </div>
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>
                {linkText}
            </Link>
        </div>
    )
}