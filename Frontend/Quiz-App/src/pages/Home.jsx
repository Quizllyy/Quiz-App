import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 pt-[-50px]">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-5xl w-full flex flex-row gap-8 border border-gray-300 min-w-[600px]">
        {/* Start Quiz Section */}
        <Card className="flex-1 shadow-md rounded-xl p-6 transition-transform hover:scale-105">
          <CardContent className="flex flex-col items-center text-center">
            <Typography variant="h5" className="mb-4 font-semibold">
              Start a Quiz
            </Typography>
            <Typography variant="body1" className="mb-6 text-gray-600">
              Enter your unique quiz code and begin the test.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="w-full"
              onClick={() => console.log("Start Quiz Clicked")}>
              Start Quiz
            </Button>
          </CardContent>
        </Card>

        {/* Create Quiz Section */}
        <Card className="flex-1 shadow-md rounded-xl p-6 transition-transform hover:scale-105">
          <CardContent className="flex flex-col items-center text-center">
            <Typography variant="h5" className="mb-4 font-semibold">
              Create a Quiz
            </Typography>
            <Typography variant="body1" className="mb-6 text-gray-600">
              Upload questions via an Excel sheet and generate a quiz code.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className="w-full"
              onClick={() => console.log("Create Quiz Clicked")}>
              Create Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
