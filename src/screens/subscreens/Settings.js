import { IoPerson, IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const Settings = ({ user }) => {

    const [showEditProfile, setShowEditProfile] = useState(false)
    const [showChangePwd, setShowChangePwd] = useState(false)
    const [showDel, setShowDel] = useState(false)
    const [showCPwd, setShowCPwd] = useState(false)
    const [showNPwd, setShowNPwd] = useState(false)
    const [showRePwd, setShowRePwd] = useState(false)
    const [showDelPwd, setShowDelPwd] = useState(false)
    const [editProfileInputs, setEditProfileInputs] = useState(editProfileInputFields)
    const [editProfileErrors, setEditProfileErrors] = useState([])
    const [changePwdInputs, setChangePwdInputs] = useState(changePwdInputFields)
    const [changePwderrors, setChangePwdErrors] = useState([])
    const [delPwdInput, setDelPwdInput] = useState({ user_id: user.id, del_pwd: "" })

    const handleShowEditProfile = () => {
        setEditProfileInputs({ ...editProfileInputs, [editProfileField.first_name]: user.first_name, [editProfileField.last_name]: user.last_name })
        setShowEditProfile(true)
    }

    const toggleShowCPwd = () => {
        setShowCPwd(!showCPwd)
    }

    const toggleShowNPwd = () => {
        setShowNPwd(!showNPwd)
    }

    const toggleShowRePwd = () => {
        setShowRePwd(!showRePwd)
    }

    const toggleShowDelPwd = () => {
        setShowDelPwd(!showDelPwd)
    }

    const handleCloseEditProfile = () => {
        setShowEditProfile(false)
        setEditProfileInputs(editProfileInputFields)
        setEditProfileErrors([])
    }

    const handleCloseChangePwd = () => {
        setShowChangePwd(false)
        setChangePwdInputs(changePwdInputFields)
        setChangePwdErrors([])
    }

    const handleCloseDel = () => {
        setShowDel(false)
        setDelPwdInput({ user_id: user.id, del_pwd: "" })
    }

    const handleEditProfileChange = (e) => {
        const { name } = e.target
        const { value } = e.target

        setEditProfileInputs({ ...editProfileInputs, [name]: value })
    }

    const handleChangePwdInputChange = (e) => {
        const { name } = e.target
        const { value } = e.target

        setChangePwdInputs({ ...changePwdInputs, [name]: value })
    }

    const handleDelPwdChange = (e) => {
        const { name } = e.target
        const { value } = e.target

        setDelPwdInput({ ...delPwdInput, [name]: value })
    }

    const handleEditProfileSubmit = (e) => {
        e.preventDefault()

        let errCheck = validateEditProfile(editProfileInputs)

        setEditProfileErrors(errCheck.errors)

        if (!errCheck.hasError) {
            // console.log(editProfileInputs)

            axios.put(`http://localhost:80/artificial-api/users/${user.id}/edit`, editProfileInputs)
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
    }

    const handleChangePwdSubmit = (e) => {
        e.preventDefault()

        let errCheck = validateChangePwd(changePwdInputs)

        setChangePwdErrors(errCheck.errors)

        if (!errCheck.hasError) {
            // console.log(changePwdInputs)

            axios.put(`http://localhost:80/artificial-api/users/${user.id}/pwd`, changePwdInputs)
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
    }

    const handleDelSubmit = (e) => {
        e.preventDefault()

        // console.log(delPwdInput)

        axios.post('http://localhost:80/artificial-api/users/delete', delPwdInput)
            .then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    window.location.reload()
                }
            })
            .catch((error) => {
                console.log('Error:', error)
            })
    }

    return (
        <>
            <div className=" py-6">
                <div className=" text-center">
                    <div className=" inline-block text-5xl"><IoPerson /></div>
                    <div className=" text-2xl tracking-wide font-semibold">{user.first_name} {user.last_name}</div>
                    <div className=" font-semibold text-gray-500 dark:text-gray-300">{user.email}</div>
                </div>
                <div className=" mt-6 flex flex-col sm:flex-row sm:justify-center gap-8 *:w-full sm:*:w-[250px]">
                    <button onClick={handleShowEditProfile} className=" font-semibold bg-slate-500 text-white border-2 border-slate-500 hover:bg-slate-700 hover:border-slate-700 flex items-center justify-center gap-2 overflow-hidden"><FaRegEdit /> <span className=" truncate">Edit Profile</span></button>
                    <button onClick={() => setShowChangePwd(true)} className=" font-semibold border-2 border-slate-500 dark:border-slate-300 text-slate-500 dark:text-slate-300 hover:bg-slate-700 hover:border-slate-700 hover:text-white flex items-center justify-center gap-2 overflow-hidden"><RiLockPasswordLine /> <span className=" truncate">Change Password</span></button>
                </div>
                <div className=" mt-8 flex justify-center">
                    <button onClick={() => setShowDel(true)} className=" w-full sm:w-[250px] border-2 border-red-500 text-red-500 flex gap-2 items-center justify-center hover:bg-red-500 hover:text-white font-semibold overflow-hidden"><AiOutlineUserDelete /><span className=" truncate">Delete Account</span></button>
                </div>
            </div>
            {
                showEditProfile &&
                <div className=" absolute top-0 left-0 w-full h-[90vh] flex justify-center items-center">
                    <div className=" relative w-[95%] max-w-[400px] rounded-lg bg-white/80 dark:bg-black/60 backdrop-blur-sm p-4 shadow-lg">
                        <div onClick={() => handleCloseEditProfile()} className=" absolute top-4 right-4 text-2xl cursor-pointer hover:text-red-500"><IoClose /></div>
                        <div className=" text-center text-xl font-semibold tracking-wide mb-2">EDIT PROFILE</div>
                        <form onSubmit={(e) => handleEditProfileSubmit(e)} action="">
                            <div className=" flex flex-col my-2">
                                <label className=" text-sm font-semibold" htmlFor="first-name">First Name</label>
                                <input onChange={(e) => handleEditProfileChange(e)} type="text" name={editProfileField.first_name} id="first-name" value={editProfileInputs.first_name ?? ''} />
                                {editProfileErrors[editProfileField.first_name] && <div className=" text-red-500 text-sm font-semibold">{editProfileErrors[editProfileField.first_name]}</div>}
                            </div>
                            <div className=" flex flex-col my-2">
                                <label className=" text-sm font-semibold" htmlFor="last-name">Last Name</label>
                                <input onChange={(e) => handleEditProfileChange(e)} type="text" name={editProfileField.last_name} id="last-name" value={editProfileInputs.last_name ?? ''} />
                                {editProfileErrors[editProfileField.last_name] && <div className=" text-red-500 text-sm font-semibold">{editProfileErrors[editProfileField.last_name]}</div>}
                            </div>
                            <div className=" mt-4">
                                <button className=" w-full bg-slate-500 dark:bg-slate-700 text-white hover:bg-slate-800" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {
                showChangePwd &&
                <div className=" absolute top-0 left-0 w-full h-[90vh] flex justify-center items-center">
                    <div className=" relative w-[95%] max-w-[400px] rounded-lg bg-white/80 dark:bg-black/60 backdrop-blur-sm p-4 shadow-lg">
                        <div onClick={handleCloseChangePwd} className=" absolute top-4 right-4 text-2xl cursor-pointer hover:text-red-500"><IoClose /></div>
                        <div className=" text-center text-xl font-semibold tracking-wide mb-2">CHANGE PASSWORD</div>
                        <form onSubmit={handleChangePwdSubmit} action="">
                            <div className=" flex flex-col my-2">
                                <label className=" text-sm font-semibold" htmlFor="c-pwd">Current Password</label>
                                <div className=" relative">
                                    <input type={showCPwd ? "text" : "password"} name={changePwdField.current_pwd} id="c-pwd" className=" w-full pr-10" onChange={handleChangePwdInputChange} />
                                    <div onClick={() => toggleShowCPwd()} className=" absolute top-[50%] right-4 -translate-y-[50%] cursor-pointer">
                                        {showCPwd ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </div>
                                </div>
                                {changePwderrors[changePwdField.current_pwd] && <div className=" text-red-500 text-sm font-semibold">{changePwderrors[changePwdField.current_pwd]}</div>}
                            </div>
                            <div className=" flex flex-col my-2">
                                <label className=" text-sm font-semibold" htmlFor="n-pwd">New Password</label>
                                <div className=" relative">
                                    <input type={showNPwd ? "text" : "password"} name={changePwdField.new_pwd} id="n-pwd" className=" w-full pr-10" onChange={handleChangePwdInputChange} />
                                    <div onClick={() => toggleShowNPwd()} className=" absolute top-[50%] right-4 -translate-y-[50%] cursor-pointer">
                                        {showNPwd ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </div>
                                </div>
                                {changePwderrors[changePwdField.new_pwd] && <div className=" text-red-500 text-sm font-semibold">{changePwderrors[changePwdField.new_pwd]}</div>}
                            </div>
                            <div className=" flex flex-col my-2">
                                <label className=" text-sm font-semibold" htmlFor="re-pwd">Confirm Password</label>
                                <div className=" relative">
                                    <input type={showRePwd ? "text" : "password"} name={changePwdField.confirm_pwd} id="re-pwd" className=" w-full pr-10" onChange={handleChangePwdInputChange} />
                                    <div onClick={() => toggleShowRePwd()} className=" absolute top-[50%] right-4 -translate-y-[50%] cursor-pointer">
                                        {showRePwd ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </div>
                                </div>
                                {changePwderrors[changePwdField.confirm_pwd] && <div className=" text-red-500 text-sm font-semibold">{changePwderrors[changePwdField.confirm_pwd]}</div>}
                            </div>
                            <div className=" mt-4">
                                <button className=" w-full bg-slate-500 dark:bg-slate-700 text-white hover:bg-slate-800" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
            {
                showDel &&
                <div className=" absolute top-0 left-0 w-full h-[90vh] flex justify-center items-center">
                    <div className=" relative w-[95%] max-w-[400px] rounded-lg bg-white/80 dark:bg-black/60 backdrop-blur-sm p-4 shadow-lg">
                        <div onClick={handleCloseDel} className=" absolute top-4 right-4 text-2xl cursor-pointer hover:text-red-500"><IoClose /></div>
                        <div className=" text-center text-xl font-semibold tracking-wide mb-2">DELETE ACCOUNT</div>
                        <form onSubmit={handleDelSubmit} action="">
                            <div className=" flex flex-col my-2">
                                <label className=" text-sm font-semibold" htmlFor="pwd">Password</label>
                                <div className=" relative">
                                    <input type={showDelPwd ? "text" : "password"} name="del_pwd" id="pwd" className=" w-full pr-10" onChange={handleDelPwdChange} />
                                    <div onClick={() => toggleShowDelPwd()} className=" absolute top-[50%] right-4 -translate-y-[50%] cursor-pointer">
                                        {showDelPwd ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </div>
                                </div>
                            </div>
                            <div className=" mt-4">
                                <button className=" w-full bg-slate-500 dark:bg-slate-700 text-white hover:bg-slate-800" type="submit">DELETE</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default Settings



// Edit Profile
const editProfileField = { first_name: "first_name", last_name: "last_name" }

const editProfileInputFields = { [editProfileField.first_name]: "", [editProfileField.last_name]: "" }

const validateEditProfile = (input) => {
    let errors = []
    let hasError = false

    if (input.first_name.trim() === '') {
        errors[editProfileField.first_name] = "First name is empty"
        hasError = true
    }
    if (input.last_name.trim() === '') {
        errors[editProfileField.last_name] = "Last name is empty"
        hasError = true
    }

    return { errors: errors, hasError: hasError }
}


// Change Pwd
const changePwdField = { current_pwd: "current_pwd", new_pwd: "new_pwd", confirm_pwd: "confirm_pwd" }

const changePwdInputFields = { [changePwdField.current_pwd]: "", [changePwdField.new_pwd]: "", [changePwdField.confirm_pwd]: "" }

const validateChangePwd = (input) => {
    let errors = []
    let hasError = false

    if (input.current_pwd === '') {
        errors[changePwdField.current_pwd] = "Current Password is empty"
        hasError = true
    }
    if (input.new_pwd === '') {
        errors[changePwdField.new_pwd] = "New Password is empty"
        hasError = true
    }
    if (input.new_pwd !== '' && input.new_pwd.length < 6) {
        errors[changePwdField.new_pwd] = "Password must contain 6 or more characters"
        hasError = true
    }
    if (input.confirm_pwd !== input.new_pwd) {
        errors[changePwdField.confirm_pwd] = "Confirm Password must match New Password"
        hasError = true
    }

    return { errors: errors, hasError: hasError }
}