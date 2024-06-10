import { useNavigate } from "react-router-dom"

const ArtList = ({ mode, arts }) => {

    const Navigate = useNavigate()

    return (
        <>
            {
                (arts.length > 0) ?
                    <div className=" columns-1 sm:columns-2 md:columns-3 mt-4">
                        {
                            arts.map((art, index) => (
                                <div onClick={() => Navigate(`/art_detail/${art.id}`)} key={index} className={`${((art.categories.includes(mode)) || mode === 'All') && "show"} art-item group relative  mb-4 bg-gradient-to-br from-black/50 via-black/10 to-black/50 rounded overflow-hidden shadow-lg shadow-black/60 cursor-pointer transition`} id="">
                                    <div className="">
                                        <img src={`http://localhost:80/artificial-api/${art.file_path}`} alt="..." />
                                    </div>
                                    <div className=" absolute py-4 md:py-0 px-6 md:px-0 w-full md:h-0 md:group-hover:h-full transition-all duration-500 bottom-0 bg-black/60 md:flex md:items-center overflow-hidden">
                                        <div className=" text-white tracking-wide w-full md:absolute md:top-0 md:px-6 md:group-hover:top-[50%] md:group-hover:translate-y-[-50%] md:opacity-0 md:group-hover:opacity-100 transition-all delay-300">
                                            <div className=" text-xl">{art.name}</div>
                                            <div className=" text-sm"><span className=" font-semibold">Medium: </span><span>{art.medium}</span></div>
                                            <div className=" text-sm"><span className=" font-semibold">Size: </span><span>{art.w} X {art.h}</span></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className=" text-center font-semibold text-gray-500 py-20 text-xl">No Art Yet</div>
            }
        </>
    )
}

export default ArtList