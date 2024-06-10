import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

const AdminLogin = () => {

    const Navigate = useNavigate()

    const [showPwd, setShowPwd] = useState(false)
    const [inputs, setInputs] = useState(inputFields)
    const [errors, setErrors] = useState([])


    const handleChange = (e) => {
        const { name } = e.target
        const { value } = e.target

        setInputs({ ...inputs, [name]: value })
    }

    const toggleShowPwd = () => {
        setShowPwd(!showPwd)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let errCheck = validate(inputs)

        setErrors(errCheck.errors)

        if (!errCheck.hasError) {
            // console.log(inputs)

            axios.post('http://localhost:80/artificial-api/admin/search', inputs)
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.success) {
                        window.sessionStorage.setItem("artificial_user_id", JSON.stringify(response.data.user_id))
                        document.querySelectorAll('input').forEach(item => item.value = '')
                        setInputs(inputFields)
                        Navigate('/admin_dashboard')
                    }
                })
                .catch((error) => {
                    console.log('Error:', error)
                })
        }
    }

    return (
        <div className="">
            <div className=" w-full h-[80px] md:h-[100px] bg-gradient-to-b from-black/60 via-black/35 to-black/0"></div>
            <div className=" h-[80vh] container py-4">
                <div className=" w-full h-full flex justify-center items-center">
                    <div className="card w-full md:w-[600px] bg-white dark:bg-black/60">
                        <div className=" text-2xl tracking-wide uppercase mb-2 text-center">Admin Login</div>
                        <form onSubmit={(e) => handleSubmit(e)} action="">
                            <div className=" flex flex-col mb-2">
                                <label htmlFor="email">Email</label>
                                <input onChange={(e) => handleChange(e)} type="text" name={fieldName.email} id="email" />
                                {errors[fieldName.email] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.email]}</div>}
                            </div>
                            <div className=" flex flex-col mb-2">
                                <label htmlFor="pwd">Password</label>
                                <div className=" relative">
                                    <input onChange={(e) => handleChange(e)} className=" w-full pr-10" type={(showPwd ? "text" : "password")} name={fieldName.pwd} id="pwd" />
                                    <div onClick={() => toggleShowPwd()} className=" absolute top-[50%] right-4 -translate-y-[50%] cursor-pointer">
                                        {showPwd ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </div>
                                </div>
                                {errors[fieldName.pwd] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.pwd]}</div>}
                            </div>
                            <div className=" text-sm font-semibold text-gray-500 dark:text-gray-300 text-center">Don't have an account? <span onClick={() => Navigate('/admin_register')} className=" text-blue-600 hover:underline cursor-pointer">Register</span></div>
                            <div className=" text-center mt-4">
                                <button className=" bg-slate-500 text-white dark:bg-blue-600">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin



const fieldName = { email: "email", pwd: "pwd" }

const inputFields = { [fieldName.email]: "", [fieldName.pwd]: "" }




const validate = (input) => {
    let errors = []
    let hasError = false

    if (input.email.trim() === '') {
        errors[fieldName.email] = "Email is empty"
        hasError = true
    }
    if (input.pwd.trim() === '') {
        errors[fieldName.pwd] = "Password is empty"
        hasError = true
    }
    if (input.email.trim() !== '' && !validateEmail(input.email)) {
        errors[fieldName.email] = "Email is invalid"
        hasError = true
    }

    return { errors: errors, hasError: hasError }
}



const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
};