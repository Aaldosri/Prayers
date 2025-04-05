import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ar";

// Material UI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState, useEffect } from "react";

dayjs.locale("ar");

export default function Content({ selectedCity, handleSelect, timing }) {
  const [today, setToday] = useState();
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      setToday(now.format("dddd D MMMM YYYY | HH:mm")); // تحديث الوقت المعروض
    }, 60000); // كل دقيقة

    // تحديث أولي قبل الانتظار لأول دقيقة
    const now = dayjs();
    setToday(now.format("dddd D MMMM YYYY | HH:mm"));

    setInterval(() => {
      setTimer(timer - 1);
    }, 500);

    return () => clearInterval(interval); // تنظيف
  }, []);
  return (
    <>
      <div className="div-select">
        <div>
          <h2> {today}</h2>

          <h1>{selectedCity}</h1>
          <h2>{timer}</h2>
        </div>
        <Box sx={{}}>
          <FormControl
            fullWidth
            sx={{
              color: "white",
              background: "white",
              maxWidth: "40%",
              backgroundColor: "white",
              padding: "7px",
              borderRadius: "10px",
            }}
          >
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                margin: "7px",
                "&.Mui-focused": {
                  color: "black", // تغيير اللون إلى الأسود عند التركيز
                },
              }}
            >
              المدينة
            </InputLabel>
            <Select
              sx={{ color: "white", maxWidth: "50%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCity}
              label="المدينة"
              onChange={handleSelect}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
                },
              }}
            >
              <MenuItem value="الرياض">🏙️ الرياض</MenuItem>
              <MenuItem value="مكة المكرمة">🕋 مكة المكرمة</MenuItem>
              <MenuItem value="الدمام">🌊 الدمام</MenuItem>
              <MenuItem value="تبوك">⛰️ تبوك</MenuItem>
              <MenuItem value="أبها">🌿 أبها</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div>
          <h1>متبقي على صلاة </h1>
          <h1>00:07:33</h1>
        </div>
      </div>
    </>
  );
}
