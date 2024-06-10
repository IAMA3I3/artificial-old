import { FaRegMoon } from "react-icons/fa"
import { GoSun } from "react-icons/go"

const ModeBtn = ({ switchMode, darkMode }) => {

    return (
        <div className=" text-xl cursor-pointer hover:animate-spin-slow">
            <div onClick={switchMode}>
                {darkMode ? <GoSun /> : <FaRegMoon />}
            </div>
        </div>
    )
}

export default ModeBtn