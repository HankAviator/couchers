import { IconButton, Tooltip } from "@mui/material";
import classNames from "classnames";
import { HelpIcon } from "components/Icons";
import React from "react";
import makeStyles from "utils/makeStyles";

import ScoreBar from "./ScoreBar";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: 0,
    paddingLeft: theme.spacing(1),
  },

  root: {
    alignItems: "center",
    display: "flex",
    marginBottom: theme.spacing(2),
  },
}));

interface BarWithHelpProps {
  value: number;
  label: string;
  description: string;
  className?: string;
}

export default function BarWithHelp({
  value,
  label,
  description,
  className,
}: BarWithHelpProps) {
  const classes = useStyles();
  return process.env.NEXT_PUBLIC_IS_POST_BETA_ENABLED ? (
    <div className={classNames(classes.root, className)}>
      <ScoreBar value={value}>{label}</ScoreBar>
      <Tooltip title={description}>
        <IconButton
          aria-label="help icon"
          className={classes.button}
          size="large"
        >
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </div>
  ) : null;
}
