import { Meta, Story } from "@storybook/react";
import { mockedService } from "stories/serviceMocks";
import events from "test/fixtures/events.json";

import MyEvents from "./MyEvents";

export default {
  component: MyEvents,
  title: "Dashboard/MyEvents",
} as Meta;

interface EventsListArgs {
  pagesOfEvent?: "none" | "one-page" | "multiple-pages";
  shouldListEventsSucceed?: boolean;
}

const Template: Story<EventsListArgs> = ({
  pagesOfEvent = "one-page",
  shouldListEventsSucceed = true,
} = {}) => {
  setMocks({
    pagesOfEvent: pagesOfEvent as Required<EventsListArgs>["pagesOfEvent"],
    shouldListEventsSucceed,
  });
  return <MyEvents />;
};

export const OnePageOfEvents = Template.bind({});

export const MultiplePagesOfEvents = Template.bind({});
MultiplePagesOfEvents.args = {
  pagesOfEvent: "multiple-pages",
};

export const NoEvents = Template.bind({});
NoEvents.args = {
  pagesOfEvent: "none",
};

export const ErrorLoadingEvents = Template.bind({});
ErrorLoadingEvents.args = {
  shouldListEventsSucceed: false,
};

function setMocks({
  pagesOfEvent,
  shouldListEventsSucceed,
}: Required<EventsListArgs>) {
  mockedService.events.listMyEvents = async () => {
    return shouldListEventsSucceed
      ? {
          eventsList: pagesOfEvent === "none" ? [] : events,
          nextPageToken: pagesOfEvent === "multiple-pages" ? "3" : "",
          totalItems: events.length,
        }
      : Promise.reject(new Error("Error listing user's events"));
  };
}
