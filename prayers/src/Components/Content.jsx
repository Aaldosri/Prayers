import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import moment from "moment";

// Material UI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useState, useEffect } from "react";

dayjs.locale("ar");
moment.locale("dz");

export default function Content({ selectedCity, handleSelect, timing }) {
  const [today, setToday] = useState();
  const [timer, setTimer] = useState(10);
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      setToday(now.format("dddd D MMMM YYYY | HH:mm")); // تحديث الوقت المعروض
    }, 60000); // كل دقيقة

    // تحديث أولي قبل الانتظار لأول دقيقة
    const now = dayjs();
    setToday(now.format("dddd D MMMM YYYY | HH:mm"));

    let interval2 = setInterval(() => {
      // console.log("Calling Timer");
      setUpCountDownTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, [timing]);

  function setUpCountDownTimer() {
    const momentNow = moment();

    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timing["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timing["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timing["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timing["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);

    // Now After Knowing what the next Prayer is we can setup the coutdown timer by getting prayer's time

    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timing[nextPrayerObject.key];

    const remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midNightDiff = moment("00:00", "hh:mm");
      console.log("mid night iss ", midNightDiff.format("hh:mm"));
      console.log(midNightDiff);
      console.log(remainingTime);
    }

    console.log(remainingTime);
    const durationRemainingTime = moment.duration(remainingTime);

    console.log(
      durationRemainingTime.hours(),
      durationRemainingTime.minutes(),
      durationRemainingTime.seconds()
    );

    // console.log(remainingTime);
    console.log("next prayer time is", nextPrayerTime);
    // console.log(momentNow.isBefore(dayjs(timing["Fajr"], "hh:mm")));
  }

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
          <h1>متبقي على صلاة {prayersArray[nextPrayerIndex].displayName}</h1>
          <h1>00:07:33</h1>
        </div>
      </div>
    </>
  );
}
