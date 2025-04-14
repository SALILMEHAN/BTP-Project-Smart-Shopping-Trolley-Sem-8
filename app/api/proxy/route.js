// app/api/proxy/route.js
export async function GET() {
  try {
    const res = await fetch(
      "https://btp-project-smart-shopping-trolley-sem-8.vercel.app/api/v1",
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Optional: avoids caching stale data
      }
    );

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch from remote API" }),
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
