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
  const [nextPrayerIndex, setNextPrayerIndex] = useState(null);

  const [remainingTime, setRemainingTime] = useState("");

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
      setToday(now.format("dddd D MMMM YYYY | HH:mm:ss"));
    }, 1000);

    const now = dayjs();
    setToday(now.format("dddd D MMMM YYYY | HH:mm:ss"));

    let interval2 = setInterval(() => {
      setUpCountDownTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, [timing]);

  function setUpCountDownTimer() {
    if (!timing || Object.keys(timing).length === 0) {
      return;
    }

    const momentNow = moment();

    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timing["Fajr"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Dhuhr"], "HH:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timing["Dhuhr"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Asr"], "HH:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timing["Asr"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Maghrib"], "HH:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timing["Maghrib"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Isha"], "HH:mm"))
    ) {
      prayerIndex = 4;
    } else if (momentNow.isAfter(moment(timing["Isha"], "HH:mm"))) {
      prayerIndex = 0;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);

    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timing[nextPrayerObject.key];

    if (!nextPrayerTime) {
      setRemainingTime("جار تحميل الوقت...");
      return;
    }

    const [hour, minute] = nextPrayerTime.split(":");

    let nextPrayerMoment = moment().set({
      hour: parseInt(hour),
      minute: parseInt(minute),
      second: 0,
      millisecond: 0,
    });

    if (
      prayerIndex === 0 &&
      momentNow.isAfter(moment(timing["Isha"], "HH:mm"))
    ) {
      nextPrayerMoment.add(1, "day");
    } else if (nextPrayerMoment.isBefore(momentNow)) {
      nextPrayerMoment.add(1, "day");
    }

    const diff = nextPrayerMoment.diff(momentNow);
    const duration = moment.duration(diff);

    setRemainingTime(
      `${duration.seconds().toString().padStart(2, "0")} : ${duration
        .minutes()
        .toString()
        .padStart(2, "0")} : ${duration.hours().toString().padStart(2, "0")}`
    );
  }

  return (
    <>
      <div className="div-select">
        <div>
          <h2> {today}</h2>

          <h1>{selectedCity}</h1>
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
                  color: "black",
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
          <h1>
            {nextPrayerIndex !== null
              ? `متبقي على صلاة ${prayersArray[nextPrayerIndex].displayName}`
              : "جار تحميل الصلاة القادمة"}
          </h1>
          <h1>{remainingTime ? remainingTime : "جار تحميل الوقت"}</h1>
        </div>
      </div>
    </>
  );
}
