import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { verifySchema } from '@/schemas/verifySchema';

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const body = await request.json();
    
    // Validate request body with Zod
    const validationResult = verifySchema.safeParse(body);
    
    if (!validationResult.success) {
      return Response.json(
        { 
          success: false, 
          message: 'Invalid request data',
          errors: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const { username, code } = validationResult.data;
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: 'Account verified successfully' },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            'Verification code has expired. Please sign up again to get a new code.',
        },
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: 'Incorrect verification code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return Response.json(
      { success: false, message: 'Error verifying user' },
      { status: 500 }
    );
  }
}
