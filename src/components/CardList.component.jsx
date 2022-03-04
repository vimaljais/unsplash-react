import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import "./CardList.style.scss";

const CardList = ({ imageList }) => {
  return (
    <div className="container">
      {imageList.length > 0 ? (
        <Box sx={{ width: "80vw", height: "auto", overflowY: "auto" }}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {imageList.map((item) => (
              <ImageListItem className="hover" key={item.id}>
                <img
                  src={`${item.urls.raw}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.urls.raw}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={"hehe"}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CardList;
