import { useEffect } from 'react'
import showcase from '../assets/img/showcase.jpg'
import ListByCat from '../components/ListByCat'
import Contact from '../components/Contact'

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="w-full h-[100vh] bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("bg/showcase_bg.jpg")' }}>
                <div className=" w-full h-full bg-black/80 dark:bg-black/90 text-white flex items-end sm:items-center">
                    <div className=" container grid gap-4 grid-cols-1 md:grid-cols-2 text-center md:text-left pb-4 sm:pb-0">
                        <div className=" mb-4 md:mb-0">
                            <img src={showcase} alt="..." className=' max-w-80 md:max-w-96 rounded-3xl shadow-2xl shadow-black w-[100%] m-auto' />
                        </div>
                        <div className=" flex flex-col justify-center">
                            <div className=" text-3xl md:text-5xl text-[#D38154] mb-2">Unveiling Masterpieces</div>
                            <div className=" text-sm md:text-base italic font-semibold mb-4">Your Journey Through Art Begins Here</div>
                            <div className=" text-base md:text-xl">Step into a world where art speaks louder than words. Explore our gallary's captivating collection that celebrates creativity and inspires imagination. Welcome to a realm where every brushstroke tells a story.</div>
                        </div>
                    </div>
                </div>
            </div>

            <ListByCat />

            <Contact />
        </>
    )
}

export default Home