import Image from 'next/image';
import { WeatherCardProps } from '@/types/types';

export const DailyWeatherCard: React.FC<WeatherCardProps> = ({
  time,
  temp,
  summary,
  tempp,
  windSpeed,
  conditions,
  rainAmount,
  snowAmount,
  pop,
  iconUrl,
}) => {
  // Dinamik sınıfları belirleme
  const tempClass =
    temp !== undefined ? (temp < 0 ? 'cold-weather' : temp > 30 ? 'hot-weather' : '') : '';
  const rainClass = rainAmount && parseFloat(rainAmount) > 10 ? 'rainy-weather' : '';
  const snowClass = snowAmount && parseFloat(snowAmount) > 10 ? 'snowy-weather' : '';
  const windClass = windSpeed !== undefined && windSpeed > 20 ? 'windy-weather' : '';

  return (
    <div className="lg:max-w-3xl bg-white p-6 rounded-lg shadow-md bg-opacity-90 flex flex-col lg:grid lg:grid-cols-2 lg:gap-4">
      {time && <p className="title-second mr-2">{time}</p>}
      <hr className="my-4 border-gray-300 lg:col-span-2" />
      <div className="flex flex-row items-center pt-2 lg:col-span-2 ">
        {temp !== undefined && (
          <p className={`text-3xl font-bold ${tempClass}`}>{Math.round(temp)}°C</p>
        )}
        {iconUrl && (
          <Image src={iconUrl} alt="Weather Icon" width={40} height={40} className="w-16 mx-4" />
        )}
        {tempp?.day && tempp.night && (
          <div className="flex-col flex">
            <div className="flex flex-row">
              <p className="text-xl sm:text-3xl font-bold text-yellow-400">
                <strong>Temp:</strong> {Math.round(tempp.day)}°C /
              </p>
              <p className="text-md sm:text-xl font-bold text-blue-900 flex items-end">
                &nbsp;{Math.round(tempp.night)} °C
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:text-nowrap mb-2 lg:my-4   ">
        <div className="flex flex-col space-y-4">
          {tempp?.max && tempp?.min && (
            <div className="flex flex-row">
              <p className="text-xl font-bold text-black">Min: &nbsp;{Math.round(tempp.min)} °C</p>
              <p className="text-xl font-bold text-black">
                &nbsp; Max: &nbsp;{Math.round(tempp.max)} °C
              </p>
            </div>
          )}
          {conditions && (
            <div className="body-regular">
              <strong>Conditions:</strong>
              <span className="ml-2 min-w-20 ">{conditions[0].description}</span>
            </div>
          )}
          {windSpeed !== undefined && (
            <p className={`body-regular ${windClass}`}>
              <strong>Wind:</strong> {windSpeed} km/h
            </p>
          )}
        </div>
        <div className="flex flex-col space-y-4 lg:ml-8">
          {rainAmount && (
            <p className={`body-regular ${rainClass}`}>
              <strong>Rain: </strong>
              {rainAmount}
            </p>
          )}
          {snowAmount && (
            <p className={`body-regular ${snowClass}`}>
              <strong>Snow: </strong>
              {snowAmount}
            </p>
          )}
          {pop !== undefined && (
            <p className="body-regular">
              <strong>Rain Probability:</strong> {(pop * 100).toFixed(1)}%
            </p>
          )}
        </div>
      </div>
      {summary && (
        <p className="body-regular font-semibold !text-gray-700 lg:col-span-2">
          <strong>Summary:</strong> {summary}
        </p>
      )}
    </div>
  );
};
