import connectDB from "@/config/database";
import Hike from "@/models/Hike";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// Get /api/hikes
export const GET = async (request) => {
    try {
        await connectDB();

        const page = request.nextUrl.searchParams.get('page') || 1;
        const pageSize = request.nextUrl.searchParams.get('pageSize') || 2;

        const skip = (page - 1) * pageSize;

        const total = await Hike.countDocuments({});

        const hikes = await Hike.find({}).skip(skip).limit(pageSize);

        const result = {
            total,
            hikes
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error("Error fetching hikes:", error);
        return new Response('Something Went Wrong', { status: 500 });
    }
}

export const POST = async (request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID required', { status: 401 });
        }

        const { userId } = sessionUser;

        const formData = await request.formData();

        // Log formData entries to debug
        console.log("Form Data:", Object.fromEntries(formData.entries()));

        // Access all values from type and images
        const type = formData.getAll('type');
        const images = formData.getAll('images').filter((image) => image.name !== '');

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
            // trail_type: sanitizedTrailType,
            trail_type: formData.get('trail_type').trim(),
            text_body: formData.get('text_body'),
            creator: userId,
            // images,
        };

        // Upload image(s) to Cloudinary
        const imageUploadPromises = [];

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            // Convert the image data to base64
            const imageBase64 = imageData.toString('base64');

            // Make request to upload to Cloudinary
            const result = await cloudinary.uploader.upload(
                `data:image/png;base64,${imageBase64}`, {
                    folder: 'hikes'
                }
            );

            imageUploadPromises.push(result.secure_url);

            // Wait for all images to upload
            const uploadedImages = await Promise.all(imageUploadPromises);
            // Add uploaded images to the hikeData object
            hikeData.images = uploadedImages;
        }

        // console.log("Hike Data:", hikeData);

        const newHike = new Hike(hikeData);
        await newHike.save();

        // console.log("New Hike Saved:", newHike);

        return Response.redirect(`${process.env.NEXTAUTH_URL}/hikes/${newHike._id}`);
    } catch (error) {
        console.error("Error adding new hike:", error);
        return new Response('Failed to add hike', { status: 500 });
    }
}
