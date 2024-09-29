import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/util/database";

export async function POST(request) {
  console.log("POST request received");

  try {
    // Fetch the session
    const session = await getServerSession(authOptions);
    console.log("Session obtained:", session);

    if (!session) {
      console.log("Unauthorized access - No session found");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Retrieve the data from the request body
    let data;
    try {
      data = await request.json();
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      return new Response(JSON.stringify({ error: "Invalid JSON data" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    
    const { occupation} = data;
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzz')
    console.log(data)
    console.log("Form data received:", { occupation });

    // Connect to the MongoDB database
    console.log("Connecting to the database...");
    const client = await connectDB();
    console.log("Database connection successful");

    const db = client.db('dream-catcher'); // Replace 'your-database-name' with your actual DB name
    const usersCollection = db.collection('users'); // Replace 'user' with the collection name if needed

    // Update the user document with the received data
    const result = await usersCollection.updateOne(
      { email: session.user.email }, // Assuming the session has user email information
      {
        $set: {
          occupation: occupation,
        },
      }
    );

    console.log('afasfdasfdsadfasdfasfasfdsafasdf')
    console.log(result)

    if (result.matchedCount === 0) {
      console.log("No document was updated, user might not exist");
      return new Response(JSON.stringify({ message: "No document was updated, user might not exist." }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log("User information updated successfully");
    return new Response(JSON.stringify({ message: "User information updated successfully!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Error updating user information:", error);
    return new Response(JSON.stringify({ error: "An error occurred while updating user information" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
