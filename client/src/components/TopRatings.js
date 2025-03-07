import React from "react";
import { Box, Typography, Card, CardContent, CardActionArea, Rating } from "@mui/material";
//helpers
import { helpers } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TopRatings() {
  //helpers
  const navigate = useNavigate();
  const { average, findTopRatings } = helpers;

  //global state
  const recipes = useSelector((state) => state.recipes.recipes);

  //local state
  const topRatings = findTopRatings(recipes, average);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography color="primary" gutterBottom variant="h6" component="div">
        Top Ratings
      </Typography>
      <div className="Top-ratings">
        {topRatings &&
          topRatings.map((recipe, index) => {
            return (
              <Card id={recipe._id} key={index} onClick={(e) => navigate(`/recipes/recipe/${recipe._id}`)} sx={{ mb: 1 }}>
                <CardActionArea>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ flex: "1.8" }} variant="h6" component="div">
                      {recipe.name}
                    </Typography>
                    <Typography sx={{ flex: "1" }} variant="body2" color="text.secondary">
                      <Rating name="half-rating" value={+average(recipe.rating) || ""} precision={0.5} readOnly />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </div>
    </Box>
  );
}

export default TopRatings;
