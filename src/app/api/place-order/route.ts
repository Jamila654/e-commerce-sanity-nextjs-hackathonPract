import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const SHIPPO_API_KEY = process.env.SHIPPO_API_KEY;

export async function POST(req: Request) {
  try {
    const { name, street1, city, state, zip, country, cart } = await req.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    const items = cart.map((item:any) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    console.log("Cart items:", items);


    const headers = {
      Authorization: `ShippoToken ${SHIPPO_API_KEY}`,
      "Content-Type": "application/json",
    };

    const toAddress = { name, street1, city, state, zip, country };
    const fromAddress = {
      name: "Your Store",
      street1: "123 Warehouse St.",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "US",
    };
    const parcel = {
      length: "10",
      width: "7",
      height: "4",
      distance_unit: "in",
      weight: "2",
      mass_unit: "lb",
    };

    const shipmentResponse = await fetch("https://api.goshippo.com/shipments/", {
      method: "POST",
      headers,
      body: JSON.stringify({
        address_from: fromAddress,
        address_to: toAddress,
        parcels: [parcel],
      }),
    });

    if (!shipmentResponse.ok) {
      const errorText = await shipmentResponse.text();
      throw new Error(
        `Shippo API error: ${shipmentResponse.status} - ${errorText}`
      );
    }

    const shipmentData = await shipmentResponse.json();

    const orderId = uuidv4();
    const trackingId = shipmentData.tracking_number || `TEMP-${orderId}`;
    const trackingUrl =
      shipmentData.tracking_url_provider || "https://example.com/track-order";

    return NextResponse.json({
      success: true,
      orderId,
      trackingId,
      trackingUrl,
    });
  } catch (error: any) {
    console.error("Error creating shipment:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}



