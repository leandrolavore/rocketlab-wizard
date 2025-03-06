export async function GET(req: Request, { params }: { params: { placeId: string } }) {
  const { placeId } = params;

  const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    method: 'GET',
    headers: {
      'X-Goog-Api-Key': process.env.MAPS_KEY!,
      'X-Goog-FieldMask': 'addressComponents,formattedAddress'
    }
  });

  const { addressComponents, formattedAddress } = await response.json();

  console.log("🚀 ~ GET ~ addressComponents:", addressComponents)
  function getComponent(type: string) {
    return addressComponents.find((c: Record<string, string>) => c.types.includes(type))?.longText || '';
  }

  return Response.json({
    line1: formattedAddress,
    city: getComponent('locality'),
    state: getComponent('administrative_area_level_1'),
    postalCode: getComponent('postal_code'),
    country: getComponent('country')
  });
}