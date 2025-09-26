import { useState } from "react";
import Landing from "./landing";
import { WorkoutGenerator } from "@/components/workout-generator";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "generator">("landing");

  if (currentView === "generator") {
    return <WorkoutGenerator />;
  }

  return <Landing />;
};

export default Index;
