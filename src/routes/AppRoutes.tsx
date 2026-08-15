import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import SeasonPredictorLayout from "../layouts/SeasonPredictorLayout/SeasonPredictorLayout";

import HomePage from "../features/home/pages/HomePage";

import LoginPage from "../features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage/RegisterPage";

import DashboardPage from "../features/profile/pages/DashboardPage/DashboardPage";
import SettingsPage from "../features/profile/pages/SettingsPage/SettingsPage";

import SeasonDashboardPage from "../features/seasonPredictor/pages/Dashboard/SeasonDashboardPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

import ActualStandingsPage from "../features/admin/pages/ActualStandingsPage/ActualStandingsPage";
import GameweeksPage from "../features/admin/pages/GameweeksPage/GameweeksPage";
import MatchesPage from "../features/admin/pages/MatchesPage/MatchesPage";
import UsersPage from "../features/admin/pages/UsersPage/UsersPage";
import RulesPage from "../pages/RulesPage/RulesPage";
import CreateSeasonPredictionPage from "../features/seasonPredictor/pages/CreatePrediction/CreateSeasonPredictionPage";
import MyPredictionPage from "../features/seasonPredictor/pages/MyPredictionPage/MyPredictionPage";
import MySeasonLeaguesPage from "../features/seasonPredictor/pages/MyLeaguesPage/MySeasonLeaguesPage";
import PublicSeasonLeaguesPage from "../features/seasonPredictor/pages/PublicLeaguesPage/PublicSeasonLeaguesPage";
import JoinSeasonLeaguePage from "../features/seasonPredictor/pages/JoinLeaguePage/JoinSeasonLeaguePage";
import GlobalSeasonRankingPage from "../features/seasonPredictor/pages/GlobalRankingPage/GlobalSeasonRankingPage";
import MatchDashboardPage from "../features/matchdayPredictor/pages/MatchDashboardPage/MatchDashboardPage";
import MatchPredictorLayout from "../layouts/MatchPredictorLayout/MatchPredictorLayout";
import MatchPredictionPage from "../features/matchdayPredictor/pages/MatchPredictionPage/MatchPredictionPage";
import MyPredictionsPage from "../features/matchdayPredictor/pages/MyPredictionsPage/MyPredictionsPage";
import MyLeaguesPage from "../features/matchdayPredictor/pages/MyLeaguesPage/MyLeaguesPage";
import CreateLeaguePage from "../features/matchdayPredictor/pages/CreateLeaguePage/CreateLeaguePage";
import PublicLeaguesPage from "../features/matchdayPredictor/pages/PublicLeaguesPage/PublicLeaguesPage";
import JoinLeaguePage from "../features/matchdayPredictor/pages/JoinLeaguePage/JoinLeaguePage";
import GlobalRankingPage from "../features/matchdayPredictor/pages/GlobalRankingPage/GlobalRankingPage";
import CreateSeasonLeaguePage from "../features/seasonPredictor/pages/CreateLeaguePage/CreateSeasonLeaguePage";
import HowToPlayPage from "../pages/HowToPlayPage/HowToPlayPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import StandingsPage from "../pages/StandingsPage/StandingsPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/standings" element={<StandingsPage />} />
        <Route path="/how-to-play" element={<HowToPlayPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={["USER"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
          </Route>

          <Route element={<SeasonPredictorLayout />}>
            <Route path="/season-predictor" element={<SeasonDashboardPage />} />
            <Route
              path="/season-predictor/create-prediction"
              element={<CreateSeasonPredictionPage />}
            />
            <Route
              path="/season-predictor/my-prediction"
              element={<MyPredictionPage />}
            />
            <Route
              path="/season-predictor/my-leagues"
              element={<MySeasonLeaguesPage />}
            />
            <Route
              path="/season-predictor/create-league"
              element={<CreateSeasonLeaguePage />}
            />
            <Route
              path="/season-predictor/public-leagues"
              element={<PublicSeasonLeaguesPage />}
            />
            <Route
              path="/season-predictor/join-league"
              element={<JoinSeasonLeaguePage />}
            />
            <Route
              path="/season-predictor/global-ranking"
              element={<GlobalSeasonRankingPage />}
            />
          </Route>
        </Route>

        <Route path="/match-predictor" element={<MatchPredictorLayout />}>
          <Route index element={<MatchDashboardPage />} />

          <Route path="predictions" element={<MatchPredictionPage />} />

          <Route path="my-predictions" element={<MyPredictionsPage />} />

          <Route path="my-leagues" element={<MyLeaguesPage />} />

          <Route path="create-league" element={<CreateLeaguePage />} />

          <Route path="public-leagues" element={<PublicLeaguesPage />} />

          <Route path="join-league" element={<JoinLeaguePage />} />

          <Route path="global-ranking" element={<GlobalRankingPage />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<div>Admin Dashboard</div>} />
            <Route path="standings" element={<ActualStandingsPage />} />
            <Route path="gameweeks" element={<GameweeksPage />} />
            <Route
              path="gameweeks/:gameweekId/matches"
              element={<MatchesPage />}
            />
            <Route path="users" element={<UsersPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
