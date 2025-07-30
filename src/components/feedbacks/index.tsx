import { returnFeedbacksWithUsers } from '@/services/getFeedbacks'
import { useEffect, useState } from 'react'

export default function FeedBacks() {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    async function loadFeedbacks() {
      const data = await returnFeedbacksWithUsers()
      setFeedbacks(data)
    }

    loadFeedbacks()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <h1 className='text-2xl font-bold mb-4'>Feedbacks</h1>
      <div
        id='section-feedbacks'
        className='w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
      >
        {feedbacks?.map((feedback, index) => {
          return (
            <div
              key={index}
              className='bg-white p-4 rounded shadow mb-2 w-full max-w-md'
            >
              <div className='flex items-center mb-2'>
                <img
                  src={feedback.avatar}
                  alt={feedback.name}
                  width={48}
                  height={48}
                  loading='lazy'
                  className='w-12 h-12 rounded-full mr-3'
                />
                <div>
                  <h2 className='text-lg font-semibold'>{feedback.name}</h2>
                  <p className='text-sm text-gray-500'>{feedback.role}</p>
                </div>
              </div>
              <p className='text-gray-700'>{feedback.message}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
