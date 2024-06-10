import { FaArrowUpLong } from "react-icons/fa6";

const ScrollUpBtn = ({ offset }) => {

    const scrollUp = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <div onClick={scrollUp} className={`${(offset > 0) ? ' bottom-4 visible opacity-100' : ' bottom-0 invisible opacity-0'} transition-all duration-500 z-[1000000] fixed right-4 w-[60px] h-[60px] flex justify-center items-center bg-black/10 rounded text-xl active:scale-95 cursor-pointer hover:bg-black/10 text-gray-600 hover:text-primary`}>
            <FaArrowUpLong />
        </div>
    )
}

export default ScrollUpBtn