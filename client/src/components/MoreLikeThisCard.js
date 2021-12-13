import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Card, CardContent, CardMedia, Button, CardActionArea, Divider, Rating } from "@mui/material";
//helpers
import { getSimilarRecipes } from "../store/recipesSlice";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function MoreLikeThisCard({ category, idToAvoid }) {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit, average } = helpers;
  const { get } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const recipes = useSelector((state) => state.recipes.similarRecipes);

  //local state
  const [showAmount, setShowAmount] = useState(3);

  //side effects
  useEffect(() => {
    dispatch(getSimilarRecipes(`/recipes/similar-recipes/${category}`, get, token));
  }, []);

  //functions
  function windowSizeTracker() {
    if (window.innerWidth > 1020) {
      setShowAmount(4);
    }
    if (window.innerWidth < 1020) {
      setShowAmount(3);
    }
    console.log("resize");
  }

  window.onresize = windowSizeTracker;

  return (
    <>
      {" "}
      <Typography color="primary" gutterBottom variant="h6" component="div">
        More like this
      </Typography>
      <div className="More-like-this">
        {recipes.length > 1 ? (
          recipes.map((recipe, index) => {
            if (recipe._id !== idToAvoid && index < showAmount) {
              return (
                <Card key={index} id={recipe._id} onClick={(e) => navigate(`/recipes/recipe/${recipe._id}`)} sx={{ mb: 1 }}>
                  <CardActionArea>
                    <CardMedia component="img" height="140" image={recipe.recipeImage} alt="green iguana" />
                    <CardContent>
                      <div style={{ width: 200, whiteSpace: "nowrap" }}>
                        <Box
                          component="h2"
                          sx={{
                            fontWeight: 510,
                            textOverflow: "ellipsis",
                            my: 2,
                            overflow: "hidden",
                            bgcolor: "background.paper",
                          }}
                        >
                          {recipe.name}
                        </Box>
                      </div>
                      <Rating name="half-rating" value={average(recipe.rating)} precision={0.5} />
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            }
          })
        ) : (
          <Typography sx={{ mb: 2 }}>No more recipes in this category...</Typography>
        )}
      </div>
      <Button onClick={() => showAmount < recipes.length && setShowAmount((e) => e + 2)} size="small" className="link">
        Show more
      </Button>
      <Button onClick={() => showAmount > 3 && setShowAmount((e) => e - 2)} size="small" color="secondary" className="link">
        Show less
      </Button>
    </>
  );
}

export default MoreLikeThisCard;
