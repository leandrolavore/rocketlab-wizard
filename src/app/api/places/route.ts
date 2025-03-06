export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get('input');

  const response = await fetch(`https://places.googleapis.com/v1/places:autocomplete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.MAPS_KEY!,
    },
    body: JSON.stringify({
      input,
      locationBias: { // location bias in Australia
        rectangle: {
          low: { latitude: -43.6346, longitude: 113.3389 },
          high: { latitude: -10.6682, longitude: 153.5694 }
        }
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    return Response.json({ error }, { status: response.status });
  }

  const { suggestions } = await response.json();

  type Suggestion = {
    placePrediction: {
      placeId: string;
      structuredFormat: {
        mainText: { text: string; }
        secondaryText: { text: string; }
      }
    }
  };

  const flattened = suggestions.map((s: Suggestion) => {
    const prediction = s.placePrediction;
    return {
      placeId: prediction.placeId,
      displayName: prediction.structuredFormat.mainText.text,
      secondaryText: prediction.structuredFormat.secondaryText.text
    };
  });

  return Response.json(flattened);
}