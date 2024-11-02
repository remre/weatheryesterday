import Image from 'next/image';
import { WeatherCardProps } from '@/types/types';

export const WeatherCard: React.FC<WeatherCardProps> = ({
  time,
  temp,
  summary,
  tempp,
  feelsLike,
  humidity,
  windSpeed,
  weather_overview,
  conditions,
  rainAmount,
  snowAmount,
  pop,
  iconUrl,
  type,
}) => {
  return (
    <div
      className={` bg-white p-6 rounded-lg shadow-md  bg-opacity-90 transition-transform transform justify-center  flex ${
        type === 'Hourly' ? 'flex-row items-center justify-center space-x-2' : 'flex-col'
      } space-y-2 `}
    >
      {/* <h1>{type} Weather</h1>
        <div className="flex flex-col"> */}
      {time && <p className="text-lg font-semibold text-gray-700  mr-2">{time}</p>}
      {/* {date && (
            <p className="text-lg font-semibold text-gray-700">
              <strong>Date:</strong> {date}
            </p>
          )} */}
      {/* </div> */}
      <hr className="my-4 border-gray-300" />
      <div className="flex flex-row items-center pt-2">
        {temp !== undefined && (
          <p className="text-3xl font-bold text-blue-600">{Math.round(temp)}°C</p>
        )}
        {iconUrl && (
          <Image src={iconUrl} alt="Weather Icon" width={40} height={40} className=" w-16 mx-4" />
        )}
        {tempp?.day && tempp.night && (
          <div className="flex-col flex">
            <div className="flex flex-row">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                <strong>Temperature:</strong> {Math.round(tempp.day)}°C /
              </p>
              <p className="text-xl font-bold text-blue-900  flex items-end">
                &nbsp;{Math.round(tempp.night)} °C
              </p>
            </div>

            {/* <p className="text-3xl font-bold text-blue-800">
              <strong>Night Temperature:</strong>°C
            </p> */}
          </div>
        )}
      </div>
      {tempp?.max && tempp?.min && (
        <div className="flex flex-row">
          <p className="text-xl font-bold text-black  ">Min: &nbsp;{Math.round(tempp.min)} °C</p>
          <p className="text-xl font-bold text-black  ">
            &nbsp; Max: &nbsp;{Math.round(tempp.max)} °C
          </p>
        </div>
      )}

      {feelsLike !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Feels Like:</strong> {Math.round(feelsLike)}°C
        </p>
      )}
      {humidity !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Humidity:</strong> {humidity}%
        </p>
      )}
      {weather_overview !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Weather Overview:</strong> {weather_overview}
        </p>
      )}
      {windSpeed !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Wind:</strong> {windSpeed} km/h
        </p>
      )}

      {rainAmount && (
        <p className="text-lg text-gray-600">
          <strong>Rain: </strong>
          {rainAmount}
        </p>
      )}
      {pop !== undefined && (
        <p className="text-lg text-gray-600">
          <strong>Rain Probability:</strong> {pop * 100}%
        </p>
      )}
      {snowAmount && (
        <p className="text-lg text-gray-600">
          <strong>Snow: </strong>
          {snowAmount}
        </p>
      )}
      {summary && (
        <p className="text-lg font-semibold text-gray-700">
          <strong>Summary:</strong> {summary}
        </p>
      )}
      {conditions && (
        <div className=" items-center  flex flex-row">
          <strong>Conditions:</strong>
          <span className="ml-2 min-w-20 ">{conditions[0].description}</span>
          {/* ({conditions[0].main}) */}

          {/* <FontAwesomeIcon
              icon={getWeatherIcon(conditions[0].main)}
              width={70}
              height={70}
              className="ml-2"
            /> */}
        </div>
      )}
    </div>
  );
};
