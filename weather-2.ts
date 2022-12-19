type WeatherInfo =
  | {
      available: 1;
      humidity: number;
      temparature: number;
    }
  | { available: 0 };

async function getWeatherInfo(location: string) {
  const weatherResponse = await fetch(
    `https://someweatherapi.com/en/${location}`
  );
  if (!weatherResponse.ok) {
    throw new Error(weatherResponse.statusText);
  }
  const weatherInfo: WeatherInfo = await weatherResponse.json();
  if (weatherInfo.available === 0) {
    throw new Error("Weather information not available!");
  }
  return {
    humidty: weatherInfo.humidity,
    temparature: weatherInfo.temparature,
  };
}

async function main() {
  const currentWeatherInfo = await getWeatherInfo("london");
  console.log(`Temperature in London is: ${currentWeatherInfo.temparature}`);
  console.log(`Humidity in London is: ${currentWeatherInfo.humidty}`);
}

export {};
