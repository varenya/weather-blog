type WeatherInfo = {
  available: number;
  humidity?: number;
  temparature?: number;
};
async function getWeatherInfo(location: string) {
  const weatherResponse = await fetch(
    `https://someweatherapi.com/en/${location}`
  );
  if (!weatherResponse.ok) {
    throw new Error(weatherResponse.statusText);
  }
  const weatherInfo: WeatherInfo = await weatherResponse.json();
  if (weatherInfo.available) {
    return {
      humidty: weatherInfo.humidity,
      temparature: weatherInfo.temparature,
    };
  }
}

async function main() {
  const currentWeatherInfo = await getWeatherInfo("london");
  if (
    currentWeatherInfo &&
    currentWeatherInfo.temparature &&
    currentWeatherInfo.humidty
  ) {
    console.log(`Temperature in London is: ${currentWeatherInfo.temparature}`);
    console.log(`Humidity in London is: ${currentWeatherInfo.humidty}`);
  }
}

export {};
