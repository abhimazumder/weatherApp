import { useEffect, useState } from "react";
import "./App.css";
import { getWeather } from "./Controllers/SearchController";
import CurrentWeatherCard from "./Cards/CurrentWeatherCard";
import HourlyWeatherCard from "./Cards/HourlyWeatherCard";
import { Container, Grid } from "@mui/material";
import SearchCard from "./Cards/SearchCard";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [weatherDetails, setWeatherDetails] = useState(null);

  const updateSelectedOption = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    if (!selectedOption) return;

    const controller = new AbortController();
    const signal = controller.signal;

    getWeather(selectedOption?.latitude, selectedOption?.longitude, signal)
      .then((res) => {
        setWeatherDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      controller.abort();
    };
  }, [selectedOption]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Container sx={{ my: "85px" }}>
        <Grid container>
          <Grid item xs={12}>
            <SearchCard updateSelectedOption={updateSelectedOption} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} padding={0.5} paddingTop={4}>
            {weatherDetails && selectedOption && (
              <CurrentWeatherCard
                weatherDetails={weatherDetails}
                selectedOption={selectedOption}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={8} padding={0.5} paddingTop={2.1}>
            {weatherDetails && (
              <HourlyWeatherCard
                currentTime={weatherDetails?.current?.time}
                temperatureList={weatherDetails?.hourly?.temperature_2m}
                timeList={weatherDetails?.hourly?.time}
                units={weatherDetails.hourly_units}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
