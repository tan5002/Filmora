import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CategoryProvider } from "./context/CategoryProvider.jsx";
import { AuthorProvider } from "./context/AuthorProvider.jsx";
import { CharacterProvider } from "./context/CharacterProvider.jsx";
import { ActorProvider } from "./context/ActorProvider.jsx";
import { MovieProvider } from "./context/MovieProvider.jsx";
import { PlanProvider } from "./context/PlanProvider.jsx";
import { EpisodesProvider } from "./context/EpisodesProvider.jsx";
import { PackageProvider } from "./context/PackageProvider.jsx";
import { FeatureProvider } from "./context/FeatureProvider.jsx";
import { AccountProvider } from "./context/AccountProvider.jsx";
import { NotificationProvider } from "./context/NotificationProvider.jsx";
import { AuthsProvider } from "./context/AuthsProvider.jsx";
import { SubscriptionProvider } from "./context/SubscriptionProvider.jsx";
import { RentMovieProvider } from "./context/RentMovieProvider.jsx";
import { CommentProvider } from "./context/CommentProvider.jsx";
import { SeasonProvider } from "./context/SeasonProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <AuthorProvider>
          <ActorProvider>
            <CharacterProvider>
              <MovieProvider>
                <PlanProvider>
                  <EpisodesProvider>
                    <PackageProvider>
                      <FeatureProvider>
                        <AccountProvider>
                          <NotificationProvider>
                            <AuthsProvider>
                              <SubscriptionProvider>
                                <RentMovieProvider>
                                <CommentProvider>
                                <SeasonProvider>
                                  <App />
                                </SeasonProvider>
                                </CommentProvider>
                                </RentMovieProvider>
                              </SubscriptionProvider>
                            </AuthsProvider>
                          </NotificationProvider>
                        </AccountProvider>
                      </FeatureProvider>
                    </PackageProvider>
                  </EpisodesProvider>
                </PlanProvider>
              </MovieProvider>
            </CharacterProvider>
          </ActorProvider>
        </AuthorProvider>
      </CategoryProvider>
    </BrowserRouter>
  </StrictMode>
);
