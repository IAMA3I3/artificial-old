import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";

const EditArt = () => {

    const { id } = useParams()
    const Navigate = useNavigate()

    const [inputs, setInputs] = useState(inputFields)
    const [categoriesInput, setCategoriesInput] = useState([])
    const [errors, setErrors] = useState([])

    const handleCategory = (cat) => {
        if (categoriesInput.includes(cat)) {
            setCategoriesInput(categoriesInput.filter((item) => item !== cat))
        } else {
            setCategoriesInput([...categoriesInput, cat])
        }
    }

    const retrieveUserId = () => {
        let storedId = window.sessionStorage.getItem("artificial_user_id")
        if (!storedId) {
            Navigate('/admin_dashboard')
        } else {
            getArt()
        }
    }

    const handleChange = (e) => {
        const { name } = e.target
        const { value } = e.target

        setInputs({ ...inputs, [name]: value })
    }

    const getArt = () => {
        axios.get(`http://localhost:80/artificial-api/art/${id}`)
            .then((response) => {
                // console.log(response.data)
                if (response.data.success) {
                    setInputs({ ...inputs, ...response.data.art })
                    if (response.data.art.date) {
                        const dateObj = new Date(response.data.art.date)
                        dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset())
                        setInputs({ ...inputs, ...response.data.art, date: dateObj.toISOString().split('T')[0] })
                    }
                    response.data.art.categories && setCategoriesInput([...categoriesInput, ...response.data.art.categories.split(', ')])
                } else {
                    Navigate('/admin_dashboard')
                }
            })
            .catch((error) => {
                console.log('Error:', error)
            })
    }

    useEffect(() => {
        retrieveUserId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        document.querySelector('#categories').value = categoriesInput.join(', ')
        setInputs({ ...inputs, [fieldName.categories]: categoriesInput.join(', ') })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriesInput])


    const handleFormSubmit = (e) => {
        e.preventDefault()

        let errCheck = validate(inputs)

        setErrors(errCheck.errors)

        if (!errCheck.hasError) {
            // console.log(inputs, 'inputs')

            axios.put(`http://localhost:80/artificial-api/art/${id}/edit`, inputs)
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.success) {
                        Navigate(-1)
                    }
                })
                .catch((error) => {
                    console.log('Error: ', error)
                })
        }
    }

    return (
        <div className=" container py-4">
            <div className=" flex gap-4 items-center justify-between mb-4">
                <div onClick={() => Navigate(-1)} className=" text-3xl cursor-pointer">
                    <IoIosArrowBack />
                </div>
                <div className=" text-lg md:text-3xl font-semibold">EDIT ART</div>
                <div className=""></div>
            </div>

            <form onSubmit={(e) => handleFormSubmit(e)} action="" className=" w-full" encType="multipart/form-data" >
                <div className=" flex flex-col md:flex-row gap-8">
                    <div className=" w-full">
                        <div className=" mb-4 w-full h-[300px] border-4 border-slate-800 rounded-lg overflow-hidden bg-slate-500">
                            <img src={`http://localhost:80/artificial-api/${inputs.file_path}`} className=" w-full h-full object-contain" alt="Not found" />
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="title">Title</label>
                            <input onChange={(e) => handleChange(e)} type="text" name={fieldName.title} id="title" value={inputs.title ?? ''} />
                            {errors[fieldName.title] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.title]}</div>}
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="author">Author</label>
                            <input onChange={(e) => handleChange(e)} type="text" name={fieldName.author} id="author" value={inputs.author ?? ''} />
                            {errors[fieldName.author] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.author]}</div>}
                        </div>
                    </div>
                    <div className=" w-full">
                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="about">About</label>
                            <textarea onChange={(e) => handleChange(e)} name={fieldName.about} id="about" value={inputs.about ?? ''} ></textarea>
                            {errors[fieldName.about] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.about]}</div>}
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="medium">Medium</label>
                            <input onChange={(e) => handleChange(e)} type="text" name={fieldName.medium} id="medium" value={inputs.medium ?? ''} />
                            {errors[fieldName.medium] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.medium]}</div>}
                        </div>

                        <div className=" flex flex-col my-1">
                            <div className=" font-semibold">Size</div>
                            <div className=" flex gap-8">
                                <div className=" w-full flex flex-col">
                                    <div className=" w-full flex items-center gap-2">
                                        <label htmlFor="w">W:</label>
                                        <input onChange={(e) => handleChange(e)} type="text" name={fieldName.w} id="w" className=" flex-1" value={inputs.w ?? ''} />
                                    </div>
                                    {errors[fieldName.w] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.w]}</div>}
                                </div>
                                <div className=" w-full flex flex-col">
                                    <div className=" w-full flex items-center gap-2">
                                        <label htmlFor="h">H:</label>
                                        <input onChange={(e) => handleChange(e)} type="text" name={fieldName.h} id="h" className=" flex-1" value={inputs.h ?? ''} />
                                    </div>
                                    {errors[fieldName.h] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.h]}</div>}
                                </div>
                            </div>
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="categories">Categories</label>
                            <input onChange={(e) => handleChange(e)} type="text" name={fieldName.categories} id="categories" className=" cursor-default" readOnly />
                            <div className=" mt-1 flex gap-2 flex-wrap *:text-nowrap">
                                <div onClick={() => handleCategory(categories.charcoalArt)} className={`${categoriesInput.includes(categories.charcoalArt) ? " bg-slate-700 text-white" : " bg-gray-300 text-gray-700"} " py-1 px-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-slate-700 hover:text-white active:scale-95"`}>Charcoal Art</div>
                                <div onClick={() => handleCategory(categories.penArt)} className={`${categoriesInput.includes(categories.penArt) ? " bg-slate-700 text-white" : " bg-gray-300 text-gray-700"} " py-1 px-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-slate-700 hover:text-white active:scale-95"`}>Pen Art</div>
                                <div onClick={() => handleCategory(categories.acrylicArt)} className={`${categoriesInput.includes(categories.acrylicArt) ? " bg-slate-700 text-white" : " bg-gray-300 text-gray-700"} " py-1 px-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-slate-700 hover:text-white active:scale-95"`}>Acrylic Art</div>
                                <div onClick={() => handleCategory(categories.oilPaintArt)} className={`${categoriesInput.includes(categories.oilPaintArt) ? " bg-slate-700 text-white" : " bg-gray-300 text-gray-700"} " py-1 px-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-slate-700 hover:text-white active:scale-95"`}>Oil Pint Art</div>
                            </div>
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="date">Date</label>
                            <input onChange={(e) => handleChange(e)} type="date" name={fieldName.date} id="date" value={inputs.date ?? ''} />
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="price">Price</label>
                            <input onChange={(e) => handleChange(e)} type="text" name={fieldName.price} id="price" value={inputs.price ?? ''} />
                            {errors[fieldName.price] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.price]}</div>}
                        </div>
                    </div>
                </div>

                <div className=" w-full flex justify-center mt-4">
                    <button className=" bg-slate-600 dark:bg-slate-800 text-white hover:bg-slate-900" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditArt



