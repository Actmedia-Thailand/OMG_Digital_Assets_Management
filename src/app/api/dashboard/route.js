import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.USERNAMEOMG;
const password = process.env.PASSWORDOMG;
const apiUrl =
	"https://stacks.targetr.net/rest-api/v1/screens?groupId=034CD62B516544";

const THAI_TIME_OFFSET = 7 * 60 * 60 * 1000; // UTC+7 hours in milliseconds
const FIVE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds

function formatTimestamp(timestamp) {
	const date = new Date(Number(timestamp) + THAI_TIME_OFFSET);
	return date.toISOString().replace("T", " ").substring(0, 19); // Convert to 'YYYY-MM-DD HH:mm:ss'
}

export async function GET() {
	try {
		const options = {
			headers: {
				Authorization:
					"Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
			},
		};

		const response = await axios.get(apiUrl, options);

		const rawData = response.data;

		const currentTime = Date.now(); // Get current time in milliseconds

		const normalizeData = rawData.map((obj) => {
			const lastOnline = obj.data.lastLoaderCommsMillis
				? formatTimestamp(obj.data.lastLoaderCommsMillis)
				: "-";
			const lastLoaderMillis = Number(obj.data.lastLoaderCommsMillis) || 0;
			const status =
				currentTime - lastLoaderMillis > FIVE_DAYS_IN_MS ? "offline" : "online";

			return {
				screenId: obj.data.screenId || "-", // Replace missing field with '-'
				label: obj.data.label || "-", // Replace missing field with '-'
				storeLocation: obj.data.storeLocation || "-", // Replace missing field with '-'
				storeSection: obj.data.storeSection || "-", // Replace missing field with '-'
				displaysConnected: obj.data.displaysConnected || "-", // Replace missing field with '-'
				lastOnline, // Renamed field
				status, // Added status field
			};
		});

		return new Response(JSON.stringify(normalizeData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error fetching data: ", error);
		return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
}
