import "./App.css";
import { useEffect, useState } from "react";

// External Libraries
import axios from "axios";
import dayjs from "dayjs";

// Img
import img1 from "./img/Fajr.png";
import img2 from "./img/Duhur.png";
import img3 from "./img/Asr.png";
import img4 from "./img/Maghreb.png";
import img5 from "./img/Esha.png";
import Prayers from "./Components/Prayers";
import Content from "./Components/Content";

const prayers = [
  {
    name: "الفجر",
    image: img1,
    time: "", // سيتم تحديثه لاحقًا
  },
  {
    name: "الظهر",
    image: img2,
    time: "",
  },
  {
    name: "العصر",
    image: img3,
    time: "",
  },
  {
    name: "المغرب",
    image: img4,
    time: "",
  },
  {
    name: "العشاء",
    image: img5,
    time: "",
  },
];

function App() {
  const [selectedCity, setSelectedCity] = useState("الرياض");
  const [timing, setTiming] = useState(null);
  const [prayersTimes, setPrayersTimes] = useState([
    { name: "الفجر", time: "" },
    { name: "الظهر", time: "" },
    { name: "العصر", time: "" },
    { name: "المغرب", time: "" },
    { name: "العشاء", time: "" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const getTiming = `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=SA`;

      const response = await axios.get(getTiming);

      const timing = response.data.data.timings;

      console.log(response);
      console.log(timing);

      setTiming({
        الفجر: timing.Fajr,
        الظهر: timing.Dhuhr,
        العصر: timing.Asr,
        المغرب: timing.Maghrib,
        العشاء: timing.Isha,
      });
    };

    fetchData();
  }, [selectedCity]);

  function handleSelect(event) {
    setSelectedCity(event.target.value);
  }

  return (
    <>
      <div className="main-div" dir="rtl">
        <Content selectedCity={selectedCity} handleSelect={handleSelect} />
        <hr style={{ width: "80%", marginBottom: "30px" }}></hr>

        <section>
          <Prayers prayers={prayers} timing={timing} />
        </section>
      </div>
    </>
  );
}

export default App;
