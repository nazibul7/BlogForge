import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from '../components/PostCard'
import HeroSearch from '../components/HeroSearch'
import { Spinner } from 'flowbite-react'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/getPosts`)
        const data = await res.json()
        if (res.ok) {
          setPosts(data.post)
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [])

  return (
    <div className='min-h-screen bg-white dark:bg-gray-950'>
      {/* Hero Section with Search */}
      <HeroSearch />

      {/* Recent Posts Section */}
      <div className='max-w-6xl mx-auto px-4 py-16 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-950'>
        {loading ? (
          <div className='text-center py-20'>
            {/* <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-600 border-r-transparent'></div> */}
            <Spinner size='xl' className='fill-purple-600' />
            <p className='mt-4 text-gray-600 dark:text-gray-400'>Loading posts...</p>
          </div>
        ) : posts?.length > 0 ? (
          <div className='flex flex-col gap-8'>
            {/* Section Header */}
            <div className='text-center'>
              <h2 className='text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                Recent Posts
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Check out our latest articles and tutorials
              </p>
            </div>

            {/* Posts Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* View All Link */}
            <div className='text-center mt-4'>
              <Link
                to={'/search'}
                className='inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group'
              >
                View all posts
                <svg
                  className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className='text-center py-20'>
            <h3 className='text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>
              No posts yet
            </h3>
            <p className='text-gray-500 dark:text-gray-400'>
              Check back later for new content!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home