import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" className={classes.container} spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
