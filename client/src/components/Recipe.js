import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  CardMedia,
  CardActions,
  Rating,
  CircularProgress,
  Popover,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Edit, Grade } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { MoreLikeThisCard } from ".";
//helpers
import { getOneRecipe, userLeft, editRecipe } from "../store/recipesSlice";
import { helpers, methods } from "../helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Recipe() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changeHandler, onSubmit, popoverOpen, popoverClose, average } = helpers;
  const { get, patch } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const recipe = useSelector((state) => state.recipes.oneRecipe);
  const user = sessionStorage.getItem("user");

  //local state
  const url = window.location.pathname;
  const [expanded, setExpanded] = useState(false);
  const [userInput, setUserInput] = useState({
    recipeImage: "",
    name: "",
    author: "",
    rating: 0,
    description: "",
    ingredients: "",
    instructions: "",
  });

  //popoveer state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  //side effects
  useEffect(() => {
    dispatch(getOneRecipe(url, get, token));
    return () => {
      dispatch(userLeft());
    };
  }, [url]);

  useEffect(() => {
    setUserInput({
      recipeImage: recipe.recipeImage,
      name: recipe.name,
      author: recipe.author,
      rating: 0,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    });
  }, [recipe]);

  //event handlers
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Typography color="primary" gutterBottom variant="h6" component="div">
        Recipe
      </Typography>
      <div className="Recipe">
        {recipe ? (
          <>
            {" "}
            <Card className="recipe-card" sx={{ mb: 2, maxWidth: "768px", margin: "auto" }}>
              <CardHeader
                action={
                  <>
                    {recipe.author !== user && (
                      <IconButton aria-describedby={id} onClick={(e) => popoverOpen(e, setAnchorEl)} aria-label="grade">
                        <Grade />
                      </IconButton>
                    )}

                    {recipe.author === user && (
                      <IconButton onClick={() => navigate(`/recipes/edit-recipe/${recipe._id}`)} aria-label="settings">
                        <Edit />
                      </IconButton>
                    )}
                  </>
                }
                title={`${recipe.name} by ${recipe.author}`}
                subheader={
                  recipe.rating.length > 3 ? (
                    <Rating name="half-rating" defaultValue={average(recipe.rating)} precision={0.5} readOnly />
                  ) : (
                    "3 or more ratings needed"
                  )
                }
              />
              <CardMedia
                className="recipe-img"
                component="img"
                height="194"
                image={recipe.isSeeded ? recipe.recipeImage : `http://localhost:5000/uploads/${recipe.recipeImage}`}
                alt={recipe.name}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {recipe.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Typography sx={{ ml: 1 }} children={recipe.category} variant="body2" />
                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Instructions:</Typography>
                  <Typography paragraph>{recipe.instructions}</Typography>
                </CardContent>
              </Collapse>
            </Card>
            {/*  MORE LIKE THIS */}
            <MoreLikeThisCard category={recipe.category} nameToAvoid={recipe.name} idToAvoid={recipe._id} />
            {/* POPOVER */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => popoverClose(setAnchorEl)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 1 }} component="form">
                <Rating
                  readOnly={recipe && recipe.usersWhoRated.includes(user)}
                  name="rating"
                  onChange={(e) => changeHandler(e, userInput, setUserInput)}
                  precision={0.5}
                />
                <br></br>
                <Button
                  disabled={recipe && recipe.usersWhoRated.includes(user)}
                  onClick={(e) => {
                    onSubmit(e, dispatch, editRecipe, `/recipes/rate-recipe/${recipe._id}`, userInput, patch, token);
                    popoverClose(setAnchorEl);
                  }}
                  size="small"
                  color="secondary"
                  className="link"
                >
                  {recipe && recipe.usersWhoRated.includes(user) ? "already rated" : "rate"}
                </Button>
              </Box>
            </Popover>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
}

export default Recipe;
