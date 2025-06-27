export const SelectTravelLists = [

  {
    id: 1,
    title: 'Just Me',
    desc: 'A solo traveles in exploratio ',
    icon: '✈️',
    people: '1'
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two Traveles in tandem ',
    icon: '🥂',
    people: '2 People'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '🏡',
    people: '3 to 5 People'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekes',
    icon: '⛵',
    people: '5 to 10 People'
  },

]
export const SelectBudgetOptions = [

  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscioius of costs',
    icon: '💵',

  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',

  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Dont worry about cost',
    icon: '💸',

  },


]

export const AI_PROMPT = `You are a helpful travel assistant.

Generate a travel plan in which suggest hotels at least 5 and itinerary according to noOfDays and rentedVehicleInformation of different types as many as possible  in strict JSON format only. Do not include markdown syntax, commentary, or code blocks.

Respond with a JSON object in the following structure:

{
  "travelPlan": {
    "location": "{location}",
    "noOfDays": "{noOfDays}",
    "budget": "{budget}",
    "travellers": "{traveler}",
    "hotels": [
      {
        "hotelName": "...",
        "hotelAddress": "...",
        "price": "per-night",
        "imageUrl": "...",
        "geoCoordinates": { "latitude": "...", "longitude": "..." },
        "rating": "...",
        "description": "..."
      }
    ],
    "itinerary": [
      {
        "day": "1",
        "plan": [
          {
            "placeName": "...",
            "placeDetails": "...",
            "placeImageUrl": "...",
            "geoCoordinates": { "latitude": "...", "longitude": "..." },
            "ticketPricing": "...",
            "timeToTravel": "...",
            "bestTimeToVisit": "time will be in format of from - to"
          }
        ]
      }
    ],
    "rentedVehicleInformation": [
      {
        
      "type": "...",
        "vechile": [
          { 
            "name":"...",
            "estimatedDailyCost": "...",
            "notes": "...",
            "imageUrl": "..."
          },
          {
            "name":"...",
            "estimatedDailyCost": "...",
            "notes": "...",
            "imageUrl": "..."
          },
          {
            "name":"...",
            "estimatedDailyCost": "...",
            "notes": "...",
            "imageUrl": "..."
          },

        ],
      }
    ]
  }
}


Ensure the JSON is properly closed with all the closing brackets and can be parsed using JSON.parse().
Only return JSON, no other text.
`.trim()
  ;




