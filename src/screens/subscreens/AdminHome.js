import { FiUsers } from "react-icons/fi";
import { FaRegImages } from "react-icons/fa6";
import { useEffect, useState } from "react"
import axios from "axios"

const AdminHome = () => {

    const [users, setUsers] = useState([])
    const [arts, setArts] = useState([])

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
        getUsers()
        getArts()
    }, [])

    return (
        <div className="">
            <div className=" text-xl uppercase tracking-wide mb-2">Dashboard</div>
            <div className=" flex gap-4 flex-wrap">
                <div className=" p-4 rounded-lg bg-white dark:bg-slate-900 min-w-[200px] w-full sm:w-auto border-2 border-slate-300">
                    <div className=" text-3xl rounded-full w-[60px] h-[60px] flex justify-center items-center bg-slate-300 text-primary mb-2"><FiUsers /></div>
                    <div className=" text-4xl font-semibold">{users.length}</div>
                    <div className=" font-semibold text-gray-500 dark:text-gray-300">Total Users</div>
                </div>
                <div className=" p-4 rounded-lg bg-white dark:bg-slate-900 min-w-[200px] w-full sm:w-auto border-2 border-slate-300">
                    <div className=" text-3xl rounded-full w-[60px] h-[60px] flex justify-center items-center bg-slate-300 text-primary mb-2"><FaRegImages /></div>
                    <div className=" text-4xl font-semibold">{arts.length}</div>
                    <div className=" font-semibold text-gray-500 dark:text-gray-300">Total Arts</div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome