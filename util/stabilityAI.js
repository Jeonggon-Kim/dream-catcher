// /app/util/stabilityAI.js
import axios from "axios";
import fs from "fs/promises";
import FormData from "form-data";
import path from "path";

export async function generateImage(prompt, diaryId) {
  try {
    const payload = {
      prompt: prompt, // Use the diary summary as the prompt
      output_format: "webp",
    };

    const response = await axios.postForm(
      `https://api.stability.ai/v2beta/stable-image/generate/ultra`,
      axios.toFormData(payload, new FormData()),
      {
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_AI_API_KEY}`, // Make sure to add this key in your .env file
          Accept: "image/*",
        },
      }
    );

    if (response.status === 200) {
      // Define the path where the image will be saved
      const imagePath = path.join(process.cwd(), "public", "images", `${diaryId}.webp`);
      
      // Save the image to the public/images directory
      await fs.writeFile(imagePath, Buffer.from(response.data));
      
      return `/images/${diaryId}.webp`; // Return the relative path of the image
    } else {
      throw new Error(`${response.status}: ${response.data.toString()}`);
    }
  } catch (error) {
    console.error("Error generating image with Stability AI:", error);
    throw error;
  }
}
