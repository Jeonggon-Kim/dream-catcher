import { NextResponse } from 'next/server';
import { connectDB } from '@/util/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';  // Adjust the path as needed

export async function POST(request) {
  try {
    const formData = await request.json();

    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const client = await connectDB();
    const db = client.db('dream-catcher');
    const usersCollection = db.collection('users');

    // Update user information in the database based on the email from the session
    const result = await usersCollection.updateOne(
      { email: session.user.email },
      {
        $set: {
          name: formData.name,
          birth_date: formData.birthdate,
          gender: formData.gender,
          occupation: formData.occupation, // Update occupation in the database
        },
      }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'User update failed' }, { status: 500 });
    }

    return NextResponse.json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error('Error updating user information:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
