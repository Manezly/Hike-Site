import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

// export const dynamic = 'force-dynamic';

export const POST = async (request) => {
    try {
        await connectDB();

        const { hikeId } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }

        const { userId } = sessionUser;

        // Find user in database
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        // Check if hike is bookmarked
        let isBookmarked = user.bookmarks.includes(hikeId);

        return new Response(
            JSON.stringify({ isBookmarked }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};
