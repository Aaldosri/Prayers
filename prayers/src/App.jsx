import "./App.css";
import { useEffect, useState } from "react";

// External Libraries
import axios from "axios";

// Img
import img1 from "./img/Fajr.png";
import img2 from "./img/Duhur.png";
import img3 from "./img/Asr.png";
import img4 from "./img/Maghreb.png";
import img5 from "./img/Esha.png";
import Prayers from "./Components/Prayers";
import Content from "./Components/Content";

const prayers = [
  { name: "الفجر", key: "Fajr", image: img1 },
  { name: "الظهر", key: "Dhuhr", image: img2 },
  { name: "العصر", key: "Asr", image: img3 },
  { name: "المغرب", key: "Maghrib", image: img4 },
  { name: "العشاء", key: "Isha", image: img5 },
];

function App() {
  const [selectedCity, setSelectedCity] = useState("الرياض");

  const [timing, setTiming] = useState({
    Fajr: "00:00",
    Dhuhr: "00:00",
    Asr: "00:00",
    Maghrib: "00:00",
    Isha: "00:00",
  });
  useEffect(() => {
    const fetchData = async () => {
      const getTiming = `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=SA`;

      const response = await axios.get(getTiming);
      const timings = response.data.data.timings;
      setTiming({
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
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
        <Content
          selectedCity={selectedCity}
          handleSelect={handleSelect}
          timing={timing}
        />
        <hr style={{ width: "80%", marginBottom: "30px" }}></hr>

        <section>
          <Prayers prayers={prayers} timing={timing} />
        </section>
      </div>
    </>
  );
}

export default App;
