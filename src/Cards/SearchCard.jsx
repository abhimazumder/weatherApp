import { Button, Grid, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Logo from "../assets/Logo";
import SearchBar from "../Components/SearchBar";
import { useEffect } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { getLocalAddress } from "../Controllers/SearchController";

const SearchCard = ({ updateSelectedOption }) => {
  useEffect(() => {
    const geoCode = localStorage.getItem("geoCode");
    if (geoCode) {
      updateSelectedOption(JSON.parse(geoCode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        getLocalAddress(latitude, longitude)
          .then((res) => {
            const {
              address: {
                suburb: name,
                town: admin1,
                state: admin2,
                country,
                country_code,
              },
            } = res;

            const data = {
              latitude,
              longitude,
              name,
              admin1,
              admin2,
              country,
              country_code: country_code.toUpperCase(),
            };

            localStorage.setItem("geoCode", JSON.stringify(data));

            updateSelectedOption(data);
          })
          .catch((err) => console.log(err));
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <Paper
      elevation={6}
      sx={{
        background: "linear-gradient(to right, #000000, #2d2d2d)",
        px: "60px",
        py: "30px",
        m: "4px",
      }}
    >
      <Grid container spacing={1}>
        <Grid
          item
          container
          xs={12}
          justifyContent={"center"}
          alignItems={"center"}
          mb={2}
        >
          <Logo size={30} color={"white"} />
          <Typography color={"white"} variant="h2">
            Weather App
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={9.5}>
          <SearchBar updateSelectedOption={updateSelectedOption} />
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={4}
          lg={2.5}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button
            size="large"
            variant="standard"
            sx={{
              textTransform: "none",
              border: "2px solid white",
              borderRadius: "30px",
              color: "white",
              height: "100%",
              width: "100%",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
            endIcon={<LocationOnIcon />}
            onClick={() => getUserLocation()}
          >
            <Typography variant="body2">Get my Location</Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

SearchCard.propTypes = {
  updateSelectedOption: PropTypes.any,
};

export default SearchCard;
