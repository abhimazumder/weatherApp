import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Logo from "../assets/Logo";
import GitHubIcon from "@mui/icons-material/GitHub";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <Toolbar>
          <Logo size={15} color={"white"} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
          <GitHubIcon style={{ color: "white", cursor:"pointer" }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
