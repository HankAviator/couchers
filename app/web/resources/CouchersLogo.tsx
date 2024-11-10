import { Chip, SvgIcon } from "@mui/material";
import classNames from "classnames";
import { useAuthContext } from "features/auth/AuthProvider";
import Link from "next/link";
import makeStyles from "utils/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  logo: {
    fill: theme.palette.secondary.main,
    height: theme.typography.pxToRem(50),
    width: theme.typography.pxToRem(50),
  },
  sticker: {
    fontSize: "0.8rem",
    position: "absolute",
    transform: `rotate(15deg) translate(1.25rem, -0.625rem)`,
  },
}));

export interface CouchersLogoProps {
  className?: string;
}

export default function CouchersLogo({ className }: CouchersLogoProps) {
  const classes = useStyles();
  const { authState } = useAuthContext();

  return (
    <Link href={authState.authenticated ? "/dashboard" : "/login"}>
      <a className={classes.root}>
        <SvgIcon
          className={classNames(classes.logo, className)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-40.56 -109.255 512 512"
        >
          <g>
            <path d="M429.77,141.17c-6.13-27.92-29.28-45.76-56.45-45.78h0c-1.24,0-2.51.1-3.76.17-.69,0-1.37,0-2.07.1q-3,.27-5.95.83A53.55,53.55,0,0,0,346,102a58.09,58.09,0,0,0-9.11,6.09,59.13,59.13,0,0,0-18.56,26.44,51.17,51.17,0,0,0-2.8,15.89,49.61,49.61,0,0,0,.24,5.44,46.44,46.44,0,0,0,.87,5.43c1.77,8,3.93,15.93,6.43,23.78s5.35,15.57,8.5,23.12a.36.36,0,0,0,0,.09q4.08,9.81,8.36,19.59c.86,2,1.74,3.93,2.6,5.88q3.16,7.2,6.39,14.41c.71,1.59,1.44,3.2,2.15,4.78,4.44,9.87,8.94,19.8,13.53,29.93h0c1.16,2.58,2.31,5.11,3.49,7.71a4.88,4.88,0,0,0,8.81.23c11.56-22.9,40.94-83.94,51.16-119.41C430.82,161.88,431.86,150.72,429.77,141.17ZM385,174.63a24.61,24.61,0,0,1-5.44,2.27l-.47.11a21.6,21.6,0,0,1-2.29.47l-.79.11c-.78.09-1.57.14-2.37.16-.24,0-.48,0-.73,0a24.43,24.43,0,0,1-17-7.56,23,23,0,0,1-7-19.51c0-.25.08-.49.12-.74.08-.55.16-1.09.28-1.63.06-.29.16-.57.24-.86.12-.48.24-.95.39-1.42.1-.31.24-.62.36-.93s.31-.84.49-1.25.31-.62.47-.93.37-.78.58-1.15.37-.57.55-.86.45-.74.7-1.1.41-.52.61-.78.53-.71.82-1,.46-.49.7-.74.58-.64.89-.94.54-.47.81-.71.61-.56.94-.82.59-.43.89-.64.66-.49,1-.72.63-.37,1-.55.71-.44,1.08-.63.66-.31,1-.46.76-.37,1.15-.53.71-.25,1.06-.38.79-.29,1.19-.41.75-.19,1.13-.28.8-.22,1.22-.3.76-.11,1.14-.17.85-.14,1.29-.18.78,0,1.17-.06.93-.06,1.41-.06a26.93,26.93,0,0,1,2.86.19c.27,0,.53.09.8.13.68.1,1.35.22,2,.37l.8.21c.68.18,1.34.39,2,.63l.59.22a24.14,24.14,0,0,1,2.42,1.1h0a23.35,23.35,0,0,1,12.33,21.51A24.66,24.66,0,0,1,385,174.63Z" />
            <path d="M70.83,271.7c.9-1.88,1.84-3.83,2.79-5.83l.36-.75c.94-2,1.9-4,2.88-6.1.11-.23.22-.46.32-.69l3-6.5c.08-.18.16-.36.25-.54,2.1-4.54,4.24-9.23,6.37-14,.12-.25.23-.5.34-.76,1-2.24,2-4.5,3-6.76l.51-1.15c1-2.23,1.94-4.47,2.9-6.7l.48-1.13c1-2.28,1.94-4.57,2.89-6.84.11-.25.21-.5.31-.75q1.49-3.57,2.91-7.09l0-.07q1.41-3.5,2.74-6.92c.1-.27.21-.54.32-.81.83-2.17,1.64-4.29,2.42-6.39.13-.37.27-.73.4-1.1q1.14-3.09,2.18-6.06c.12-.34.24-.67.35-1,.69-2,1.35-4,2-5.85l.23-.71c.63-2,1.23-3.92,1.76-5.77a73.6,73.6,0,0,0,2.3-11.24,57.37,57.37,0,0,0-.6-19c-.41-1.88-.92-3.71-1.48-5.5-.18-.58-.41-1.14-.61-1.72-.41-1.18-.83-2.35-1.31-3.49-.27-.65-.57-1.28-.86-1.91-.47-1-1-2-1.48-3-.34-.63-.69-1.25-1-1.87-.54-.94-1.11-1.86-1.7-2.77-.39-.58-.78-1.16-1.18-1.73-.64-.9-1.31-1.77-2-2.62-.41-.51-.81-1-1.24-1.52-.78-.91-1.6-1.77-2.43-2.61-.38-.39-.74-.8-1.13-1.17a55.85,55.85,0,0,0-8-6.44c-.43-.29-.88-.54-1.32-.81-1-.63-2-1.25-3.11-1.81-.57-.3-1.14-.57-1.72-.85-1-.48-2-.94-3-1.37-.62-.26-1.26-.51-1.9-.75-1-.37-2-.73-3-1-.66-.21-1.32-.41-2-.59-1-.29-2.12-.54-3.19-.78-.66-.14-1.31-.29-2-.41-1.18-.22-2.36-.37-3.56-.51-.58-.07-1.16-.17-1.75-.22-1.65-.15-3.32-.23-5-.24l-.43,0h0c-1.24,0-2.51.1-3.76.17-.69,0-1.37,0-2.07.1q-3,.27-6,.83c-.44.08-.87.22-1.31.32h0c-28.55,6.09-49.9,36-43.59,64.49A280.5,280.5,0,0,0,16,208.2c11.34,27.2,23.75,54,36.56,82.39a4.88,4.88,0,0,0,8.81.23c2.43-4.8,5.64-11.29,9.29-18.85C70.74,271.88,70.78,271.79,70.83,271.7ZM33.34,153.15A23.88,23.88,0,0,1,44.7,133.24h0a24.52,24.52,0,0,1,2.82-1.5l.34-.16a24.65,24.65,0,0,1,6.13-1.8l.77-.11a25.56,25.56,0,0,1,2.92-.21l.44,0c13.73.09,24.13,10.74,23.79,24.36,0,.84-.08,1.67-.18,2.48,0,.24-.09.48-.13.72-.09.57-.17,1.13-.29,1.69-.07.28-.16.55-.23.83-.13.49-.25,1-.41,1.48-.1.3-.23.58-.34.87-.16.45-.32.91-.51,1.35-.13.29-.29.56-.42.85s-.4.84-.63,1.25-.35.56-.53.85-.45.76-.7,1.13-.41.53-.61.8-.52.71-.8,1.05-.46.49-.68.73-.58.66-.89,1-.51.46-.77.69-.62.58-1,.85-.56.41-.84.62-.67.51-1,.75-.6.36-.91.55-.71.44-1.08.64-.64.31-1,.47-.74.37-1.12.53-.7.25-1.05.38-.76.29-1.15.41-.74.19-1.11.28-.78.21-1.18.29-.77.12-1.16.18-.8.13-1.22.17-.78,0-1.18.06-.93.06-1.4.06a20.85,20.85,0,0,1-3.07-.28l-.72-.13a23.36,23.36,0,0,1-2.77-.69l-.16,0a25.49,25.49,0,0,1-3.06-1.25l-.09,0a27.44,27.44,0,0,1-2.88-1.65C37.91,169.17,33.22,161.42,33.34,153.15Z" />
            <path d="M316.56,214.44a295.36,295.36,0,0,1-15.79-49.62c-3.91-17.63-.21-36.19,10.43-52.28,11.12-16.81,28.37-28.48,47.34-32a81,81,0,0,1,14.75-1.37h0c2.47,0,4.89.13,7.28.36a3.9,3.9,0,0,0,4.28-4.15A81.33,81.33,0,0,0,303.75,0H126A81.32,81.32,0,0,0,44.93,75.52a3.91,3.91,0,0,0,4.36,4.14,76,76,0,0,1,8.5-.5h0c35.59,0,64.65,23.52,72.33,58.53,2.53,11.51,1.83,25.08-2,38.21-8.71,30.23-31,79-46.31,110.24a3.85,3.85,0,0,0,2.6,5.48A50,50,0,0,0,95,292.74H334.8a50.22,50.22,0,0,0,10.84-1.19,3.88,3.88,0,0,0,2.64-5.39q-1.71-3.78-3.4-7.5C334.91,256.65,325.48,235.86,316.56,214.44Zm-33.89-20.38a9.8,9.8,0,0,1-.87,3.49c-2.67,5.58-7.55,10.43-12.36,14.58C253.31,226,234,232.26,212,234.12c-16,0-33-.56-48.62-8.18a30.06,30.06,0,0,1-11.85-11.48c-2.81-4.83.77-9,6.51-8.16,10.35,1.51,20.56,4.22,30.94,5.39,30.43,3.43,57.64-4.29,81.29-24.22l.1-.07C275.44,183.27,283.2,187.56,282.67,194.06Z" />
          </g>
        </SvgIcon>
        <Chip
          color="primary"
          size="small"
          className={classes.sticker}
          label="Beta"
        />
      </a>
    </Link>
  );
}
