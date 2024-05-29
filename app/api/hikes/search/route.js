import connectDB from "@/config/database";
import Hike from "@/models/Hike";

// Get /api/hikes/search
export const GET = async (request) => {
    try {
        await connectDB();

        const {searchParams} = new URL(request.url);
        const location = searchParams.get('location');
        const difficulty = searchParams.get('difficulty');

        const locationPattern = new RegExp(location, 'i');

        // Match location pattern against database fields
        let query = {
            $or: [
                {title: locationPattern},
                {summary: locationPattern},
                {'location.area': locationPattern},
                {'location.county': locationPattern},
            ],
        };

        // Only check for hike if its not 'all'
        if (difficulty && difficulty !== 'all') {
            const difficultyPattern = new RegExp(difficulty, 'i');
            query.difficulty = difficultyPattern;
        }

        const hikes = await Hike.find(query);

        return new Response(JSON.stringify(hikes), {status: 200});
    } catch (error) {
        return new Response('Something went wrong', {status: 500});
    }
}