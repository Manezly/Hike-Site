const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;


// Fetch all hikes + pagination
const fetchHikes = async() => {
    try {
        // Handle the case where the domain is not available yet
        if (!apiDomain) {
            return [];
        }

      const res = await fetch(`${apiDomain}/hikes`, {cache:'no-store'});
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
      return [];
    }
}

// Fetch single hike
const fetchSingleHike = async(id) => {
    try {
        // Handle the case where the domain is not available yet
        if (!apiDomain) {
            return null;
        }

      const res = await fetch(`${apiDomain}/hikes/${id}`);
  
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
}

export { fetchHikes, fetchSingleHike };
