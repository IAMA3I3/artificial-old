import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

const AdminRegister = () => {

    const Navigate = useNavigate()

    const [canRegister, setCanRegister] = useState(true)
    const [showPwd, setShowPwd] = useState(false)
    const [showCPwd, setShowCPwd] = useState(false)
    const [inputs, setInputs] = useState(inputFields)
    const [errors, setErrors] = useState([])

    const toggleShowPwd = () => {
        setShowPwd(!showPwd)
    }

    const toggleShowCPwd = () => {
        setShowCPwd(!showCPwd)
    }

    const registerCheck = () => {
        if (!canRegister) {
            Navigate('/admin_login')
        }
        setCanRegister(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let errCheck = validate(inputs)

        setErrors(errCheck.errors)

        if (!errCheck.hasError) {
            // console.log(inputs)

            axios.post('http://localhost:80/artificial-api/admin/create', inputs)
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.success) {
                        document.querySelectorAll('input').forEach(item => item.value = '')
                        setInputs(inputFields)
                        Navigate('/admin_login')
                    }
                })
                .catch((error) => {
                    console.log('Error:', error)
                })
        }
    }

    const handleChange = (e) => {
        const { name } = e.target
        const { value } = e.target

        setInputs({ ...inputs, [name]: value })
    }

    useEffect(() => {
        registerCheck()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="">
            <div className=" w-full h-[80px] md:h-[100px] bg-gradient-to-b from-black/60 via-black/35 to-black/0"></div>
            <div className=" h-[80vh] container py-4">
                <div className=" w-full h-full flex justify-center items-center">
                    <div className="card w-full md:w-[600px] bg-white dark:bg-black/60">
                        <div className=" text-2xl tracking-wide uppercase mb-2 text-center">Admin Sign Up</div>
                        <form onSubmit={(e) => handleSubmit(e)} action="">
                            <div className=" flex flex-col mb-2">
                                <label htmlFor="first-name">First Name</label>
                                <input onChange={(e) => handleChange(e)} type="text" name={fieldName.first_name} id="first-name" />
                                {errors[fieldName.first_name] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.first_name]}</div>}
                            </div>
                            <div className=" flex flex-col mb-2">
                                <label htmlFor="last-name">Last Name</label>
                                <input onChange={(e) => handleChange(e)} type="text" name={fieldName.last_name} id="last-name" />
                                {errors[fieldName.last_name] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.last_name]}</div>}
                            </div>
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
                            <div className=" flex flex-col mb-2">
                                <label htmlFor="c-pwd">Confirm Password</label>
                                <div className=" relative">
                                    <input onChange={(e) => handleChange(e)} className=" w-full pr-10" type={(showCPwd ? "text" : "password")} name={fieldName.c_pwd} id="c-pwd" />
                                    <div onClick={() => toggleShowCPwd()} className=" absolute top-[50%] right-4 -translate-y-[50%] cursor-pointer">
                                        {showCPwd ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </div>
                                </div>
                                {errors[fieldName.c_pwd] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.c_pwd]}</div>}
                            </div>
                            <div className=" text-sm font-semibold text-gray-500 dark:text-gray-300 text-center">Already have an account? <span onClick={() => Navigate('/admin_login')} className=" text-blue-600 hover:underline cursor-pointer">Login</span></div>
                            <div className=" text-center mt-4">
                                <button className=" bg-slate-500 text-white dark:bg-blue-600">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminRegister

const fieldName = { first_name: "first_name", last_name: "last_name", email: "email", pwd: "pwd", c_pwd: "c_pwd" }

const inputFields = { [fieldName.first_name]: "", [fieldName.last_name]: "", [fieldName.email]: "", [fieldName.pwd]: "", [fieldName.c_pwd]: "" }

const validate = (input) => {
    let errors = []
    let hasError = false

    if (input.first_name.trim() === '') {
        errors[fieldName.first_name] = "First name is empty"
        hasError = true
    }
    if (input.last_name.trim() === '') {
        errors[fieldName.last_name] = "Last name is empty"
        hasError = true
    }
    if (input.email.trim() === '') {
        errors[fieldName.email] = "Email is empty"
        hasError = true
    }
    if (input.pwd === '') {
        errors[fieldName.pwd] = "Password is empty"
        hasError = true
    }
    if (input.c_pwd === '') {
        errors[fieldName.c_pwd] = "Confirm password is empty"
        hasError = true
    }
    if (input.email.trim() !== '' && !validateEmail(input.email)) {
        errors[fieldName.email] = "Email is invalid"
        hasError = true
    }
    if (input.pwd !== '' && input.pwd.length < 6) {
        errors[fieldName.pwd] = "Password must contain 6 or more characters"
        hasError = true
    }
    if (input.pwd !== '' && input.c_pwd !== '' && input.pwd !== input.c_pwd) {
        errors[fieldName.c_pwd] = "Does not match password"
        hasError = true
    }

    return { errors: errors, hasError: hasError }
}


const validateEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
};


// idea to check error on focus leave