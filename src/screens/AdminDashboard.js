import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ModeBtn from "../components/ModeBtn"
import { IoMenu, IoClose, IoSettingsOutline, IoImagesOutline } from "react-icons/io5";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import LogoB from "../assets/logo.png"
import LogoW from "../assets/logo_brand_w.png"
import Modal from "../Modal";
import AdminHome from "./subscreens/AdminHome";
import ManageArts from "./subscreens/ManageArts";
import Users from "./subscreens/Users";
import Settings from "./subscreens/Settings";

const AdminDashboard = ({ switchMode, darkMode }) => {

    const Navigate = useNavigate()
    const [user, setUser] = useState(false)
    const [expandedNav, setExpandedNav] = useState(false)
    const [currentNav, setCurrentNav] = useState(navs.dashboard)
    const [showModal, setShowModal] = useState(false)

    const getAdmin = (id) => {
        axios.get(`http://localhost:80/artificial-api/admin/${id}`)
            .then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    setUser(response.data.user)
                } else {
                    Navigate('/admin_login')
                }
            })
            .catch((error) => {
                console.log('Error:', error)
            })
    }

    const retrieveUserId = () => {
        let storedId = window.sessionStorage.getItem("artificial_user_id")
        if (storedId) {
            getAdmin(storedId)
        } else {
            getAdmin(-1)
        }
    }

    const logout = () => {
        window.sessionStorage.removeItem("artificial_user_id")
        Navigate('/admin_login')
    }

    useEffect(() => {
        retrieveUserId()
        let storedNav = window.sessionStorage.getItem("artificial_admin_nav")
        if (storedNav) {
            setCurrentNav(storedNav)
        } else {
            setCurrentNav(navs.dashboard)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.sessionStorage.setItem("artificial_admin_nav", currentNav)
    }, [currentNav])

    return (
        <>
            {
                user &&
                <div className="h-screen w-screen relative md:flex">
                    <div className={`${expandedNav ? " max-w-full" : " max-w-0 md:max-w-full"} transition-all duration-500 z-30 bg-white dark:bg-slate-900 absolute md:static md:min-w-[200px] h-full shadow-lg overflow-x-hidden overflow-y-hidden`}>
                        <div className=" h-full flex flex-col">
                            <div className=" md:hidden text-right p-2">
                                <div onClick={() => setExpandedNav(false)} className=" inline-block cursor-pointer text-2xl">
                                    <IoClose />
                                </div>
                            </div>
                            <div className=" text-center py-8">
                                <div className=" inline-block text-2xl">
                                    <FaUser />
                                </div>
                                <div className=" text-lg tracking-wide">{user.first_name}</div>
                            </div>
                            <div className=" flex-1 overflow-x-hidden overflow-y-auto scrollbar small-scrollbar">
                                <div className=" p-4">
                                    <div className="">
                                        <div onClick={() => setCurrentNav(navs.dashboard)} className={`${(currentNav === navs.dashboard) && " text-primary dark:text-primary"} flex text-nowrap flex-nowrap items-center py-1 px-4 my-4 first:mt-0 last:mb-0 font-semibold tracking-wide cursor-pointer hover:text-primary`}>
                                            <span className=" w-8"><LuLayoutDashboard /></span>
                                            <span>Dashboard</span>
                                        </div>
                                        <div onClick={() => setCurrentNav(navs.manageArts)} className={` ${(currentNav === navs.manageArts) && " text-primary dark:text-primary"} flex text-nowrap flex-nowrap items-center py-1 px-4 my-4 first:mt-0 last:mb-0 font-semibold tracking-wide cursor-pointer hover:text-primary`}>
                                            <span className=" w-8"><IoImagesOutline /></span>
                                            <span>Manage Arts</span>
                                        </div>
                                        <div onClick={() => setCurrentNav(navs.users)} className={` ${(currentNav === navs.users) && " text-primary dark:text-primary"} flex text-nowrap flex-nowrap items-center py-1 px-4 my-4 first:mt-0 last:mb-0 font-semibold tracking-wide cursor-pointer hover:text-primary`}>
                                            <span className=" w-8"><LuUsers /></span>
                                            <span>Users</span>
                                        </div>
                                        <div onClick={() => setCurrentNav(navs.settings)} className={` ${(currentNav === navs.settings) && " text-primary dark:text-primary"} flex text-nowrap flex-nowrap items-center py-1 px-4 my-4 first:mt-0 last:mb-0 font-semibold tracking-wide cursor-pointer hover:text-primary`}>
                                            <span className=" w-8"><IoSettingsOutline /></span>
                                            <span>Settings</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className=" p-4">
                                    <div onClick={() => setShowModal(true)} className={` flex text-nowrap flex-nowrap items-center py-1 px-4 my-4 first:mt-0 last:mb-0 font-semibold text-gray-600 dark:text-white/80 tracking-wide cursor-pointer hover:text-primary`}>
                                        <span className=" w-8"><FiLogOut /></span>
                                        <span>Logout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {expandedNav && <div onClick={() => setExpandedNav(false)} className=" fixed md:hidden top-0 left-0 z-20 w-screen h-screen"></div>}
                    <div className=" h-full w-full bg-gray-200 dark:bg-gray-600 relative overflow-x-hidden overflow-y-auto scrollbar">
                        <div className=" bg-slate-300 dark:bg-slate-700 flex justify-between items-center py-2 px-4 shadow-lg sticky top-0 dark:text-white">
                            <div className=" flex items-center gap-2">
                                <div onClick={() => setExpandedNav(true)} className=" md:hidden text-2xl cursor-pointer">
                                    <IoMenu />
                                </div>
                                <div onClick={() => Navigate('/')} className=" h-[20px] cursor-pointer">
                                    {
                                        darkMode ?
                                            <img src={LogoW} className=" h-full" alt="" />
                                            :
                                            <img src={LogoB} className=" h-full" alt="" />
                                    }
                                </div>
                            </div>
                            <div className="">
                                <ModeBtn switchMode={switchMode} darkMode={darkMode} />
                            </div>
                        </div>
                        <div className=" p-4 relative">
                            {(currentNav === navs.dashboard) && <AdminHome />}
                            {(currentNav === navs.manageArts) && <ManageArts />}
                            {(currentNav === navs.users) && <Users user={user} />}
                            {(currentNav === navs.settings) && <Settings user={user} />}
                        </div>
                    </div>
                </div>
            }
            {showModal && <Modal setShowModal={setShowModal} title={'LOGOUT?'} info={'Proceed to logout'} onProceed={logout} />}
        </>
    )
}

export default AdminDashboard





// navs
const navs = {
    dashboard: "dashboard",
    manageArts: "manage_arts",
    users: "users",
    settings: "settings"
}