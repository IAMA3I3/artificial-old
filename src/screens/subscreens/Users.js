import { useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import Modal from "../../Modal"
import axios from "axios"

const Users = ({ user }) => {

    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [idToDel, setIdToDel] = useState(-1)

    const handleDelete = (e, id) => {
        e.stopPropagation()
        setShowModal(true)
        setIdToDel(id)
    }

    const deleteUser = () => {
        console.log(idToDel)
        setIdToDel(-1)
    }

    const getUsers = () => {
        axios.get('http://localhost:80/artificial-api/users/get')
            .then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    setUsers(response.data.users)
                }
            })
            .catch((error) => {
                console.log('Error: ', error)
            })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            <div className="">
                <div className=" flex items-center justify-between">
                    <div className=" text-xl uppercase tracking-wide">Users</div>
                </div>
                <div className=" mt-4 w-full overflow-x-auto scrollbar small-scrollbar">
                    <table className=" w-full">
                        <thead>
                            <tr className=' bg-slate-600 dark:bg-slate-700 text-white font-semibold *:py-1 *:px-2 text-nowrap'>
                                <td>S/N</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Type</td>
                                <td className=' text-center'>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (users.length > 0) ?
                                    users.map((item, index) => (
                                        <tr key={index} className=" even:bg-slate-300 dark:even:bg-slate-700 *:py-1 *:px-2 hover:bg-slate-400x dark:hover:bg-slate-800x text-nowrap">
                                            <td>{index + 1}</td>
                                            <td>{item.first_name} {item.last_name} {(item.id === user.id) && <span className=" font-semibold">(Me)</span>}</td>
                                            <td>{item.email}</td>
                                            <td>{(item.type === 1) ? 'Admin' : 'User'}</td>
                                            <td>
                                                {
                                                    (item.type !== 1) &&
                                                    <div className=" flex items-center gap-4 justify-around text-lg">
                                                        <div onClick={(e) => handleDelete(e, item.id)} className=" cursor-pointer active:scale-95 hover:text-red-500">
                                                            <FaRegTrashAlt />
                                                        </div>
                                                    </div>
                                                }
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
            {showModal && <Modal setShowModal={setShowModal} title={'DELETE?'} info={'Proceed to delete'} onProceed={deleteUser} />}
        </>
    )
}

export default Users