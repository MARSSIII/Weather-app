import "../../styles/WeatherCard.css";

const CurrentWeatherCard = ({ data }) => {
  if (!data) return null;

  const { main, weather, name, sys } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  return (
    <div className="weather-hero">
      <div className="weather-hero__header">
        <div className="weather-hero__info">
          <h2 className="weather-hero__city">
            {name}, {sys.country}
          </h2>
          <p className="weather-hero__desc">{weather[0].description}</p>
        </div>
        <img
          src={iconUrl}
          alt={weather[0].main}
          className="weather-hero__icon"
        />
      </div>

      <div className="weather-hero__body">
        <span className="weather-hero__temp">{Math.round(main.temp)}°</span>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
