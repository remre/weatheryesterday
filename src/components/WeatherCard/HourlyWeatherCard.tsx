import React, { useState } from 'react';
import Image from 'next/image';
import { HourlyWeatherCardProps } from '@/types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export const HourlyWeatherCard: React.FC<HourlyWeatherCardProps> = ({
  time,
  temp,
  pop,
  rainAmount,
  snowAmount,
  conditions,
  iconUrl,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  // Dinamik sınıfları belirleme
  const tempClass =
    temp !== undefined ? (temp < 0 ? 'cold-weather' : temp > 30 ? 'hot-weather' : '') : '';
  const rainClass = rainAmount && parseFloat(rainAmount) > 10 ? 'rainy-weather' : '';
  const snowClass = snowAmount && parseFloat(snowAmount) > 10 ? 'snowy-weather' : '';

  return (
    <div
      className={`bg-white p-8 rounded-lg shadow-md bg-opacity-90 cursor-pointer transition-all duration-300 text-xl ${
        isExpanded ? 'max-h-96' : 'max-h-36'
      }`}
      onClick={handleCardClick}
    >
      <div className="flex flex-row items-center justify-between space-x-6 w-full">
        {time && <p className="text-lg font-semibold text-gray-700">{time}</p>}
        <div className="flex flex-row items-center ">
          {temp !== undefined && (
            <p className={`text-3xl font-bold ${tempClass}`}>{Math.round(temp)}°C</p>
          )}
          {iconUrl && (
            <Image src={iconUrl} alt="Weather Icon" width={40} height={40} className="w-16 mx-4" />
          )}
        </div>
        {conditions && (
          <div className="body-regular">
            <strong>Conditions:</strong>
            <span className="ml-2 ">{conditions[0].description}</span>
          </div>
        )}
        {pop !== undefined && (
          <p className="body-regular">
            <strong>Rain Probability:</strong> {(pop * 100).toFixed(1)}%
          </p>
        )}
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          className="text-gray-600 ml-4"
        />
      </div>
      {isExpanded && (
        <div className="flex flex-row justify-center w-full mt-4 space-x-4">
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
        </div>
      )}
    </div>
  );
};
