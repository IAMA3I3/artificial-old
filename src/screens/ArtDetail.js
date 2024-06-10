import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import axios from 'axios'

const ArtDetail = () => {

    const Navigate = useNavigate()

    const { id } = useParams()
    const [art, setArt] = useState({})
    const [similarArts, setSimilarArts] = useState([])

    const getArt = (id) => {
        axios.get(`http://localhost:80/artificial-api/art/${id}`)
            .then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    setArt(response.data.art)
                    getArts(response.data.art.categories.split(', '))
                } else {
                    Navigate('/')
                }
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    }

    const getArts = (cat) => {
        axios.get('http://localhost:80/artificial-api/art/get')
            .then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    checkSimilar(response.data.arts, cat)
                }
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    }

    const checkSimilar = (arts, cat) => {
        for (let i = 0; i < arts.length; i++) {
            if (arts[i].categories.split(', ').some(r => cat.includes(r))) {
                setSimilarArts(similarArts => [...similarArts, arts[i]])
            }
        }
    }

    useEffect(() => {
        setSimilarArts([])
        window.scrollTo(0, 0)
        getArt(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="">
            <div className=" w-full h-[80px] md:h-[100px] bg-gradient-to-b from-black/60 via-black/35 to-black/0"></div>
            <div className=" container">
                <div onClick={() => Navigate(-1)} className=" text-3xl cursor-pointer mb-4">
                    <IoChevronBackOutline />
                </div>
                <div className=" flex flex-col-reverse justify-between md:flex-row gap-6 mb-6">
                    <div className=" pt-4">
                        <div className=" text-3xl tracking-wider uppercase">{art.name}</div>
                        <div className=" text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2">By {art.author}</div>
                        <div className=" mb-4">{art.about}</div>
                        <div className=" mb-4"><span className=' font-semibold'>Category: </span>{art.categories}.</div>
                        <div className=" mb-4"><span className=' font-semibold'>Medium: </span>{art.medium}</div>
                        <div className=" mb-4">{(new Date(art.date)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        <div className="">
                            <div className=" mb-2 text-sm font-semibold">&#8358;{art.price && art.price.toLocaleString()}</div>
                            <button className=' bg-slate-500 dark:bg-slate-800 text-white px-8 line-through'>Buy</button>
                        </div>
                    </div>
                    <div className=" md:max-w-[70%] max-h-[80vh]">
                        <img src={`http://localhost:80/artificial-api/${art.file_path}`} className=' w-full h-full object-contain shadow-lg bg-white dark:bg-black/80 rounded' alt="" />
                    </div>
                </div>
                <div className=" mb-6">
                    <div className=" text-2xl mb-4">Similar</div>
                    <div className=" flex flex-nowrap gap-4 overflow-x-auto scrollbar small-scrollbar pb-1">
                        {
                            similarArts.map((item, index) => (
                                <div onClick={() => { Navigate(`/art_detail/${item.id}`); window.scrollTo(0, 0) }} key={index} className=" relative w-[200px] min-w-[200px] h-[250px] rounded overflow-hidden cursor-pointer group">
                                    <img src={`http://localhost:80/artificial-api/${item.file_path}`} className=' w-full h-full object-cover' alt="..." />
                                    <div className=" absolute py-4 md:py-0 px-6 md:px-0 w-full md:h-0 md:group-hover:h-full transition-all duration-500 bottom-0 bg-black/60 md:flex md:items-center overflow-hidden">
                                        <div className=" text-white tracking-wide w-full md:absolute md:top-0 md:px-6 md:group-hover:top-[50%] md:group-hover:translate-y-[-50%] md:opacity-0 md:group-hover:opacity-100 transition-all delay-300">
                                            <div className=" text-xl">{item.name}</div>
                                            <div className=" text-sm"><span className=" font-semibold">Medium: </span><span>{item.medium}</span></div>
                                            <div className=" text-sm"><span className=" font-semibold">Size: </span><span>{item.w} X {item.h}</span></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtDetail
