const fetchData = async (url: string) => {
    const cache = await caches.open('api-cache');
    const cachedResponse = await cache.match(url);
  
    if (cachedResponse) {
      return cachedResponse.json();
    }
    const response = await fetch(url);
    const data = await response.json();
    cache.put(url, new Response(JSON.stringify(data)));
    return data;
  };