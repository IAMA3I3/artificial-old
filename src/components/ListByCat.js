import { useState, useEffect } from "react"
import axios from 'axios'
import ArtList from "./ArtList"

const ListByCat = () => {

    const [mode, setMode] = useState(categories.all)
    const [arts, setArts] = useState([])

    const getArts = () => {
        axios.get('https://artificial-api.000webhostapp.com/art/get')
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

    const changeMode = (newMode) => {
        setMode(newMode)
    }

    useEffect(() => {
        getArts()
    }, [])

    return (

        <div className=" py-4">
            <div className=" container">
                <div className=" flex gap-4 overflow-x-auto small-scrollbar scrollbar flex-nowrap *:text-nowrap *:my-2 *:py-2 *:px-4 *:rounded-full *:cursor-pointer active:*:scale-95 text-sm font-semibold">
                    <div className={`${(mode === categories.all) ? " bg-slate-600 dark:bg-slate-800 text-white" : " bg-slate-300 dark:text-gray-800"} hover:bg-slate-600 dark:hover:bg-slate-800 hover:text-white`} onClick={() => changeMode(categories.all)}>All</div>
                    <div className={`${(mode === categories.charcoalArt) ? " bg-slate-600 dark:bg-slate-800 text-white" : " bg-slate-300 dark:text-gray-800"} hover:bg-slate-600 dark:hover:bg-slate-800 hover:text-white`} onClick={() => changeMode(categories.charcoalArt)}>Charcoal Art</div>
                    <div className={`${(mode === categories.penArt) ? " bg-slate-600 dark:bg-slate-800 text-white" : " bg-slate-300 dark:text-gray-800"} hover:bg-slate-600 dark:hover:bg-slate-800 hover:text-white`} onClick={() => changeMode(categories.penArt)}>Pen Art</div>
                    <div className={`${(mode === categories.acrylicArt) ? " bg-slate-600 dark:bg-slate-800 text-white" : " bg-slate-300 dark:text-gray-800"} hover:bg-slate-600 dark:hover:bg-slate-800 hover:text-white`} onClick={() => changeMode(categories.acrylicArt)}>Acrylic Art</div>
                    <div className={`${(mode === categories.oilPaintArt) ? " bg-slate-600 dark:bg-slate-800 text-white" : " bg-slate-300 dark:text-gray-800"} hover:bg-slate-600 dark:hover:bg-slate-800 hover:text-white`} onClick={() => changeMode(categories.oilPaintArt)}>Oil Paint Art</div>
                </div>

                <ArtList mode={mode} arts={arts} />
            </div>
        </div>
    )
}

export default ListByCat



// categories
const categories = {
    all: 'All',
    charcoalArt: 'Charcoal Art',
    penArt: 'Pen Art',
    acrylicArt: 'Acrylic Art',
    oilPaintArt: 'Oil Paint Art'
}
