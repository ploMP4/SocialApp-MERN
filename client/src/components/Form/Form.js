import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";

const Form = () => {
  const classes = useStyles();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleSubmit = (e) => {
      e.preventDefault();

      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
  }

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };


  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own posts and like others.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h3" style={{paddingBottom: 10}} >Create a Post</Typography>
        <TextField name="title" variant="outlined" label="Title" className={classes.textField} value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
        <TextField
          name="content"
          variant="outlined"
          label="Content"
          multiline
          rows={4}
          value={postData.message}
          className={classes.textField}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          className={classes.textField}
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => { setPostData({ ...postData, selectedFile: base64 })}} />
        </div>
        <Button variant="contained" color="primary" size="large" type="submit" className={classes.buttonSubmit}>Submit</Button>
        <Button variant="contained" color="secondary" size="large" className={classes.buttonSubmit} onClick={clear}>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
