import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    // Use findById like other working routes instead of aggregate
    const user = await UserModel.findById(_user._id);

    if (!user) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Sort messages by createdAt in descending order (newest first)
    const sortedMessages = user.messages.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return Response.json(
      { messages: sortedMessages },
      { status: 200 }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
