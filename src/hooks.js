import { useState, useEffect } from "react";
import axios from "axios";

const useFlip = () => {
	const [ state, setState ] = useState(true);
	const toggleState = () => {
		setState((state) => !state);
	};
	return [ state, toggleState ];
};

const useAxios = (keyInLS, baseUrl) => {
  const [responses, setResponses] = useLocalStorage(keyInLS);

  const addResponseData = async (formatter = data => data, restOfUrl = "") => {
    const response = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponses(data => [...data, formatter(response.data)]);
  };

  const clearResponses = () => setResponses([]);

  return [responses, addResponseData, clearResponses];
}

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    let value
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || JSON.stringify(defaultValue)
      )
    } catch (e) {
      console.log(e)
      value = defaultValue;
    }
    return value;
  })
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState];
}
  



export { useFlip, useAxios, useLocalStorage };
