import { FiSend } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useForm, ValidationError } from '@formspree/react';
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Contact = () => {

    const [state, handleSubmit] = useForm("mjvnrkbo")

    const showSent = () => {
        const sent = document.querySelector('#sent')
        sent.classList.add('show')
        setTimeout(() => { sent.classList.remove('show') }, 2000)
        setTimeout(() => { sent.classList.add('hidden') }, 2001)
    }

    if (state.succeeded) {
        // console.log('Success')
        document.querySelector('#mail-form').reset()
        showSent()
    }

    return (
        <>
            <div className=" z-40 fixed transition-all w-full flex justify-center" id="sent">
                <div className=" flex items-center gap-2 py-2 px-4 bg-green-500 rounded-full border-2 border-green-700 text-white uppercase tracking-wide">
                    <IoCheckmarkDoneSharp />
                    <div className="">Sent</div>
                </div>
            </div>
            <div className=" bg-cover bg-center" id="contact" style={{backgroundImage: 'url("bg/chat_blue.jpg")'}}>
                <div className=" py-5 bg-black/45 dark:bg-black/75 text-white">
                    <div className=" container">
                        <div className=" text-3xl mb-4">Contact</div>
                        <div className=" grid gap-8 md:gap-20 grid-cols-1 md:grid-cols-2">
                            <div className="">
                                <div className=" text-lg mb-2">Send me a mail</div>
                                <form onSubmit={handleSubmit} id="mail-form">
                                    <div className=" flex flex-col my-1">
                                        <label htmlFor="email">Email*</label>
                                        <input type="email" name="email" placeholder="Enter your email" id="email" required />
                                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                                    </div>
                                    <div className=" flex flex-col my-1">
                                        <label htmlFor="message">Message Content*</label>
                                        <textarea className=" h-32 scrollbar" name="message" id="message" placeholder="Type your message" required ></textarea>
                                        <ValidationError prefix="Message" field="message" errors={state.errors} />
                                    </div>
                                    <button disabled={state.submitting} className=" flex items-center gap-2 bg-slate-800 text-white hover:bg-slate-700 mt-4" type="submit">
                                        <FiSend />
                                        <div className="">Send</div>
                                    </button>
                                </form>
                            </div>

                            <div className=" border-t-2 border-black/30 dark:border-white/30 md:border-none pt-4 md:pt-0">
                                <div className=" text-lg mb-2">Contact info</div>
                                <div className=" flex items-center gap-2 my-1">
                                    <div className=""><IoMailOutline /></div>
                                    <div className="">emailtoyin@yahoo.com</div>
                                </div>
                                <div className=" flex items-center gap-2 my-1">
                                    <div className=""><BsTelephone /></div>
                                    <div className="">+234 915 440 4710</div>
                                </div>
                                <div className=" mt-8">
                                    <div className=" text-lg mb-2">Social handles</div>
                                    <div className=" flex gap-4 text-2xl hover:*:scale-110 *:transition">
                                        <a href="https://wa.me/+2349093978507" target="__blank" title="WhatsApp"><FaWhatsapp /></a>
                                        <a href="https://web.facebook.com/profile.php?id=100084453611899" target="__blank" title="Facebook"><FaFacebookF /></a>
                                        <a href="https://www.instagram.com/_az_ziz/" target="__blank" title="Instagram"><FaInstagram /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact