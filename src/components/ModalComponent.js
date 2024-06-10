const ModalComponent = ({ setShowModal, title, info, onProceed }) => {

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className=" absolute w-full h-screen top-0 left-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-[1000]">
            <div className="card shadow-2xl bg-gradient-to-br from-white/70 via-white/50 to-white/70 dark:from-black/70 dark:via-black/50 dark:to-black/70">
                <div className=" text-2xl md:text-3xl mb-2">{title}</div>
                <div className="">{info}</div>
                <div className=" mt-4 flex gap-6 justify-between">
                    <button onClick={onProceed} className=" bg-blue-600 text-white hover:bg-blue-700">Proceed</button>
                    <button onClick={closeModal} className=" bg-slate-600 text-white hover:bg-slate-700">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent