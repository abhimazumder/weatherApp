import PropTypes from "prop-types";
import { Grid, Paper, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ReactCountryFlag from "react-country-flag";
import { getDay, getTime, getLabel } from "../Utils/Functions";

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

  const formatLocation = () => {
    const { admin1, admin2, country } = selectedOption || {};
    const components = [admin1, admin2, country];
    return components.filter(Boolean).join(", ");
  };

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
      <Grid container spacing={2} padding={2}>
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
        <Grid item xs={6} container flexDirection="column">
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
          <Typography variant="body2">Temperature</Typography>
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
        <Grid
          container
          item
          xs={12}
          sx={{ marginTop: "30px" }}
          justifyContent="space-between"
        >
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
