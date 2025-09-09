import { NextResponse } from "next/server";
import dns from "dns";
import { Agent } from "undici";

// Force IPv4 first
dns.setDefaultResultOrder("ipv4first");

// ✅ Undici Agent, not https.Agent
const agent = new Agent({
  connect: { family: 4 }, // force IPv4
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent": "almostus.in (contact@almostus.in)",
          "Accept-Language": "en",
        },
        dispatcher: agent, // ✅ correct for Node 18+ (Undici)
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("❌ Nominatim fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch location", details: err.message },
      { status: 500 }
    );
  }
}
