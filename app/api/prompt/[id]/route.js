import connectToDB from '@utils/database';
import Prompt from '@models/prompt'

//Get (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        const prompts = await Prompt.findById(params.id)
            .populate('creator');

        if (!prompts) return new Response("Prompts not found!", { status: 404 })

        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to get a prompts", {
            status: 500
        })
    }
}

//patch (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response("Prompts not found!", { status: 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to edit a prompts", {
            status: 500
        })
    }
}

//Delete (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted successfully!", { status: 200 })
    }
    catch (error) {
        return new Response("Failed to delete a prompts", {
            status: 500
        })
    }
}