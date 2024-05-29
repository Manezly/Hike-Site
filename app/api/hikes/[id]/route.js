import connectDB from "@/config/database";
import Hike from "@/models/Hike";
import { getSessionUser } from "@/utils/getSessionUser";

// Get /api/hikes/:id
export const GET = async (request, { params }) => {
    try {
        await connectDB();

        const hike = await Hike.findById(params.id);

        if (!hike) {
            return new Response('Hike not found', {status: 404});
        }

        return new Response(JSON.stringify(hike), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
}

// DELETE /api/hikes/:id
export const DELETE = async (request, { params }) => {
    try {
        const hikeId = params.id;

        const sessionUser = await getSessionUser()

        // Check for session
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', {status: 401});
        }

        const {userId} = sessionUser;

        await connectDB();

        const hike = await Hike.findById(hikeId);

        if (!hike) {
            return new Response('Hike not found', {status: 404});
        }

        // Verify ownership
        if (hike.creator.toString() !== userId) {
            return new Response('Unauthorised', {status: 401});
        }

        await hike.deleteOne();

        return new Response('Hike deleted', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
}

// Put /api/hikes/:id
export const PUT = async (request, {params}) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID required', { status: 401 });
        }

        const {id} = params;
        const { userId } = sessionUser;

        const formData = await request.formData();

        // Log formData entries to debug
        console.log("Form Data:", Object.fromEntries(formData.entries()));

        // Access all values from type and images
        const type = formData.getAll('type');

        // Get hike to update
        const existingHike = await Hike.findById(id);

        if (!existingHike) {
            return new Response('Hike does not exist', {status: 404});
        }

        // Verify ownership
        if (existingHike.creator.toString() !== userId) {
            return new Response('Unauthorised', {status: 401});
        }
 
        // Create hikeData object for the database
        const hikeData = {
            title: formData.get('title'),
            type,
            difficulty: formData.get('difficulty'),
            summary: formData.get('summary'),
            location: {
                area: formData.get('location.area'),
                county: formData.get('location.county'),
                latitude: formData.get('location.latitude'),
                longitude: formData.get('location.longitude'),
            },
            elevation_gain: formData.get('elevation_gain'),
            length: formData.get('length'),
            average_time: formData.get('average_time'),
            trail_type: formData.get('trail_type').trim(),
            text_body: formData.get('text_body'),
            creator: userId,
        };

        // Update hike in database
        const updatedHike = await Hike.findByIdAndUpdate(id, hikeData);

        return new Response(JSON.stringify(updatedHike), {
            status: 200,
        });
    } catch (error) {
        console.error("Error adding new hike:", error);
        return new Response('Failed to add hike', { status: 500 });
    }
}
