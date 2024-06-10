import logoW from '../assets/logo_w.png'
import logoB from '../assets/logo_b.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Footer = ({ darkMode }) => {

    const Navigate = useNavigate()
    let path = useLocation()

    const [showFooter, setShowFooter] = useState(true)

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    useEffect(() => {
        if (path.pathname === '/admin_dashboard' || path.pathname === '/add_art' || path.pathname.split('/').includes('manage_art_detail') || path.pathname.split('/').includes('edit_art')) {
            setShowFooter(false)
        } else {
            setShowFooter(true)
        }
    }, [path.pathname])

    return (
        <>
            {
                showFooter &&
                <div className=" w-full bg-slate-300 dark:bg-slate-800 py-5 md:py-8">
                    <div className=" container">
                        <div className=" flex gap-6 justify-center md:justify-between flex-wrap hover:*:underline">
                            <a href="/">CONTACT US</a>
                            <a href="/">PRIVACY POLICY</a>
                            <a href="/">TERMS OF USE</a>
                            <a href="/">FAQ</a>
                        </div>
                        <div className=" flex items-center justify-center md:justify-start gap-2 mt-5 md:mt-8">
                            <img onDoubleClick={() => Navigate('/admin_dashboard')} src={(darkMode) ? logoW : logoB} className=' h-3 md:h-5 opacity-80 dark:opacity-100' alt="" />
                            <span>&copy; {currentYear}</span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Footer