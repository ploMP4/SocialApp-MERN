import React, { useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch } from "react-redux";
import { deletePost, likePost, updatePost } from "../../../actions/posts";
import Likes from "./Likes";

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [tags, setTags] = useState(post.tags);
  const [title, setTitle] = useState(post.title);
  const [message, setMessage] = useState(post.message);
  const user = JSON.parse(localStorage.getItem("profile"));

  const updatePostHandler = () => {
    post.title = title;
    post.message = message;
    post.tags = tags;
    dispatch(updatePost(post._id, post));
    setEditing(!editing);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      {editing ? (
        <>
          <Typography variant="h6">Title: </Typography>
          <TextField
            value={title}
            variant="outlined"
            className={classes.editField}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography variant="h6">Message: </Typography>
          <TextField
            value={message}
            variant="outlined"
            className={classes.editField}
            onChange={(e) => setMessage(e.target.value)}
          />
          <CardActions className={classes.cardActions}>
            <Typography variant="h6">Tags: </Typography>
            {tags.map((tag, index) => (
              <TextField
                variant="outlined"
                className={classes.editField}
                value={tag}
                onChange={(e) =>
                  setTags([
                    ...tags.slice(0, index),
                    e.target.value,
                    ...tags.slice(index + 1),
                  ])
                }
              />
            ))}
            <Button
              color="primary"
              size="large"
              onClick={() => updatePostHandler()}
            >
              <SaveIcon fontSize="small" />
              Save
            </Button>
            <Button
              color="secondary"
              size="large"
              onClick={() => setEditing(!editing)}
            >
              <CancelIcon fontSize="small" />
              Cancel
            </Button>
          </CardActions>
        </>
      ) : (
        <>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
          </CardContent>

          <CardActions className={classes.cardActions}>
            <Button
              size="small"
              color="primary"
              disabled={!user?.result}
              onClick={() => dispatch(likePost(post._id))}
            >
              <Likes post={post} user={user} />
            </Button>
            {(user?.result?.googleId === post?.creator ||
              user?.result?._id === post?.creator) && (
              <>
                <Button
                  color="primary"
                  size="small"
                  onClick={() => setEditing(!editing)}
                >
                  <EditIcon fontSize="small" />
                  Edit
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(deletePost(post._id))}
                >
                  <DeleteIcon fontSize="small" />
                  Delete
                </Button>
              </>
            )}
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default Post;
