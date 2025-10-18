export async function handler(event, context) {
  const PROPERTY_ID = "507259843"; // Replace with your GA4 property ID
  const API_KEY = process.env.GA_API_KEY; // Secure key stored in Netlify environment
  const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
      body: JSON.stringify({
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        limit: 5,
        orderBys: [{ desc: true, metric: { metricName: "screenPageViews" } }]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch GA4 data", details: error.message })
    };
  }
}
