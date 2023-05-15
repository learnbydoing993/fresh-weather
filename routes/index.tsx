import { Handlers, PageProps } from "$fresh/server.ts";
import { Weather } from "../components/Weather.tsx";

interface Data {
  result: WeatherResp | null;
  query: string;
}

export interface WeatherResp {
  location: WeatherLocation;
  current: WeatherCurrent;
}

interface WeatherLocation {
  name: string;
  country: string;
}

interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  humidity: number;
  feelslike_c: number;
  precip_mm: number;
  wind_kph: number;
  uv: number;
  gust_kph: number;
}

interface WeatherCondition {
  icon: string;
  text: string;
  code: number;
}

const apiKey = 'api-key-here'

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "London";
    const resp = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`);
    if (resp.status == 200) {
      const result: WeatherResp = await resp.json();
      return ctx.render({result, query});
    }
    return ctx.render({result: null, query});
  }
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <body class="bg-gray-200">
        <div class="mt-10 px-5 rounded shadow bg-blue-400 mx-auto flex max-w-screen-md flex-col justify-center py-12">
          <div class="mx-auto max-w-sm w-full">
            <h2 class="text-2xl font-bold mb-5 text-center">Fresh Weathers!</h2>
            <form>
              <input name="q" type="text" placeholder="Enter a city..." required class="w-full rounded-md  py-1.5 px-3.5  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400" />
            </form>
          </div>
          <Weather data={data.result} />
        </div>
    </body>
  );
}
