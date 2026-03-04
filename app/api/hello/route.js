export async function GET(request) {
    return Response.json({ 
      message: "This is a GET request",
      method: "GET"
    })
  }
  
  export async function POST(request) {
    const body = await request.json()
    
    return Response.json({ 
      message: "This is a POST request",
      method: "POST",
      receivedData: body
    })
  }