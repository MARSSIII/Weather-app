import AppShell from "./components/layout/AppShell";
import Header from "./components/layout/Header";
import Menu from "./components/layout/Menu.jsx";

import CurrentWeatherCard from "./components/weather/CurrentWeatherCard";
import WeatherMetrics from "./components/weather/WeatherMetrics";
import SunCycle from "./components/weather/SunCycle";
import ForecastList from "./components/weather/ForecastList";
import AQICard from "./components/weather/AQICard";

import Loader from "./components/common/Loader";
import ErrorState from "./components/common/ErrorState";
import EmptyState from "./components/common/EmptyState";

import { UnitProvider } from "./context/UnitContext";
import { WeatherProvider, useWeather } from "./context/WeatherContext";

import "./styles/Dashboard.css";

const Dashboard = () => {
  const { weatherData, forecastData, aqiData, loading, error } = useWeather();

  if (loading) return <Loader />;
  if (error) return <ErrorState message={error} />;
  if (!weatherData) return <EmptyState />;

  return (
    <div className="dashboard">
      <div className="dashboard__area dashboard__area--hero">
        <CurrentWeatherCard data={weatherData} />
      </div>

      <div className="dashboard__area dashboard__area--metrics">
        <WeatherMetrics data={weatherData} />
      </div>

      <div className="dashboard__area dashboard__area--forecast">
        <ForecastList data={forecastData} />
      </div>

      <div className="dashboard__area dashboard__area--sun">
        <SunCycle sys={weatherData.sys} timezone={weatherData.timezone} />
      </div>

      <div className="dashboard__area dashboard__area--aqi">
        <AQICard data={aqiData} />
      </div>
    </div>
  );
};

const AppContent = () => {
  const { hasData } = useWeather();
  const layoutMode = hasData ? "view--results" : "view--search";

  return (
    <AppShell>
      <div className={`layout-wrapper ${layoutMode}`}>
        <div className="shell__controls-area">
          <Menu />
        </div>

        <Header />

        <main className="shell__viewport">
          <Dashboard />
        </main>
      </div>
    </AppShell>
  );
};

const App = () => {
  return (
    <UnitProvider>
      <WeatherProvider>
        <AppContent />
      </WeatherProvider>
    </UnitProvider>
  );
};

export default App;
