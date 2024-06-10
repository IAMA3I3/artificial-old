import { useEffect } from "react"

const Exhibition = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="">
            <div className="w-full h-[100vh] bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("bg/showcase_bg.jpg")' }}>
                <div className=" w-full h-full bg-black/65 dark:bg-black/90 text-white flex items-center justify-center">
                    <div className=" container text-center">
                        <div className=" text-3xl md:text-5xl text-[#D38154] mb-4">Exhibition</div>
                        <div className=" text-xl md:text-3xl mb-2">Coming Soon!</div>
                        <div className="">We are currently working on the feature and will launch soon!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Exhibition