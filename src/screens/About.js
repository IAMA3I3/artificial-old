import { useEffect } from "react"

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="">
            <div className=" h-[40vh] w-full bg-cover bg-center" style={{ backgroundImage: 'url("bg/paint.jpeg")' }}>
                <div className=" w-full h-full bg-black/65 dark:bg-black/90 text-white flex items-center justify-center">
                    <div className=" container text-center">
                        <div className=" text-3xl md:text-5xl text-[#D38154] mb-4">Exploring Creativity</div>
                        <div className=" text-xl md:text-3xl">Our Story</div>
                    </div>
                </div>
            </div>

            <div className=" py-4 min-h-[60vh]">
                <div className=" container md:columns-2 *:first-letter:text-5xl *:first-letter:float-left *:first-letter:mr-3 *:first-line:uppercase *:first-line:tracking-wider *:mb-2">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto, fugiat ea a fugit nam eum nihil corporis similique! Officiis qui, aspernatur nisi aperiam dolores in quis inventore. Praesentium, possimus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa placeat architecto doloribus, tenetur mollitia ad iusto ea omnis excepturi. Blanditiis suscipit odit accusantium quae, aut sunt unde iure odio nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quia, aut eveniet commodi ab delectus dolores magnam odio incidunt omnis consequuntur nihil velit non, quibusdam, distinctio expedita atque voluptatem natus?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto, fugiat ea a fugit nam eum nihil corporis similique! Officiis qui, aspernatur nisi aperiam dolores in quis inventore. Praesentium, possimus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa placeat architecto doloribus, tenetur mollitia ad iusto ea omnis excepturi. Blanditiis suscipit odit accusantium quae, aut sunt unde iure odio nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quia, aut eveniet commodi ab delectus dolores magnam odio incidunt omnis consequuntur nihil velit non, quibusdam, distinctio expedita atque voluptatem natus?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto, fugiat ea a fugit nam eum nihil corporis similique! Officiis qui, aspernatur nisi aperiam dolores in quis inventore. Praesentium, possimus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa placeat architecto doloribus, tenetur mollitia ad iusto ea omnis excepturi. Blanditiis suscipit odit accusantium quae, aut sunt unde iure odio nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quia, aut eveniet commodi ab delectus dolores magnam odio incidunt omnis consequuntur nihil velit non, quibusdam, distinctio expedita atque voluptatem natus?</p>
                </div>
            </div>
        </div>
    )
}

export default About