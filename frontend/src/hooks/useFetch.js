import { useState, useEffect, useCallback } from 'react';
import useAuthContext from './useAuthContext';


const serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return '?' + str.join("&");
}



const BASE_URL = 'http://localhost:4000/api'


export const useFetch = (url, method = 'GET', runOnStart = true) => {
  const { token } = useAuthContext()
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const execute = useCallback(async (callback, body, queryParams) => {
    const customURL = queryParams ? BASE_URL + url + serialize(queryParams) : BASE_URL + url

    try {
      setError(null)
      setLoading(true)

      const response = await fetch(customURL, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: body ? JSON.stringify(body) : null
      })

      const json = await response.json();
      if (!response.ok) { // error coming back from server
        console.log(response.message);
        
        throw Error('could not fetch the data for that resource');
      }

      setLoading(false);
      setData(json);
      setError(null);
      if (callback) callback(json)
      return json
    }
    catch (e) {
      console.log(e.message);
      setLoading(false);
      setError(e.message);
    }
  }, [method, token, url])


  useEffect(() => {
    runOnStart && execute()
  }, [runOnStart, execute])

  return { data, isLoading, error, execute };
}
