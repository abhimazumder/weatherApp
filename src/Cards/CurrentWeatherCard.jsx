import PropTypes from "prop-types";
import { Grid, Paper, Typography } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { getDay, getTime, getLabel } from "../Utils/Functions";
import { getWeatherDescriptionImage } from "../Controllers/SearchController";
import { useEffect, useState } from "react";

const CurrentWeatherCard = ({ weatherDetails, selectedOption }) => {
  const excludeValues = [
    "time",
    "interval",
    "showers",
    "snowfall",
    "temperature_2m",
    "is_day",
    "weather_code",
  ];

  const [descAndImg, setDescAndImg] = useState({
    description: null,
    image: null,
  });

  const formatLocation = () => {
    const { admin1, admin2, country } = selectedOption || {};
    const components = [admin1, admin2, country];
    return components.filter(Boolean).join(", ");
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const setWeatherDescriptionAndImage = async () => {
      try {
        const { weather_code: weatherCode, is_day: isDay } =
          weatherDetails.current;
        const res = await getWeatherDescriptionImage(
          weatherCode,
          isDay,
          signal
        );
        res !== null && setDescAndImg(res);
      } catch (err) {
        console.log(err);
      }
    };
    setWeatherDescriptionAndImage();
    return () => {
      controller.abort();
    };
  }, [weatherDetails]);

  return (
    <Paper
      elevation={6}
      sx={{
        width: "100%",
        height: "350px",
        borderRadius: "10px",
        background:
          weatherDetails?.current?.is_day == "1"
            ? "linear-gradient(to bottom, #FFD700, #FF8C00)"
            : "linear-gradient(to bottom, #00008B, #000000)",
        backdropFilter: "blur(8px)",
        color: "white",
      }}
    >
      <Grid container spacing={2} paddingX={2}>
        <Grid item xs={6}>
          {weatherDetails?.current?.is_day == "1" ? (
            <WbSunnyIcon sx={{ fontSize: "120px" }} />
          ) : (
            <DarkModeIcon sx={{ fontSize: "120px" }} />
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: "6px",
              marginBottom: "3px",
            }}
          >
            <ReactCountryFlag countryCode={selectedOption?.country_code} svg />
            {selectedOption?.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: "12px", textAlign: "end" }}
          >
            {formatLocation()}
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={6}>
          <Typography
            variant="h3"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            {weatherDetails?.current?.temperature_2m?.toString() || <em>NA</em>}
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", marginLeft: "5px" }}
            >
              {weatherDetails?.current_units?.temperature_2m?.toString() || (
                <em>NA</em>
              )}
            </Typography>
          </Typography>
          <Typography
            variant="body2"
            style={{
              width:"100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {descAndImg?.description || <em>NA</em>}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          {Object.keys(weatherDetails.current)
            .filter((key) => !excludeValues.includes(key))
            .map((key) => (
              <Typography
                key={key}
                variant="body2"
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                {`${getLabel(key)}: ${
                  weatherDetails?.current[key]?.toString() || <em>NA</em>
                } ${
                  weatherDetails?.current_units[key]?.toString() || <em>NA</em>
                }`}
              </Typography>
            ))}
        </Grid>
        <Grid container item xs={12} mt="40px" justifyContent="space-between">
          <Typography variant="h5">
            {getDay(weatherDetails?.current?.time?.toString()) || <em>NA</em>}
          </Typography>
          <Typography variant="h5">
            {getTime(weatherDetails?.current?.time?.toString()) || <em>NA</em>}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

CurrentWeatherCard.propTypes = {
  weatherDetails: PropTypes.object,
  selectedOption: PropTypes.object,
};

export default CurrentWeatherCard;
