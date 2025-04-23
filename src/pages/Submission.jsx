import React from "react";
import Form from "../Components/Form";

export default function Submission({ onSubmit }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Project Submissions</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Form onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
