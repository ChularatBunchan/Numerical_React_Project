import Bisection from "./Root/Bisection"
import False from "./Root/False"
import Onep from "./Root/Onep"
import Newton from "./Root/Newton"
import Secant from "./Root/Secant"

export default function Root() {
    return (
        <>
            <center>
            <h3>Bisection Method</h3>
                <Bisection />
            <hr />
            <h3>False position Method</h3>
                <False />
            <hr />
            <h3>One point Method</h3>
                <Onep />
            <hr />
            <h3>Newton rapson Method</h3>
                <Newton />
            <hr />
            <h3>Secant Method</h3>
                <Secant />
            <hr />
            </center>
        </>
)}