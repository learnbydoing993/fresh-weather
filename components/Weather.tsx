import { WeatherResp } from "../routes/index.tsx";

interface WeatherProps {
  data: WeatherResp | null,
}

export function Weather({data}: WeatherProps) {
  if (!data) {
    return (
      <div class="m-10">
        <h2 class="text-center text-2xl font-bold">City not found!</h2>
        <img src="/not_found.svg" class="mx-auto"></img>
      </div>
    );
  }

  return (
    <div class="text-center">
      <div class="mx-auto p-5">
        <div class="text-2xl font-bold">{data.location.name}</div>
        <div class="text-xl">{data.location.country}</div>
        <div class="text-4xl my-4">{data.current.temp_c} °C</div>
        <div class="text-md">{data.current.condition.text}</div>
        <img src={data.current.condition.icon} alt="Logo" class="mx-auto"></img>
      </div>

      <div class="bg-blue-200 rounded shadow p-10 grid grid-cols-2 gap-4">
        <div>Feels like: {data.current.feelslike_c}</div>
        <div>Humidity: {data.current.humidity}</div>
        <div>Precipitation: {data.current.precip_mm}</div>
        <div>Cuurent UV: {data.current.uv}</div>
        <div>Winds: {data.current.wind_kph}</div>
        <div>Gust: {data.current.gust_kph}</div>
      </div>
    </div>
    // <div class="mx-auto">
    //   {data.location.name}
    //   {data.current.temp_c}
    // </div>
  );
}