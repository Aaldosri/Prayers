import React from "react";

// Material UI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Prayers({ prayers, timing }) {
  return (
    <>
      <div className="div-cards">
        {prayers.map((prayer, index) => {
          return (
            <Card key={index} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                sx={{ width: 240, height: 240, objectFit: "cover" }}
                image={prayer.image}
                alt={prayer.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {prayer.name}
                </Typography>
                <Typography
                  className="div-timing"
                  variant="h2"
                  sx={{
                    fontSize:
                      !timing || !timing[prayer.key] ? "1.7rem" : undefined,
                  }}
                >
                  {timing
                    ? timing[prayer.key] || "جارٍ تحميل التوقيت"
                    : "جارٍ تحميل التوقيت"}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
