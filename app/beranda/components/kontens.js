"use client";
import { Typography, Button } from "@material-tailwind/react";

function Konten() {
  return (
    <div className="flex w-full bg-gray-100">
      <div className="flex-1 p-6">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Welcome to the Dashboard
        </Typography>
        <Typography variant="body1" color="gray" className="mb-4">
          This is your main dashboard. From here, you can navigate to different
          sections like E-Commerce, Profile, Settings, and more. Use the sidebar
          to access the features you need.
        </Typography>
        <Button color="blue" className="mt-4">
          Learn More
        </Button>
      </div>
    </div>
  );
}

export default Konten;
