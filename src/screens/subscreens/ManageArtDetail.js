import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import { CgUnavailable } from "react-icons/cg";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import Modal from "../../Modal";

const ManageArtDetail = () => {

    const Navigate = useNavigate()
    const { id } = useParams()

    const [art, setArt] = useState({})
    const [showSoldModal, setShowSoldModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const updateStatus = () => {
        axios.put(`http://localhost:80/artificial-api/art/${id}/sold`)
            .then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    window.location.reload()
                }
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    }

    const deleteArt = () => {

        axios.delete(`http://localhost:80/artificial-api/art/${id}/delete`)
            .then((response) => {
                // console.log(response.data)

                if (response.data.success) {
                    Navigate('/admin_dashboard')
                }
            })
            .catch((error) => {
                console.log('Error:', error)
            })
    }

    const retrieveUserId = () => {
        let storedId = window.sessionStorage.getItem("artificial_user_id")
        if (!storedId) {
            Navigate('/admin_dashboard')
        } else {
            getArt(id)
        }
    }

    const getArt = (id) => {
        axios.get(`http://localhost:80/artificial-api/art/${id}`)
            .then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    setArt(response.data.art)
                } else {
                    Navigate('/admin_dashboard')
                }
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    }

    useEffect(() => {
        retrieveUserId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className=" container py-4">
                <div className=" flex gap-4 items-center justify-between mb-4">
                    <div onClick={() => Navigate(-1)} className=" text-3xl cursor-pointer">
                        <IoIosArrowBack />
                    </div>
                    <div className=" text-center">
                        <div className=" text-lg md:text-3xl font-semibold">{art.title}</div>
                        <div className=" font-semibold text-gray-500 dark:text-gray-300">By {art.author}</div>
                    </div>
                    <div className=""></div>
                </div>

                <div className=" flex flex-col md:flex-row gap-8">
                    <div className=" w-full">
                        <img src={`http://localhost:80/artificial-api/${art.file_path}`} className=" w-full" alt="" />
                    </div>
                    <div className=" w-full">
                        <div className=" mb-4"><span className=" text-lg font-semibold tracking-wide">About:</span> {art.about}</div>
                        <div className=" mb-4"><span className=" text-lg font-semibold tracking-wide">Medium:</span> {art.medium}</div>
                        <div className=" mb-4"><span className=" text-lg font-semibold tracking-wide">Size:</span> {art.w} X {art.h}</div>
                        <div className=" mb-4">
                            <div className=" text-lg font-semibold tracking-wide">Categories:</div>
                            <div className=" flex gap-2 flex-wrap">
                                {
                                    art.categories &&
                                    art.categories.split(', ').map((item, index) => (
                                        <div key={index} className=" text-nowrap py-1 px-3 rounded bg-slate-300 dark:text-gray-700">{item}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className=" mb-4"><span className=" text-lg font-semibold tracking-wide">Date:</span> {(new Date(art.date)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                        <div className=" mb-4"><span className=" text-lg font-semibold tracking-wide">Price:</span> &#8358; {art.price && art.price.toLocaleString()}</div>
                        <div className=" mb-4">
                            <span className=" text-lg font-semibold tracking-wide">Status: </span>
                            <span className={`${(art.sold === 1) ? " text-red-500" : " text-green-500"} font-semibold text-xs`}>{(art.sold === 1) ? "SOLD" : "AVAILABLE"}</span>
                        </div>
                        <div className=" flex flex-col sm:flex-row sm:justify-between gap-4">
                            {
                                (art.sold === 1) ?
                                    <button className=" flex items-center gap-2 font-semibold border-2 text-slate-700 dark:text-slate-300 border-slate-700 dark:border-slate-300 line-through active:scale-100"><CgUnavailable /><span>Sold</span></button>
                                    :
                                    <button onClick={() => setShowSoldModal(true)} className=" flex items-center gap-2 font-semibold border-2 text-slate-700 dark:text-slate-300 border-slate-700 dark:border-slate-300 hover:bg-slate-700 dark:hover:bg-slate-300 hover:text-white dark:hover:text-gray-700"><CgUnavailable /><span>Sold</span></button>
                            }
                            <button onClick={() => Navigate(`/edit_art/${id}`)} className=" flex items-center gap-2 font-semibold border-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"><FaRegEdit /><span>Edit</span></button>
                            <button onClick={() => setShowDeleteModal(true)} className=" flex items-center gap-2 font-semibold border-2 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"><FaRegTrashAlt /><span>Delete</span></button>
                        </div>
                    </div>
                </div>
            </div>
            {showSoldModal && <Modal setShowModal={setShowSoldModal} title={'SOLD?'} info={'Update status to sold'} onProceed={updateStatus} />}
            {showDeleteModal && <Modal setShowModal={setShowDeleteModal} title={'DELETE?'} info={'Proceed to delete this art'} onProceed={deleteArt} />}
        </>
    )
}

export default ManageArtDetail