import "./App.css";
import { useEffect, useState } from "react";

// Material UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// External Libraries
import axios from "axios";
import dayjs from "dayjs";

// Img
import img1 from "./img/Fajr.png";
import img2 from "./img/Duhur.png";
import img3 from "./img/Asr.png";
import img4 from "./img/Maghreb.png";
import img5 from "./img/Esha.png";

const prayers = [
  {
    name: "الفجر",
    image: img1,
  },
  {
    name: "الظهر",
    image: img2,
  },
  {
    name: "العصر",
    image: img3,
  },
  {
    name: "المغرب",
    image: img4,
  },
  {
    name: "العشاء",
    image: img5,
  },
];

const cities = {
  Riyadh:
    "https://api.aladhan.com/v1/timingsByCity?city=Riyadh&country=SA&method=2",
  Dammam:
    "https://api.aladhan.com/v1/timingsByCity?city=Dammam&country=SA&method=2",
  Mecca:
    "https://api.aladhan.com/v1/timingsByCity?city=Mecca&country=SA&method=2",
  Tabuk:
    "https://api.aladhan.com/v1/timingsByCity?city=Tabuk&country=SA&method=2",
  Abha: "https://api.aladhan.com/v1/timingsByCity?city=Abha&country=SA&method=2",
};

function App() {
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <>
      <div className="main-div" dir="rtl">
        <div className="div-select">
          <div>
            <h2>ابريل 4/4/2025</h2>

            <h1>الرياض</h1>
          </div>
          <Box
            sx={{
              minWidth: 200,
              backgroundColor: "white",
              padding: "7px",
            }}
          >
            <FormControl fullWidth sx={{ color: "white" }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{
                  "&.Mui-focused": {
                    color: "black", // تغيير اللون إلى الأسود عند التركيز
                  },
                }}
              >
                المدينة
              </InputLabel>
              <Select
                sx={{ color: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCity}
                label="المدينة"
                sx={{
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                }}
              >
                <MenuItem value={10}>🏙️ الرياض</MenuItem>
                <MenuItem value={20}>🕋 مكة المكرمة</MenuItem>
                <MenuItem value={30}>🌊 الدمام</MenuItem>
                <MenuItem value={30}>⛰️ تبوك</MenuItem>
                <MenuItem value={30}>🌿 ابها</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div>
            <h1>متبقي على صلاة </h1>
            <h1>00:07:33</h1>
          </div>
        </div>
        <hr style={{ width: "80%", marginBottom: "30px" }}></hr>

        <section>
          <main>
            <div className="div-cards">
              {prayers.map((prayer, index) => {
                return (
                  <Card key={index} sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 240, height: 240, objectFit: "cover" }} // الحفاظ على الشكل المربع
                      image={prayer.image}
                      alt={prayer.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {prayer.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        <h1>10:30</h1>
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </main>
        </section>
      </div>
    </>
  );
}

export default App;
