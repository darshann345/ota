import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box>

                    </Box>
                    <Typography variant="h4" component="div" sx={{ display: "flex", justifyContent: "center" }}>
                        Order Tracking App
                    </Typography>


                </Toolbar>
            </AppBar>
        </Box>
    );
}
