import { Box } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        backdropFilter: "blur(16px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinkedInIcon
        style={{ color: "white", cursor:"pointer" }}
        onClick={() =>
          window.open("https://www.linkedin.com/in/abhish-mazumder/", "_blank")
        }
      />
    </Box>
  );
};

export default Footer;