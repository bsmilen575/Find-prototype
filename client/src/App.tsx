import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Onboarding from "@/pages/Onboarding";
import Welcome from "@/pages/Welcome";
import MatchNotification from "@/pages/MatchNotification";
import ProfileMatch from "@/pages/ProfileMatch";
import Settings from "@/pages/Settings";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Welcome} />
      <Route path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/match" component={MatchNotification} />
      <Route path="/profile/:id" component={ProfileMatch} />
      <Route path="/settings" component={Settings} />
      <Route path="/signup" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
