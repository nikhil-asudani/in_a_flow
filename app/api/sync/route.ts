// app/api/sync/route.ts — InAFlow Sync API Route
// Triggered by: Vercel Cron (daily) or manual Refresh button

import { put } from "@vercel/blob";
import { runSync } from "@/lib/sync-engine";

export const maxDuration = 60; // Allow up to 60 seconds for Asana API calls

export async function GET(request: Request) {
  // Verify cron secret (if triggered by Vercel Cron)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const isManualRefresh = request.headers.get("x-manual-refresh") === "true";

  // If it's a cron trigger, verify the secret
  if (!isManualRefresh && cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const pat = process.env.ASANA_PAT;
  if (!pat) {
    return Response.json({ error: "ASANA_PAT not configured" }, { status: 500 });
  }

  try {
    // Run the full sync
    const result = await runSync(pat);

    // Save to Vercel Blob
    const blob = await put("inaflow-data.json", JSON.stringify(result), {
      access: "public",
      addRandomSuffix: false,
    });

    return Response.json({
      success: true,
      syncedAt: result.syncedAt,
      blobUrl: blob.url,
      analysts: Object.values(result.data).map((a: any) => ({
        name: a.analyst,
        active: a.metrics.activeLoad.tasks,
        overdue: a.metrics.overdue.tasks,
        signal: a.metrics.loadRatio.signal,
      })),
    });
  } catch (error: any) {
    console.error("Sync error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
