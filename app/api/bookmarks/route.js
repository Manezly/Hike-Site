import connectDB from "@/config/database";
import User from "@/models/User";
import Hike from "@/models/Hike";
import { getSessionUser } from "@/utils/getSessionUser";

// export const dynamic = 'force-dynamic';

// Get /api/bookmarks
export const GET = async () => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }

        const { userId } = sessionUser;

        // Find user in database
        const user = await User.findOne({ _id: userId });

        // Get uses bookmarks
        const bookmarks = await Hike.find({_id: {$in: user.bookmarks}});

        return new Response(JSON.stringify(bookmarks), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', {status: 500});
    }
}

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
        let message;

        if (isBookmarked) {
            // If already bookmarked, remove it
            user.bookmarks.pull(hikeId);
            message = 'Bookmark removed successfully';
            isBookmarked = false;
        } else {
            // If not bookmarked, add it
            user.bookmarks.push(hikeId);
            message = 'Bookmark added successfully';
            isBookmarked = true;
        }

        await user.save();

        return new Response(
            JSON.stringify({ message, isBookmarked }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', { status: 500 });
    }
};
