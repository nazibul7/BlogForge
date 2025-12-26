import { Footer } from 'flowbite-react'
import { BsLinkedin, BsXLg, BsGithub } from "react-icons/bs"

const FooterCom = () => {
    return (
        <Footer container className='border-t-4 border-teal-500 p-4'>
            <div className='w-full max-w-7xl mx-auto mt-[-5px]'>
                <div className='w-full mx-auto mb-2'>
                    <Footer.Copyright href='#' by="BlogForge" year={new Date().getFullYear()} />
                </div>
                <div className='flex gap-6 sm:mt-1 mt-3 sm:justify-center'>
                    <Footer.Icon href='#' icon={BsLinkedin} />
                    <Footer.Icon href='#' icon={BsXLg} />
                    <Footer.Icon href='#' icon={BsGithub} />
                </div>
            </div>
        </Footer>
    )
}

export default FooterCom