// app/api/data/route.ts — InAFlow Data API Route
// Returns the cached sync data from Vercel Blob

import { list } from "@vercel/blob";

export async function GET() {
  try {
    // Find the blob
    const { blobs } = await list({ prefix: "inaflow-data" });

    if (blobs.length === 0) {
      return Response.json({ error: "No data yet. Run a sync first." }, { status: 404 });
    }

    // Fetch the blob content
    const blobUrl = blobs[0].url;
    const res = await fetch(blobUrl);
    const data = await res.json();

    return Response.json(data);
  } catch (error: any) {
    console.error("Data fetch error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
