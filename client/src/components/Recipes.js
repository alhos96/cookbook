import React, { useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia, CardActions, CardActionArea, Rating, Button, TextField } from "@mui/material";

//helpers
import { helpers } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Recipes() {
  //helpers
  const navigate = useNavigate();

  const { average } = helpers;

  //global state
  const recipes = useSelector((state) => state.recipes.recipes);

  //local state
  const [showAmount, setShowAmount] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Box component="div">
      <Typography color="primary" gutterBottom variant="h6" component="div">
        Recipes
      </Typography>
      <TextField size="small" type="text" fullWidth sx={{ mb: 2 }} label="Search" onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="Recipes">
        {recipes &&
          recipes
            // eslint-disable-next-line
            .filter((item) => {
              if (searchTerm === "") {
                return item;
              } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                return item;
              }
            })
            // eslint-disable-next-line
            .map((recipe, index) => {
              if (index < showAmount) {
                return (
                  <Card
                    id={recipe._id}
                    key={index}
                    onClick={(e) => navigate(`/recipes/recipe/${recipe._id}`)}
                    sx={{ minHeight: "200px", mb: 1 }}
                  >
                    <CardActionArea>
                      <CardMedia sx={{ p: 1 }}>
                        {recipe.rating.length > 3 ? (
                          <Rating name="half-rating" value={average(recipe.rating)} precision={0.5} readOnly />
                        ) : (
                          "3 or more ratings needed"
                        )}
                      </CardMedia>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {recipe.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {recipe.ingredients.join(", ")}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions sx={{ position: "relative", p: 1 }}>
                      <Typography variant="body2" sx={{ position: "absolute", right: "10px", bottom: "5px" }} children={recipe.category} />
                    </CardActions>
                  </Card>
                );
              }
            })}
      </div>
      <Button onClick={() => showAmount < recipes.length && setShowAmount((e) => e + 5)} size="small" className="link">
        Show more
      </Button>
      <Button onClick={() => showAmount > 5 && setShowAmount((e) => e - 5)} size="small" color="secondary" className="link">
        Show less
      </Button>
    </Box>
  );
}

export default Recipes;
