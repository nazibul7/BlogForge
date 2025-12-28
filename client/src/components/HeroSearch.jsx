import React, { useState } from 'react'
import { TextInput, Button } from 'flowbite-react'
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

const HeroSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            navigate(`/search?searchTerm=${searchTerm}`)
        }
    }

    return (
        <div className='bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 py-20 px-4'>
            <div className='max-w-4xl mx-auto text-center'>
                <h1 className='text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all'>
                    Welcome to BlogForge
                </h1>
                <p className='text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto'>
                    Here you'll find variety of articles and tutorials
                    on topics such as web development,software engineering, and programming language
                </p>

                {/* Hero Search Bar */}
                <form onSubmit={handleSubmit} className='max-w-2xl mx-auto'>
                    <div className='flex gap-2'>
                        <TextInput
                            type='text'
                            placeholder='Search for articles or topics...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='flex-1'
                            sizing='lg'
                        />
                        <Button
                            type='submit'
                            gradientDuoTone='purpleToBlue'
                            size='lg'
                        >
                            <div className="flex items-center gap-2">
                                <AiOutlineSearch className='h-5 w-5 mt-1' />
                                Search
                            </div>
                        </Button>
                    </div>
                </form>

                {/* Popular Tags/Categories */}
                <div className='mt-8'>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mb-3'>Popular topics:</p>
                    <div className='flex flex-wrap justify-center gap-2'>
                        {['Technology', 'Design', 'Business', 'Lifestyle', 'Travel'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() => navigate(`/search?searchTerm=${tag}`)}
                                className='px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md'
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSearch