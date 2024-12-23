import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const MyAssignments = () => {
    const { user } = useContext(AuthContext);
    const [submittedAssignments, setSubmittedAssignments] = useState([]);

    useEffect(() => {
        const fetchSubmittedAssignments = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/assignments`
                );

                // Filter assignments by submissions made by the logged-in user
                const userAssignments = response.data.filter((assignment) =>
                    assignment.submissions?.some(
                        (submission) => submission.userEmail === user?.email
                    )
                );

                // Map submissions to include assignment details
                const mappedAssignments = userAssignments.map((assignment) => {
                    const userSubmission = assignment.submissions.find(
                        (submission) => submission.userEmail === user?.email
                    );

                    return {
                        title: assignment.title,
                        status: userSubmission.status,
                        marks: assignment.marks,
                        obtainedMarks: userSubmission.obtainedMarks || "No mark got yet",
                        feedback: userSubmission.feedback || "No feedback got yet",
                        submittedAt: new Date(userSubmission.submittedAt).toLocaleDateString(),
                    };
                });

                setSubmittedAssignments(mappedAssignments);
            } catch (error) {
                toast.error("Failed to load submitted assignments.");
            }
        };

        if (user) fetchSubmittedAssignments();
    }, [user]);

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">
                My Submitted Assignments
            </h1>

            {submittedAssignments.length === 0 ? (
                <p className="text-center">You do not submit any Assignments yet!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-green-600 text-white">
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                                <th className="border border-gray-300 px-4 py-2">Total Marks</th>
                                <th className="border border-gray-300 px-4 py-2">Obtained Marks</th>
                                <th className="border border-gray-300 px-4 py-2">Feedback</th>
                                <th className="border border-gray-300 px-4 py-2">Submitted At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedAssignments.map((assignment, index) => (
                                <tr
                                    key={index}
                                    className={
                                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                    }
                                >
                                    <td className="border border-gray-300 px-4 py-2">
                                        {assignment.title}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {assignment.status}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {assignment.marks}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {assignment.obtainedMarks}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {assignment.feedback}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {assignment.submittedAt}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyAssignments;
