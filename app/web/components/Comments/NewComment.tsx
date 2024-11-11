import { Box, Button, Grid, Link } from "@mui/material";
import TextField from "components/TextField";
import React, { lazy, useState } from "react";
import makeStyles from "utils/makeStyles";

const Markdown = lazy(() => import("components/MarkdownNoSSR"));

const useStyles = makeStyles({
  reverseAlignment: {
    textAlign: "end",
  },
});

interface NewCommentProps {
  onComment: (comment: string) => Promise<void>;
}

export default function NewComment({ onComment }: NewCommentProps) {
  const classes = useStyles();
  const [preview, setPreview] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    await onComment(comment);
    setComment("");
  };

  return (
    <>
      <p>Write a comment:</p>
      <Grid container spacing={2}>
        <Grid item xs={12} md={preview ? 6 : 12}>
          <TextField
            id="new-comment"
            label="Text field"
            maxRows={5}
            multiline
            fullWidth
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            margin="normal"
          />
          <Box className={classes.reverseAlignment}>
            <Button component={Link} href="https://www.markdowntutorial.com/">
              Formatting?
            </Button>
            <Button component={Link} onClick={() => setPreview(!preview)}>
              Preview?
            </Button>
          </Box>
        </Grid>
        {preview && (
          <Grid item xs={12} md={6}>
            <Markdown source={comment} />
          </Grid>
        )}
      </Grid>
      <Button onClick={handleSubmit} type="submit">
        Comment
      </Button>
    </>
  );
}
