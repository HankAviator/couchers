import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { USER_TITLE_SKELETON_TEST_ID } from "components/UserSummary";
import { service } from "service";
import wrapper from "test/hookWrapper";
import { getEventOrganizers, getLiteUsers } from "test/serviceMockDefaults";
import { assertErrorAlert, mockConsoleError, t } from "test/utils";

import EventOrganizers from "./EventOrganizers";

const listEventOrganizersMock = service.events
  .listEventOrganizers as jest.MockedFunction<
  typeof service.events.listEventOrganizers
>;
const getLiteUsersMock = service.user.getLiteUsers as jest.MockedFunction<
  typeof service.user.getLiteUsers
>;

describe("Event organizers", () => {
  beforeEach(() => {
    getLiteUsersMock.mockImplementation(getLiteUsers);
    listEventOrganizersMock.mockImplementation(getEventOrganizers);
  });

  it("renders the organizers successfully", async () => {
    render(<EventOrganizers eventId={1} />, { wrapper });

    expect(
      await screen.findByRole("heading", { name: t("communities:organizers") })
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Funny Dog, 35" })
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Funny Kid, 28" })
    ).toBeVisible();
  });

  describe("when there are multiple pages of organizers", () => {
    beforeEach(() => {
      listEventOrganizersMock.mockImplementation(async ({ pageToken }) => {
        if (pageToken) {
          return getEventOrganizers();
        }
        return {
          organizerUserIdsList: [4, 5],
          nextPageToken: "4",
        };
      });
    });

    it("should show dialog for seeing all organizers when the 'See all' button is clicked", async () => {
      render(<EventOrganizers eventId={1} />, { wrapper });

      userEvent.click(
        await screen.findByRole("button", { name: t("communities:see_all") })
      );
      expect(
        await screen.findByRole("dialog", { name: t("communities:organizers") })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { name: "Funny Chicken, 28" })
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { name: "Friendly Cow, 25" })
      ).toBeVisible();
    });

    it("should load the next page of organizers when the 'Load more organizers' button is clicked", async () => {
      render(<EventOrganizers eventId={1} />, { wrapper });
      userEvent.click(
        await screen.findByRole("button", { name: t("communities:see_all") })
      );
      const dialog = within(
        await screen.findByRole("dialog", { name: t("communities:organizers") })
      );

      userEvent.click(
        dialog.getByRole("button", {
          name: t("communities:load_more_organizers"),
        })
      );

      expect(
        await dialog.findByRole("heading", { name: "Funny Dog, 35" })
      ).toBeVisible();
      expect(
        dialog.getByRole("heading", { name: "Funny Kid, 28" })
      ).toBeVisible();
    });

    it("should hide unknown users in the dialog", async () => {
      listEventOrganizersMock.mockImplementation(async ({ pageToken }) => {
        if (pageToken) {
          return {
            organizerUserIdsList: [99],
            nextPageToken: "",
          };
        }
        return {
          organizerUserIdsList: [4, 5],
          nextPageToken: "4",
        };
      });
      render(<EventOrganizers eventId={1} />, { wrapper });
      userEvent.click(
        await screen.findByRole("button", { name: t("communities:see_all") })
      );
      const dialog = within(
        await screen.findByRole("dialog", { name: t("communities:organizers") })
      );

      userEvent.click(
        dialog.getByRole("button", {
          name: t("communities:load_more_organizers"),
        })
      );

      await waitForElementToBeRemoved(screen.getByRole("progressbar"));
      expect(
        dialog.queryByTestId(USER_TITLE_SKELETON_TEST_ID)
      ).not.toBeInTheDocument();
    });

    it("should show an error alert in the dialog if getting attendees failed", async () => {
      mockConsoleError();
      render(<EventOrganizers eventId={1} />, { wrapper });
      const errorMessage = "Error listing organizers";
      listEventOrganizersMock.mockRejectedValue(new Error(errorMessage));

      userEvent.click(
        await screen.findByRole("button", { name: t("communities:see_all") })
      );

      await screen.findByRole("dialog", { name: t("communities:organizers") });
      await assertErrorAlert(errorMessage);
    });

    it("closes the dialog when the backdrop is clicked", async () => {
      render(<EventOrganizers eventId={1} />, { wrapper });
      userEvent.click(
        await screen.findByRole("button", { name: t("communities:see_all") })
      );
      await screen.findByRole("dialog", { name: t("communities:organizers") });

      userEvent.click(document.querySelector(".MuiBackdrop-root")!);
      await waitForElementToBeRemoved(
        screen.getByRole("dialog", { name: t("communities:organizers") })
      );

      expect(
        screen.queryByRole("button", {
          name: t("communities:load_more_organizers"),
        })
      ).not.toBeInTheDocument();
    });
  });
});
