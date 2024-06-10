import { useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { HiUpload } from "react-icons/hi";
import axios from "axios";

const AddArts = () => {

    const Navigate = useNavigate()
    const ref = useRef()

    const [artDisplay, setArtDisplay] = useState(null)
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
        }
    }

    const handleChange = (e) => {
        const { name } = e.target
        const { value } = e.target

        setInputs({ ...inputs, [name]: value })
    }

    useEffect(() => {
        retrieveUserId()
    })

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
            // console.log(inputs)

            const formData = new FormData()
            formData.append(fieldName.art_img, artDisplay)
            formData.append(fieldName.title, inputs.title)
            formData.append(fieldName.author, inputs.author)
            formData.append(fieldName.about, inputs.about)
            formData.append(fieldName.medium, inputs.medium)
            formData.append(fieldName.w, inputs.w)
            formData.append(fieldName.h, inputs.h)
            formData.append(fieldName.categories, inputs.categories)
            formData.append(fieldName.date, inputs.date)
            formData.append(fieldName.price, inputs.price)

            axios.post('http://localhost:80/artificial-api/art/create', formData)
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.success) {
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
        <div className=" container py-4">
            <div className=" flex gap-4 items-center justify-between mb-4">
                <div onClick={() => Navigate(-1)} className=" text-3xl cursor-pointer">
                    <IoIosArrowBack />
                </div>
                <div className=" text-lg md:text-3xl font-semibold">ADD ART TO GALLARY</div>
                <div className=""></div>
            </div>
            <form onSubmit={(e) => handleFormSubmit(e)} action="" className=" w-full" encType="multipart/form-data" >
                <div className=" flex flex-col md:flex-row gap-8">
                    <div className=" w-full">
                        <div className=" w-full h-[300px] border-4 border-slate-800 rounded-lg overflow-hidden bg-slate-500">
                            {
                                artDisplay && <img src={URL.createObjectURL(artDisplay)} className=" w-full h-full object-contain" alt="Not found" />
                            }
                        </div>
                        <div className=" my-2">
                            <label className=" w-full cursor-pointer hover:bg-blue-800 bg-blue-600 active:scale-95 text-white rounded-md py-2 flex items-center justify-center gap-2" htmlFor="art-img">
                                <HiUpload />
                                <span>Upload Image</span>
                            </label>
                            <input type="file" name={fieldName.art_img} id="art-img" onChange={(e) => { setArtDisplay(e.target.files[0]); handleChange(e) }} className=" hidden" ref={ref} accept="image/*" />
                            {errors[fieldName.art_img] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.art_img]}</div>}
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="title">Title</label>
                            <input onChange={(e) => handleChange(e)} type="text" name={fieldName.title} id="title" />
                            {errors[fieldName.title] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.title]}</div>}
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="author">Author</label>
                            <input onChange={(e) => handleChange(e)} type="text" name={fieldName.author} id="author" />
                            {errors[fieldName.author] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.author]}</div>}
                        </div>
                    </div>
                    <div className=" w-full">
                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="about">About</label>
                            <textarea onChange={(e) => handleChange(e)} name={fieldName.about} id="about" ></textarea>
                            {errors[fieldName.about] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.about]}</div>}
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="medium">Medium</label>
                            <input onChange={(e) => handleChange(e)} type="text" name={fieldName.medium} id="medium" />
                            {errors[fieldName.medium] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.medium]}</div>}
                        </div>

                        <div className=" flex flex-col my-1">
                            <div className=" font-semibold">Size</div>
                            <div className=" flex gap-8">
                                <div className=" w-full flex flex-col">
                                    <div className=" w-full flex items-center gap-2">
                                        <label htmlFor="w">W:</label>
                                        <input onChange={(e) => handleChange(e)} type="text" name={fieldName.w} id="w" className=" flex-1" />
                                    </div>
                                    {errors[fieldName.w] && <div className=" text-red-500 text-sm font-semibold">{errors[fieldName.w]}</div>}
                                </div>
                                <div className=" w-full flex flex-col">
                                    <div className=" w-full flex items-center gap-2">
                                        <label htmlFor="h">H:</label>
                                        <input onChange={(e) => handleChange(e)} type="text" name={fieldName.h} id="h" className=" flex-1" />
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
                            <input onChange={(e) => handleChange(e)} type="date" name={fieldName.date} id="date" />
                        </div>

                        <div className=" flex flex-col my-1">
                            <label className=" font-semibold" htmlFor="price">Price</label>
                            <input onChange={(e) => handleChange(e)} type="text" name={fieldName.price} id="price" />
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

export default AddArts



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

    if (input.art_img === '') {
        errors[fieldName.art_img] = "No Image Uploaded"
        hasError = true
    }
    if (input.title.trim() === '') {
        errors[fieldName.title] = "Title is empty"
        hasError = true
    }
    if (input.author.trim() === '') {
        errors[fieldName.author] = "Author is empty"
        hasError = true
    }
    if (input.w.trim() === '') {
        errors[fieldName.w] = "W is empty"
        hasError = true
    }
    if (input.h.trim() === '') {
        errors[fieldName.h] = "H is empty"
        hasError = true
    }
    if (input.price.trim() === '') {
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