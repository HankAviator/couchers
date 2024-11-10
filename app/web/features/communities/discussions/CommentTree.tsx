import { CircularProgress, Typography } from "@mui/material";
import Alert from "components/Alert";
import Button from "components/Button";
import { useTranslation } from "i18n";
import { COMMUNITIES } from "i18n/namespaces";
import hasAtLeastOnePage from "utils/hasAtLeastOnePage";
import makeStyles from "utils/makeStyles";

import { useThread } from "../hooks";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const useStyles = makeStyles((theme) => ({
  commentsListContainer: {
    "& > * + *": {
      marginBlockStart: theme.spacing(2),
    },
    display: "flex",
    flexDirection: "column",
    marginBlockStart: theme.spacing(2),
    marginBlockEnd: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      //break out of page padding
      left: "50%",
      marginLeft: "-50vw",
      marginRight: "-50vw",
      position: "relative",
      right: "50%",
      width: "100vw",
    },
  },
  loadEarlierCommentsButton: {
    alignSelf: "center",
  },
  commentContainer: {
    display: "flex",
    padding: theme.spacing(2),
    width: "100%",
  },
  commentContent: {
    "& > * + *": {
      marginBlockStart: theme.spacing(0.5),
    },
    display: "flex",
    flexDirection: "column",
    marginInlineStart: theme.spacing(3),
  },
  noComment: {
    marginBlockEnd: theme.spacing(6),
  },
  avatar: {
    height: "3rem",
    width: "3rem",
  },
}));

interface CommentTreeProps {
  threadId: number;
}

export default function CommentTree({ threadId }: CommentTreeProps) {
  const { t } = useTranslation([COMMUNITIES]);
  const classes = useStyles();

  const {
    data: comments,
    error: commentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentsLoading,
  } = useThread(threadId);

  return (
    <>
      {commentsError && <Alert severity="error">{commentsError.message}</Alert>}
      {isCommentsLoading ? (
        <CircularProgress />
      ) : hasAtLeastOnePage(comments, "repliesList") ? (
        <div className={classes.commentsListContainer}>
          {hasNextPage && (
            <Button
              className={classes.loadEarlierCommentsButton}
              loading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              {t("communities:load_earlier_comments")}
            </Button>
          )}
          {comments.pages
            .flatMap((page) => page.repliesList)
            .reverse()
            .map((comment) => {
              return (
                <Comment key={comment.threadId} topLevel comment={comment} />
              );
            })}
        </div>
      ) : (
        comments &&
        !commentsError && (
          <Typography className={classes.noComment} variant="body1">
            {t("communities:no_comments")}
          </Typography>
        )
      )}
      <CommentForm shown threadId={threadId} />
    </>
  );
}
