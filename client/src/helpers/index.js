import axios from "axios";

const helpers = {
  changeHandler: (e, userInput, setUserInput) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  },
  onSubmit: (e, dispatch, action, url, userInput, method, token) => {
    e.preventDefault();
    dispatch(action(url, userInput, method, token));
  },

  popoverOpen: (e, setAnchorEl) => {
    setAnchorEl(e.currentTarget);
  },

  popoverClose: (setAnchorEl) => {
    setAnchorEl(null);
  },

  average: (arr) => {
    let average = arr.reduce((a, b) => +a + +b, 0) / arr.length;
    return average.toFixed(2);
  },

  findTopRatings: (recipes, average, direction) => {
    let ranking = [];

    recipes.map((recipe, index) => {
      let ranked = {
        rating: average(recipe.rating),
        id: recipe._id,
      };
      ranking.push(ranked);
    });

    let sorted;
    if (direction === "asc") {
      sorted = ranking.sort((a, b) => +a.rating - +b.rating);
    } else sorted = ranking.sort((a, b) => +b.rating - +a.rating);

    let final = [];

    for (let i = 0; i < 3; i++) {
      final.push(recipes.find((element) => element._id === sorted[i].id));
    }

    return final;
  },

  findLatest: (recipes, direction) => {
    let latest = [];

    recipes.map((recipe, index) => {
      let dates = {
        date: recipe.createdAt,
        id: recipe._id,
      };
      latest.push(dates);
    });

    let sorted;
    sorted = latest.sort((a, b) => new Date(b.date) - new Date(a.date));

    let final = [];
    for (let i = 0; i < 3; i++) {
      final.push(recipes.find((element) => element._id === sorted[i].id));
    }

    return final;
  },

  getSomething: (method, url, setState) => {
    axios({
      method,
      url: `http://localhost:5000/${url}`,
    }).then((response) => {
      setState(response.data.data);
    });
  },
  postSomething: (method, url, data, token, setState) => {
    axios({
      method,
      data,
      headers: { Authorization: `Bearer ${token}` },
      url: `http://localhost:5000/${url}`,
    }).then((response) => {
      console.log(response);
      setState(response.data);
    });
  },

  // sorting
  sortCategory: (recipes, limit, direction, setData) => {
    let names = [];

    recipes.map((recipe, index) => {
      let name = {
        name: recipe.category,
        id: recipe._id,
      };
      names.push(name);
    });

    let sorted;
    if (direction === "asc") {
      sorted = names.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else
      sorted = names.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });

    let final = [];
    for (let i = 0; i < limit; i++) {
      final.push(recipes.find((element) => element._id === sorted[i].id));
    }

    setData(final);
  },
  sortRatings: (recipes, average, limit, direction, setData) => {
    let ranking = [];

    recipes.map((recipe, index) => {
      let ranked = {
        rating: recipe.rating.length > 0 ? average(recipe.rating) : 0,
        id: recipe._id,
      };
      ranking.push(ranked);
    });

    let sorted;
    if (direction === "asc") {
      sorted = ranking.sort((a, b) => +a.rating - +b.rating);
    } else sorted = ranking.sort((a, b) => +b.rating - +a.rating);

    let final = [];

    for (let i = 0; i < limit; i++) {
      final.push(recipes.find((element) => element._id === sorted[i].id));
    }

    setData(final);
  },

  sortLatest: (recipes, limit, direction, setData) => {
    let latest = [];

    recipes.map((recipe, index) => {
      let dates = {
        date: recipe.createdAt,
        id: recipe._id,
      };
      latest.push(dates);
    });

    let sorted;
    if (direction === "asc") {
      sorted = latest.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else sorted = latest.sort((a, b) => new Date(b.date) - new Date(a.date));

    let final = [];
    for (let i = 0; i < limit; i++) {
      final.push(recipes.find((element) => element._id === sorted[i].id));
    }

    setData(final);
  },

  sortAlphabeticalOrder: (recipes, limit, direction, setData) => {
    let names = [];

    recipes.map((recipe, index) => {
      let name = {
        name: recipe.name,
        id: recipe._id,
      };
      names.push(name);
    });

    let sorted;
    if (direction === "asc") {
      sorted = names.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else
      sorted = names.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });

    let final = [];
    for (let i = 0; i < limit; i++) {
      final.push(recipes.find((element) => element._id === sorted[i].id));
    }

    setData(final);
  },
};
const methods = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  put: "PUT",
  remove: "DELETE",
};

export { helpers, methods };
