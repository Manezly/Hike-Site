import connectDB from "@/config/database";
import Hike from "@/models/Hike";

// Get /api/hikes/user/:userId
export const GET = async (request, {params}) => {
    try {
        await connectDB();

        const userId = params.userId;

        if (!userId) {
            return new Response('User ID is required', {status: 400});
        }

        const hikes = await Hike.find({creator: userId});

        return new Response(JSON.stringify(hikes), { status: 200 });
    } catch (error) {
        console.error("Error fetching hikes:", error);
        return new Response('Something Went Wrong', { status: 500 });
    }
}