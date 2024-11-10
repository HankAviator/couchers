import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import { theme } from "../theme";
import { AuthContext } from "../features/auth/AuthProvider";
import "../fonts";
import "./i18n";
import "./reset.css";
import { Suspense } from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: ["Couchers Storybook", "Components"],
    },
  },
};

export const decorators = [
  (Story, context) => {
    const client = new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false, retry: false },
      },
    });
    return (
      (<Suspense fallback="loading...">
        <AuthContext.Provider
          value={{ authState: { authenticated: true, userId: 1 } }}
        >
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <QueryClientProvider client={client}>
                <Story {...context} />
              </QueryClientProvider>
            </ThemeProvider>
          </StyledEngineProvider>
        </AuthContext.Provider>
      </Suspense>)
    );
  },
];
