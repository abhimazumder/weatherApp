import { Grid } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirIcon from "@mui/icons-material/Air";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import PropTypes from 'prop-types';

const Logo = ({size, color}) => {
    const style = {
        height: `${size}px`,
        width: `${size}px`,
        color: color,
        border: `${size === 30 ? 2 : .2}px solid ${color}`,
        padding: size === 30 ? 4 : 2,
      }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        padding:"15px",
        width:`${3*size}px`, height:`${3*size}px`
      }}
    >
      <Grid
        item
        container
        xs={12}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={6}>
          <WbSunnyIcon
            style={style}
          />
        </Grid>
        <Grid item xs={6}>
          <AcUnitIcon
            style={style}
          />
        </Grid>
        <Grid item xs={6}>
          <AirIcon
            style={style}
          />
        </Grid>
        <Grid item xs={6}>
          <ThunderstormIcon
            style={style}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Logo.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
}

export default Logo;