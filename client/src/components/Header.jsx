import React, { useEffect, useState } from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { HiX } from "react-icons/hi"
import { useSelector, useDispatch } from "react-redux"
import { toogleTheme } from '../redux/theme/themeSlice'
import { signOutSuccess } from '../redux/features/userSlice'

const Header = () => {
    const path = useLocation().pathname
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { theme } = useSelector(state => state.theme)
    const navigate = useNavigate()
    const location = useLocation()

    const [searchTerm, setSearchTerm] = useState('')
    const [showMobileSearch, setShowMobileSearch] = useState(false)

    const handleSignOut = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/signout`, {
                method: 'POST'
            })
            const data = await res.json()
            if (!res.ok) {
                console.log(data.message)
            }
            else {
                dispatch(signOutSuccess(data))
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const urlParam = new URLSearchParams(location.search)
        const searchtermFromUrl = urlParam.get('searchTerm')
        if (searchtermFromUrl) {
            setSearchTerm(searchtermFromUrl)
        }
    }, [location.search])

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParam = new URLSearchParams(location.search)
        urlParam.set('searchTerm', searchTerm)
        const searchQuery = urlParam.toString()
        navigate(`/search?${searchQuery}`)
        setShowMobileSearch(false)
    }

    return (
        <Navbar className='border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 shadow-sm'>
            <div className='flex items-center justify-between w-full max-w-7xl mx-auto px-4'>
                {/* Logo and Nav Section */}
                <div className='flex items-center gap-8'>
                    {/* Logo */}
                    <Link to={'/'} className='self-center whitespace-nowrap flex-shrink-0'>
                        <span className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all'>
                            BlogForge
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className='hidden md:flex items-center gap-1'>
                        <Link
                            to={'/'}
                            className={`px-4 py-2 text-xl font-medium rounded-lg transition-all ${
                                path === '/' 
                                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' 
                                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            to={'/about'}
                            className={`px-4 py-2 text-xl font-medium rounded-lg transition-all ${
                                path === '/about' 
                                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' 
                                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            About
                        </Link>
                        <Link
                            to={'/projects'}
                            className={`px-4 py-2 text-xl font-medium rounded-lg transition-all ${
                                path === '/projects' 
                                    ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20' 
                                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            Projects
                        </Link>
                    </nav>
                </div>

                {/* Desktop Search */}
                <form onSubmit={handleSubmit} className='hidden lg:flex flex-1 max-w-md mx-8'>
                    <TextInput
                        type='text'
                        placeholder='Search articles...'
                        rightIcon={AiOutlineSearch}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full'
                        sizing='md'
                    />
                </form>

                {/* Right side actions */}
                <div className='flex items-center gap-2'>
                    {/* Mobile Search Button */}
                    <button
                        className='lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                    >
                        {showMobileSearch ? (
                            <HiX className='w-5 h-5 text-gray-700 dark:text-gray-300' />
                        ) : (
                            <AiOutlineSearch className='w-5 h-5 text-gray-700 dark:text-gray-300' />
                        )}
                    </button>

                    {/* Theme Toggle */}
                    <button
                        onClick={() => { dispatch(toogleTheme()) }}
                        className='w-10 h-10 hidden sm:flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
                        aria-label='Toggle theme'
                    >
                        {theme === "light" ? (
                            <FaMoon className='w-4 h-4 text-gray-700 dark:text-gray-300' />
                        ) : (
                            <FaSun className='w-4 h-4 text-yellow-400' />
                        )}
                    </button>

                    {/* User Menu or Sign In */}
                    {currentUser ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <div className='w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500 hover:ring-purple-600 transition-all cursor-pointer'>
                                    <Avatar
                                        alt='user'
                                        img={currentUser.profilePicture}
                                        rounded
                                        className='object-cover'
                                    />
                                </div>
                            }
                        >
                            <Dropdown.Header>
                                <span className='block text-sm font-semibold'>@{currentUser.username}</span>
                                <span className='block text-xs text-gray-500 truncate mt-1'>{currentUser.email}</span>
                            </Dropdown.Header>
                            <Link to={'/dashboard?tab=profile'}>
                                <Dropdown.Item>Profile</Dropdown.Item>
                            </Link>
                            <Link to={'/dashboard?tab=posts'}>
                                <Dropdown.Item>My Posts</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/sign-in'>
                            <Button 
                                gradientDuoTone='purpleToBlue' 
                                outline 
                                size='sm'
                                className='font-medium'
                            >
                                Sign In
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Navbar.Toggle className='md:hidden' />
                </div>
            </div>

            {/* Mobile Search Bar */}
            {showMobileSearch && (
                <div className='lg:hidden w-full px-4 pb-4 pt-3 border-t border-gray-200 dark:border-gray-700 animate-fade-in'>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            type='text'
                            placeholder='Search articles...'
                            rightIcon={AiOutlineSearch}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full'
                            autoFocus
                        />
                    </form>
                </div>
            )}

            {/* Mobile Navigation Menu */}
            <Navbar.Collapse className='md:hidden'>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to={'/'} className='block py-2 text-base font-medium'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to={'/about'} className='block py-2 text-base font-medium'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to={'/projects'} className='block py-2 text-base font-medium'>Projects</Link>
                </Navbar.Link>
                {/* Mobile Theme Toggle */}
                <Navbar.Link as={'div'} className='sm:hidden'>
                    <button
                        onClick={() => { dispatch(toogleTheme()) }}
                        className='flex items-center gap-3 py-2 w-full text-base font-medium'
                    >
                        {theme === "light" ? (
                            <>
                                <FaMoon className='w-4 h-4' /> 
                                <span>Dark Mode</span>
                            </>
                        ) : (
                            <>
                                <FaSun className='w-4 h-4' /> 
                                <span>Light Mode</span>
                            </>
                        )}
                    </button>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header