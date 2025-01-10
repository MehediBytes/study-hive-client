import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";

const MyAssignments = () => {
    const { user } = useContext(AuthContext);
    const [submittedAssignments, setSubmittedAssignments] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmittedAssignments = async () => {
            try {
                setLoading(true);

                // Fetch all assignments
                const assignmentsResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/assignments`
                );
                // Fetch all submissions for the user
                const submissionsResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/submissions`
                );

                // Filter the submissions for the logged-in user
                const userSubmissions = submissionsResponse.data.filter(
                    (submission) => submission.userEmail === user?.email
                );

                // Map submissions with corresponding assignment details
                const mappedAssignments = userSubmissions.map((submission) => {
                    const assignment = assignmentsResponse.data.find(
                        (assign) => assign._id === submission.assignmentId
                    );

                    return {
                        title: assignment?.title,
                        status: submission.status,
                        marks: assignment?.marks,
                        obtainedMarks: submission.obtainedMarks || "No marks yet",
                        feedback: submission.feedback || "No feedback yet",
                        submittedAt: new Date().toLocaleDateString(),
                    };
                });

                setSubmittedAssignments(mappedAssignments);
            } catch (error) {
                toast.error("Failed to load submitted assignments.", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchSubmittedAssignments();
    }, [user]);

    return (
        <div className="pb-10 px-4">
            <Helmet>
                <title>My-Assignments | Study-Hive</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">
                My Submitted Assignments
            </h1>

            {loading ? (
                <Loading></Loading>
            ) : submittedAssignments.length === 0 ? (
                <p className="text-center">You have not submitted any assignments yet!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-green-600 text-base-100">
                                <th className="border border-gray-950 px-4 py-2">Title</th>
                                <th className="border border-gray-950 px-4 py-2">Status</th>
                                <th className="border border-gray-950 px-4 py-2">Total Marks</th>
                                <th className="border border-gray-950 px-4 py-2">Obtained Marks</th>
                                <th className="border border-gray-950 px-4 py-2">Feedback</th>
                                <th className="border border-gray-950 px-4 py-2">Submitted At</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {submittedAssignments.map((assignment, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "bg-gray-100" : "bg-green-100"}
                                >
                                    <td className="border border-gray-950 px-4 py-2">
                                        {assignment?.title}
                                    </td>
                                    <td
                                        className={`border border-gray-950 px-4 py-2 ${assignment?.status === "pending" && "text-yellow-400"
                                            } ${assignment?.status === "completed" && "text-green-500"
                                            }`}
                                    >
                                        {assignment?.status}
                                    </td>
                                    <td className="border border-gray-950 px-4 py-2">
                                        {assignment?.marks}
                                    </td>
                                    <td className="border border-gray-950 px-4 py-2">
                                        {assignment?.obtainedMarks}
                                    </td>
                                    <td className="border border-gray-950 px-4 py-2">
                                        {assignment?.feedback}
                                    </td>
                                    <td className="border border-gray-950 px-4 py-2">
                                        {assignment?.submittedAt}
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
