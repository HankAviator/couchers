import { CircularProgress } from "@material-ui/core";
import Alert from "components/Alert";
import Button from "components/Button";
import TextBody from "components/TextBody";
import { EventsType } from "features/queryKeys";
import { useTranslation } from "i18n";
import { COMMUNITIES, GLOBAL } from "i18n/namespaces";

import { useListAllEvents } from "../events/hooks";
import EventsList from "./EventsList";

const DiscoverEventsList = ({
  heading,
  eventType,
  isVerticalStyle = false,
}: {
  heading: string;
  eventType: EventsType;
  isVerticalStyle?: boolean;
}) => {
  const { t } = useTranslation([GLOBAL, COMMUNITIES]);

  const { data, error, hasNextPage, fetchNextPage, isLoading } =
    useListAllEvents({
      pastEvents: eventType === "past",
      pageSize: 10,
    });

  const flatEvents = data?.pages.flatMap((page) => page.eventsList);

  if (
    !data ||
    !data.pages ||
    data.pages.length === 0 ||
    !flatEvents ||
    flatEvents?.length === 0
  ) {
    return <TextBody>{t("communities:events_empty_state")}</TextBody>;
  }

  return (
    <>
      {error && <Alert severity="error">{error.message}</Alert>}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <EventsList
          events={flatEvents}
          heading={heading}
          isVerticalStyle={isVerticalStyle}
        />
      )}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {t("communities:see_more_events_label")}
        </Button>
      )}
    </>
  );
};

export default DiscoverEventsList;
