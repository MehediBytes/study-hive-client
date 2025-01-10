import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";

const PendingAssignments = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [pendingAssignments, setPendingAssignments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [obtainedMarks, setObtainedMarks] = useState("");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPendingAssignments = async () => {
            try {
                setLoading(true);
                // Fetch all assignments
                const assignmentsResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/assignments`
                );
                // Fetch all submissions
                const submissionsResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/submissions`
                );

                // Filter out the assignments that are already marked (completed)
                const pendingAssignments = submissionsResponse.data.filter(
                    (submission) =>
                        submission.status !== "completed" && submission.userEmail !== user?.email
                );

                // Map the assignments with their corresponding assignment details
                const mappedAssignments = pendingAssignments.map((submission) => {
                    const assignment = assignmentsResponse.data.find(
                        (assign) => assign._id === submission.assignmentId
                    );
                    return {
                        _id: submission._id,
                        title: assignment?.title,
                        marks: assignment?.marks,
                        userEmail: submission.userEmail,
                        googleDocsLink: submission.googleDocsLink,
                        quickNote: submission.quickNote,
                    };
                });

                setPendingAssignments(mappedAssignments);
            } catch (error) {
                toast.error("Failed to load pending assignments.");
            }
            finally {
                setLoading(false);
            }
        };

        if (user) fetchPendingAssignments();
    }, [user]);

    const openModal = (assignment) => {
        setSelectedAssignment(assignment);
        setObtainedMarks("");
        setFeedback("");
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedAssignment(null);
    };

    const handleMarkSubmit = async () => {
        if (!obtainedMarks || !feedback) {
            toast.error("Marks and feedback are required.");
            return;
        }

        if (parseInt(obtainedMarks) > selectedAssignment.marks) {
            toast.error(`Given marks cannot exceed ${selectedAssignment.marks}.`);
            return;
        }

        try {
            // Update the assignment with marks and feedback
            await axiosSecure.put(
                `/submissions/${selectedAssignment._id}`,
                {
                    obtainedMarks: obtainedMarks,
                    feedback: feedback,
                    status: "completed",
                }
            );

            // Update the UI by removing the marked assignment from the pending list
            setPendingAssignments(
                pendingAssignments.filter((assign) => assign._id !== selectedAssignment._id)
            );

            toast.success("Assignment marked successfully.");
            closeModal();
        } catch (error) {
            toast.error("Failed to mark the assignment.");
        }
    };

    return (
        <div className="pb-10 px-5">
            <Helmet>
                <title>Pending-Assignments | Study-Hive</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">
                Pending Assignments
            </h1>

            {loading ? (
                <Loading></Loading>
            ) : pendingAssignments.length === 0 ? (
                <p className="text-center">No pending assignments available!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-base-100">
                        <thead>
                            <tr className="bg-green-600 text-base-100">
                                <th className="border border-gray-950 px-4 py-2">Title</th>
                                <th className="border border-gray-950 px-4 py-2">Total Mark</th>
                                <th className="border border-gray-950 px-4 py-2">Examinee</th>
                                <th className="border border-gray-950 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {pendingAssignments.map((assignment, index) => (
                                <tr
                                    key={assignment._id}
                                    className={index % 2 === 0 ? "bg-gray-100" : "bg-green-100"}
                                >
                                    <td className="border border-gray-950 px-4 py-2">
                                        {assignment.title}
                                    </td>
                                    <td className="border border-gray-950 px-4 py-2">
                                        {assignment.marks}
                                    </td>
                                    <td className="border border-gray-950 px-4 py-2">
                                        {assignment.userEmail}
                                    </td>
                                    <td className="border border-gray-950 px-4 py-2">
                                        <button
                                            onClick={() => openModal(assignment)}
                                            className="btn w-full text-base-100 bg-green-600 hover:bg-green-400"
                                        >
                                            Give Marks
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal for giving marks */}
            {modalOpen && selectedAssignment && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h2 className="text-2xl font-semibold mb-4">Mark Assignment</h2>
                        <p className="mb-4">
                            <strong>Google Docs Link:</strong>{" "}
                            <a
                                href={selectedAssignment.googleDocsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Open Docs
                            </a>
                        </p>
                        <p className="mb-4">
                            <strong>Notes:</strong> {selectedAssignment.quickNote || "No notes provided."}
                        </p>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Marks</label>
                            <input
                                type="number"
                                value={obtainedMarks}
                                onChange={(e) => setObtainedMarks(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-400 rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Feedback</label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-400 rounded-md"
                                rows="4"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleMarkSubmit}
                                className="bg-green-600 text-base-100 px-4 py-2 rounded-md mr-2"
                            >
                                Submit
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-red-400 text-base-100 px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingAssignments;
