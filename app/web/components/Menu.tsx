import {
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  MenuItemProps as MuiMenuItemProps,
  MenuProps,
} from "@mui/material";
import classNames from "classnames";
import React from "react";
import makeStyles from "utils/makeStyles";

const useStyles = makeStyles((theme) => ({
  item: {
    paddingInline: theme.spacing(2),
  },
  itemMessage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemDivider: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default function Menu(props: Omit<MenuProps, "className">) {
  const classes = useStyles();
  return <MuiMenu {...props} />;
}

//forwarding ref is necessary because Menu
//injects refs into MenuItems
interface MenuItemProps extends Omit<MuiMenuItemProps, "className"> {
  hasNotification?: boolean;
  hasBottomDivider?: boolean;
}

export const MenuItem = React.forwardRef(
  (props: MenuItemProps, ref: React.ForwardedRef<HTMLLIElement>) => {
    const { hasNotification, hasBottomDivider, ...restProps } = props;

    const classes = useStyles();

    return (
      <MuiMenuItem
        {...restProps}
        className={classNames(classes.item, {
          [classes.itemMessage]: hasNotification,
          [classes.itemDivider]: hasBottomDivider,
        })}
        ref={ref}
      />
    );
  }
);

MenuItem.displayName = "MenuItem";
