import { z } from "zod";

const availableWeatherInfo = z.object({
  available: z.literal(1),
  humidity: z.number(),
  temparature: z.number(),
});

const unavailableWeatherInfo = z.object({
  available: z.literal(0),
});

// https://zod.dev/?id=discriminated-unions
const WeatherInfoResponse = z.discriminatedUnion("available", [
  availableWeatherInfo,
  unavailableWeatherInfo,
]);

type WeatherInfo = z.infer<typeof WeatherInfoResponse>;

async function getWeatherInfo(location: string) {
  const weatherResponse = await fetch(
    `https://someweatherapi.com/en/${location}`
  );
  if (!weatherResponse.ok) {
    throw new Error(weatherResponse.statusText);
  }
  const weatherInfo = WeatherInfoResponse.parse(await weatherResponse.json());
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
