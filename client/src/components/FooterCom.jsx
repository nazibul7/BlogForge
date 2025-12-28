import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsLinkedin, BsTwitterX, BsGithub } from "react-icons/bs"

const FooterCom = () => {
    return (
        <Footer className='border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'>
            <div className='w-full max-w-7xl mx-auto px-4 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
                    {/* Brand Section */}
                    <div className='flex flex-col gap-3'>
                        <Link to={'/'} className='self-start'>
                            <span className='text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                                BlogForge
                            </span>
                        </Link>
                        <p className='text-sm text-gray-600 dark:text-gray-400 max-w-xs'>
                            Explore articles, tutorials, and insights crafted with passion for developers and creators.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-900 dark:text-white mb-4'>
                            Quick Links
                        </h3>
                        <div className='flex flex-col gap-2'>
                            <Link 
                                to='/' 
                                className='text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                            >
                                Home
                            </Link>
                            <Link 
                                to='/about' 
                                className='text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                            >
                                About
                            </Link>
                            <Link 
                                to='/projects' 
                                className='text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                            >
                                Projects
                            </Link>
                            <Link 
                                to='/search' 
                                className='text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
                            >
                                All Posts
                            </Link>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-900 dark:text-white mb-4'>
                            Follow Us
                        </h3>
                        <div className='flex flex-wrap gap-4'>
                            <a 
                                href='https://linkedin.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all group'
                            >
                                <BsLinkedin className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors' />
                            </a>
                            <a 
                                href='https://twitter.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all group'
                            >
                                <BsTwitterX className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors' />
                            </a>
                            <a 
                                href='https://github.com' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                className='w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all group'
                            >
                                <BsGithub className='w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors' />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
                    <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                        <p className='text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left'>
                            © {new Date().getFullYear()} BlogForge. All rights reserved.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
                            <Link 
                                to='/privacy' 
                                className='text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-center'
                            >
                                Privacy Policy
                            </Link>
                            <Link 
                                to='/terms' 
                                className='text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-center'
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterCom