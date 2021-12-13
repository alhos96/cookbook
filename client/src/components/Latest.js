import React from "react";
import { Container, Box, Typography, Card, CardContent, CardMedia, CardActions, CardActionArea, Divider } from "@mui/material";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

//helpers

function Latest() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit, average, findLatest } = helpers;
  const { post } = methods;

  //global state
  const recipes = useSelector((state) => state.recipes.recipes);

  //local state
  const latest = findLatest(recipes);
  return (
    <Box sx={{ mt: 3 }}>
      <Typography color="primary" gutterBottom variant="h6" component="div">
        Latest
      </Typography>
      <div className="Latest">
        {latest &&
          latest.map((recipe, index) => {
            let date = moment(recipe.createdAt).format("YYYY-MM-DD hh:mm");
            return (
              <Card id={recipe._id} key={index} onClick={(e) => navigate(`/recipes/recipe/${recipe._id}`)} sx={{ mb: 1 }}>
                <CardActionArea>
                  <CardContent sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ flex: "1.8" }} variant="h6" component="div">
                      {recipe.name}
                    </Typography>
                    <Typography sx={{ flex: "1" }} variant="body3" color="text.secondary">
                      {date}
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

export default Latest;
