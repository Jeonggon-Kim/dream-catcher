// /app/api/getuserinfo/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';  // Adjust the path as per your structure
import { connectDB } from '@/util/database'; // Adjust this path as needed for your project structure

export async function GET(request) {
  try {
    // Get session information (includes user data from next-auth)
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Optionally connect to MongoDB to get additional user details
    const client = await connectDB();
    const db = client.db('dream-catcher');
    const userCollection = db.collection('users');

    // Fetch user information from MongoDB using the email from the session
    const user = await userCollection.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return user information
    return NextResponse.json({
      email: session.user.email,
      name: session.user.name || user.name,
      birth_date: user.birth_date || null,
      gender: user.gender || null,
      occupation: user.occupation || null,
    });
  } catch (error) {
    console.error('Error fetching user information:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
