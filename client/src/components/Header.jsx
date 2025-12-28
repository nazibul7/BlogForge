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
        <>
            <Navbar className='border-b-2 sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90'>
                <div className='flex items-center justify-between w-full'>
                    {/* Logo */}
                    <Link to={'/'} className='self-center whitespace-nowrap text-lg sm:text-2xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            BlogForge
                        </span>
                    </Link>

                    {/* Desktop Search */}
                    <form onSubmit={handleSubmit} className='hidden lg:block flex-1 max-w-md mx-8'>
                        <TextInput
                            type='text'
                            placeholder='Search articles...'
                            rightIcon={AiOutlineSearch}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full'
                        />
                    </form>

                    {/* Right side actions */}
                    <div className='flex items-center gap-2 md:gap-3'>
                        {/* Mobile Search Button */}
                        <Button
                            className='w-9 h-9 lg:hidden'
                            color='gray'
                            pill
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                        >
                            {showMobileSearch ? <HiX /> : <AiOutlineSearch />}
                        </Button>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => { dispatch(toogleTheme()) }}
                            className='w-10 h-10 hidden sm:inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                        >
                            {theme === "light" ? (
                                <FaMoon className='w-5 h-5 text-gray-700' />
                            ) : (
                                <FaSun className='w-5 h-5 text-yellow-200' />
                            )}
                        </button>

                        {/* User Menu or Sign In */}
                        {currentUser ? (
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar
                                        alt='user'
                                        img={currentUser.profilePicture}
                                        rounded
                                        className='object-cover'
                                    />
                                }
                            >
                                <Dropdown.Header>
                                    <span className='block text-sm'>@{currentUser.username}</span>
                                    <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
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
                                <Button gradientDuoTone='purpleToBlue' outline size='sm'>
                                    Sign In
                                </Button>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <Navbar.Toggle />
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {showMobileSearch && (
                    <div className='lg:hidden w-full mt-3 pb-3'>
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

                {/* Navigation Links */}
                <Navbar.Collapse>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        <Link to={'/'} className='text-base'>Home</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/about'} as={'div'}>
                        <Link to={'/about'} className='text-base'>About</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === '/projects'} as={'div'}>
                        <Link to={'/projects'} className='text-base'>Projects</Link>
                    </Navbar.Link>
                    {/* Mobile Theme Toggle */}
                    <Navbar.Link as={'div'} className='sm:hidden'>
                        <button
                            onClick={() => { dispatch(toogleTheme()) }}
                            className='flex items-center gap-2'
                        >
                            {theme === "light" ? <><FaMoon /> Dark Mode</> : <><FaSun /> Light Mode</>}
                        </button>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header