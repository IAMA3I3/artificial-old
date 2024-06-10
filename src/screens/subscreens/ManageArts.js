import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { FaRegTrashAlt, FaEdit } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Modal from "../../Modal"

const ManageArts = () => {

    const Navigate = useNavigate()

    const [arts, setArts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [idToDel, setIdToDel] = useState(-1)

    const handleEdit = (e, id) => {
        e.stopPropagation()
        Navigate(`/edit_art/${id}`)
    }

    const handleDelete = (e, id) => {
        e.stopPropagation()
        setShowModal(true)
        setIdToDel(id)
    }

    const deleteArt = () => {
        
        axios.delete(`http://localhost:80/artificial-api/art/${idToDel}/delete`)
            .then((response) => {
                // console.log(response.data)

                if (response.data.success) {
                    window.location.reload()
                }
            })
            .catch((error) => {
                console.log('Error:', error)
            })

        setIdToDel(-1)
    }

    const getArts = () => {
        axios.get('http://localhost:80/artificial-api/art/get')
            .then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    setArts(response.data.arts)
                }
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    }

    useEffect(() => {
        getArts()
    }, [])

    return (
        <>
            <div className="">
                <div className=" flex items-center justify-between">
                    <div className=" text-xl uppercase tracking-wide">Manage Arts</div>
                    <button onClick={() => Navigate('/add_art')} className=' flex items-center gap-2 bg-blue-500 text-white hover:bg-blue-600'>
                        <span><MdOutlineAddPhotoAlternate /></span>
                        <span>Add Art</span>
                    </button>
                </div>
                <div className=" mt-4 w-full overflow-x-auto scrollbar small-scrollbar">
                    <table className=' w-full'>
                        <thead>
                            <tr className=' bg-slate-600 dark:bg-slate-700 text-white font-semibold *:py-1 *:px-2 text-nowrap'>
                                <td>S/N</td>
                                <td>DP</td>
                                <td>Title</td>
                                <td>Author</td>
                                <td>Size</td>
                                <td>Status</td>
                                <td>Price</td>
                                <td className=' text-center'>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (arts.length > 0) ?
                                arts.map((item, index) => (
                                    <tr onClick={() => Navigate(`/manage_art_detail/${item.id}`)} key={index} className=' even:bg-slate-300 dark:even:bg-slate-700 *:py-1 *:px-2 hover:bg-slate-400 dark:hover:bg-slate-800 text-nowrap' >
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className=" rounded w-[60px] h-[60px] overflow-hidden">
                                                <img src={`http://localhost:80/artificial-api/${item.file_path}`} className=' w-full h-full object-cover' alt="" />
                                            </div>
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.author}</td>
                                        <td>{item.w} X {item.h}</td>
                                        <td>
                                            <div className={`${(item.sold === 1) ? " text-red-500" : " text-green-500"} font-semibold text-xs`}>{(item.sold === 1) ? "SOLD" : "AVAILABLE"}</div>
                                        </td>
                                        <td>&#8358; {item.price.toLocaleString()}</td>
                                        <td>
                                            <div className=" flex items-center gap-4 justify-around text-lg">
                                                <div onClick={(e) => handleEdit(e, item.id)} className=" cursor-pointer active:scale-95 hover:text-blue-500">
                                                    <FaEdit />
                                                </div>
                                                <div onClick={(e) => handleDelete(e, item.id)} className=" cursor-pointer active:scale-95 hover:text-red-500">
                                                    <FaRegTrashAlt />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan={10000} className=" text-center py-6 text-lg font-bold text-gray-500 dark:text-gray-300">Empty</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {showModal && <Modal setShowModal={setShowModal} title={'DELETE?'} info={'Proceed to delete'} onProceed={deleteArt} />}
        </>
    )
}

export default ManageArts