// categories
const categories = {
    all: 'All',
    charcoalArt: 'Charcoal Art',
    penArt: 'Pen Art',
    acrylicArt: 'Acrylic Art',
    oilPaintArt: 'Oil Paint Art'
}


const fieldName = { art_img: "art_img", title: "title", author: "author", about: "about", medium: "medium", w: "w", h: "h", categories: "categories", date: "date", price: "price" }

const inputFields = { [fieldName.art_img]: "", [fieldName.title]: "", [fieldName.author]: "", [fieldName.about]: "", [fieldName.medium]: "", [fieldName.w]: "", [fieldName.h]: "", [fieldName.categories]: "", [fieldName.date]: "", [fieldName.price]: "" }


const validate = (input) => {
    let errors = []
    let hasError = false

    if (input.title.trim() === '') {
        errors[fieldName.title] = "Title is empty"
        hasError = true
    }
    if (input.author.trim() === '') {
        errors[fieldName.author] = "Author is empty"
        hasError = true
    }
    if (input.w === '') {
        errors[fieldName.w] = "W is empty"
        hasError = true
    }
    if (input.h === '') {
        errors[fieldName.h] = "H is empty"
        hasError = true
    }
    if (input.price === '') {
        errors[fieldName.price] = "Price is empty"
        hasError = true
    }
    if (isNaN(input.w)) {
        errors[fieldName.w] = "Not a Number"
        hasError = true
    }
    if (isNaN(input.h)) {
        errors[fieldName.h] = "Not a Number"
        hasError = true
    }
    if (isNaN(input.price)) {
        errors[fieldName.price] = "Not a Number"
        hasError = true
    }

    return { errors: errors, hasError: hasError }
}