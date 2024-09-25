import { Button, Typography } from "@material-ui/core";
import { TabContext, TabPanel } from "@material-ui/lab";
import CustomColorSwitch from "components/CustomColorSwitch";
import PageTitle from "components/PageTitle";
import TabBar from "components/TabBar";
import { EventsType } from "features/queryKeys";
import { useTranslation } from "i18n";
import { COMMUNITIES, GLOBAL } from "i18n/namespaces";
import { useRouter } from "next/router";
import { useState } from "react";
import { newEventRoute } from "routes";
import makeStyles from "utils/makeStyles";

import DiscoverEventsList from "./DiscoverEventsList";
import MyEventsList from "./MyEventsList";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    padding: theme.spacing(1, 2),
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
    fontWeight: "bold",
  },
  filterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: theme.spacing(1),
  },
  heading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  filter: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.text.primary,
    padding: theme.spacing(1, 2),
    textAlign: "center",
    fontWeight: "bold",
    margin: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius * 6,
  },
  selectedFilter: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(1, 2),
    textAlign: "center",
    fontWeight: "bold",
    margin: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius * 6,
  },
}));

const EventsPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation([GLOBAL, COMMUNITIES]);
  const [eventType, setEventType] = useState<EventsType>("upcoming");
  const [showCancelled, setShowCancelled] = useState<boolean>(false);
  const [isMyCommunities, setIsMyCommunities] = useState<boolean>(false);
  const [isOnlineOnly, setIsOnlineOnly] = useState<boolean>(false);

  const allEventsPageTabLabels: Record<EventsType, string> = {
    upcoming: t("communities:upcoming"),
    past: t("communities:past"),
  };

  const handleToggleClick = (value: EventsType) => {
    if (value !== null && value !== eventType) {
      setEventType(value);
    }
  };

  const handleShowCancelledClick = () => {
    setShowCancelled(!showCancelled);
  };

  const handleFilterIsMyCommunitiesClick = () => {
    setIsMyCommunities(!isMyCommunities);
  };

  const handleFilterIsOnlineOnlyClick = () => {
    setIsOnlineOnly(!isOnlineOnly);
  };

  return (
    <div>
      <div className={classes.headerRow}>
        <PageTitle>{t("communities:events_title")}</PageTitle>
        <Button
          className={classes.button}
          size="small"
          onClick={() => router.push(newEventRoute)}
        >
          {t("communities:create_new_event")}
        </Button>
      </div>
      <TabContext value={eventType}>
        <div className={classes.filterRow}>
          <TabBar
            ariaLabel={t("communities:all_events_page_tabs_a11y_label")}
            setValue={handleToggleClick}
            labels={allEventsPageTabLabels}
          />
          <CustomColorSwitch
            checked={showCancelled}
            onClick={handleShowCancelledClick}
            label={t("communities:show_cancelled_events")}
          />
        </div>
        <Typography className={classes.heading} variant="h2">
          {t("communities:your_events")}
        </Typography>
        <TabPanel value="upcoming">
          <MyEventsList eventType={eventType} showCancelled={showCancelled} />
        </TabPanel>
        <TabPanel value="past">
          <MyEventsList eventType={eventType} showCancelled={showCancelled} />
        </TabPanel>
      </TabContext>
      <div className={classes.filterRow}>
        <Typography className={classes.heading} variant="h2">
          {t("communities:discover_events_title")}
        </Typography>
        <div className={classes.filterRow}>
          <Typography
            className={
              isMyCommunities ? classes.selectedFilter : classes.filter
            }
            variant="body2"
            onClick={handleFilterIsMyCommunitiesClick}
          >
            Communities
          </Typography>
          <Typography
            className={isOnlineOnly ? classes.selectedFilter : classes.filter}
            variant="body2"
            onClick={handleFilterIsOnlineOnlyClick}
          >
            Online
          </Typography>
        </div>
        {/** @TODO use translations */}
      </div>
      <DiscoverEventsList
        eventType={eventType}
        isVerticalStyle
        isMyCommunities={isMyCommunities}
        isOnlineOnly={isOnlineOnly}
      />
    </div>
  );
};

export default EventsPage;
