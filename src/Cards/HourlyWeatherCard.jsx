import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { compareDates, getTime } from "../Utils/Functions";

const HourlyWeatherCard = ({
  currentTime,
  temperatureList,
  timeList,
  units,
}) => {
  const [sixDayRecord, setSixDayRecord] = useState({});

  useEffect(() => {
    const dateTempMap = {};
    if (temperatureList && timeList && units) {
      for (let i = 0; i < timeList.length; i += 4) {
        const tempRecord = {
          time: timeList[i],
          temperature: temperatureList[i],
        };
        const date = timeList[i].split("T")[0];
        dateTempMap[date]
          ? dateTempMap[date].push(tempRecord)
          : (dateTempMap[date] = [tempRecord]);
      }
      setSixDayRecord(dateTempMap);
    }
  }, [temperatureList, timeList, units]);

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        borderRadius: "16px",
        boxShadow:
          "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {Object.keys(sixDayRecord).length === 0 ? (
        <></>
      ) : (
        Object.keys(sixDayRecord).map((dateKey, index) => (
          <Accordion
            key={dateKey}
            sx={{
              width: "100%",
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                width: "100%",
                height: "50px",
                backgroundColor: "#383838",
                borderTopLeftRadius: index === 0 ? "16px" : "none",
                borderTopRightRadius: index === 0 ? "16px" : "none",
                borderBottomLeftRadius:
                  index === Object.keys(sixDayRecord).length - 1
                    ? "16px"
                    : "none",
                borderBottomRightRadius:
                  index === Object.keys(sixDayRecord).length - 1
                    ? "16px"
                    : "none",
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
                {compareDates(dateKey, currentTime.split("T")[0])}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ mx: 2, p: 0 }}>
              {sixDayRecord[dateKey].map((ele, index) => (
                <div key={index} style={{ color: "white" }}>
                  {index !== 0 && (
                    <Divider sx={{ color: "white", padding: "5px" }} />
                  )}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Typography variant="h5" sx={{display:"flex", flexDirection:"row", gap:"5px"}}>
                      {ele?.temperature}{" "}
                      <Typography>{units?.temperature_2m}</Typography>
                    </Typography>
                    <Typography variant="h5">{getTime(ele?.time)}</Typography>
                  </div>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

HourlyWeatherCard.propTypes = {
  currentTime: PropTypes.string,
  temperatureList: PropTypes.array,
  timeList: PropTypes.array,
  units: PropTypes.object,
};

export default HourlyWeatherCard;