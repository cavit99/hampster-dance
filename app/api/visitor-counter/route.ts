import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Missing required environment variables for Redis connection')
}

// Create Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const COUNTER_KEY = 'visitor_count'

async function getAndIncrementCount(): Promise<number> {
  try {
    // Test connection and increment counter
    const count = await redis.incr(COUNTER_KEY)
    return count
  } catch (error) {
    console.error('Redis error:', error)
    // For development, return a random number if Redis fails
    if (process.env.NODE_ENV === 'development') {
      return Math.floor(Math.random() * 1000)
    }
    return 0
  }
}

export async function GET() {
  try {
    const count = await getAndIncrementCount()
    return NextResponse.json({ count })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to update count' }, 
      { status: 500 }
    )
  }
}

