import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const AssignmentDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [submission, setSubmission] = useState({
        googleDocsLink: "",
        quickNote: "",
        userEmail: user?.email || "",
        obtainedMarks: "",
        feedback: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAssignmentDetails = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/assignments/${id}`
                );
                setAssignment(response.data);
            } catch (error) {
                toast.error("Failed to load assignment details.");
            }
        };

        fetchAssignmentDetails();
    }, [id]);

    const handleSubmitAssignment = async () => {
        if (assignment?.creatorEmail === user?.email) {
            toast.error("Creator cannot submit their own assignment.");
            return;
        }

        if (!submission.googleDocsLink || !submission.quickNote) {
            Swal.fire({
                icon: "error",
                title: "Missing Information",
                text: "Please fill out both the Google Docs link and Quick Note fields.",
            });
            return;
        }

        try {

            // Check if the user already submitted this assignment
            const existingSubmissionResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/submissions/check?assignmentId=${assignment._id}&userEmail=${user?.email}`
            );

            if (existingSubmissionResponse.data) {
                toast.error("You have already submitted this assignment.");
                return;
            }

            await axios.post(`${import.meta.env.VITE_API_URL}/submissions`, {
                googleDocsLink: submission.googleDocsLink,
                quickNote: submission.quickNote,
                userEmail: user?.email,
                obtainedMarks: submission.obtainedMarks,
                feedback: submission.feedback,
                assignmentId: assignment._id,
                status: "pending"
            });

            toast.success("Assignment submitted successfully!");
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to submit the assignment.");
        }
    };

    const handleTakeAssignment = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSubmission((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (!assignment) {
        return <p>Loading assignment details...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto pb-10 px-4">
            <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">
                {assignment.title}
            </h1>

            <div className="bg-base-100 p-6 rounded-lg shadow-lg space-y-4">
                <img
                    src={assignment.thumbnail}
                    alt={assignment.title}
                    className="rounded-lg h-48 object-cover"
                />
                <p className="text-sm">Marks: {assignment.marks}</p>
                <p className="text-sm">Difficulty: {assignment.difficulty}</p>
                <p className="text-sm">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                <p className="text-sm">Description: {assignment.description}</p>

                {user && (
                    <button
                        onClick={handleTakeAssignment}
                        className="btn bg-green-600 text-base-100 hover:bg-green-400 mt-4"
                    >
                        Take Assignment
                    </button>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>

                            <label className="block mb-2">Google Docs Link</label>
                            <input
                                type="url"
                                name="googleDocsLink"
                                value={submission.googleDocsLink}
                                onChange={handleInputChange}
                                className="input input-bordered w-full mb-4"
                                placeholder="Enter your Google Docs link"
                            />

                            <label className="block mb-2">Quick Note</label>
                            <textarea
                                name="quickNote"
                                value={submission.quickNote}
                                onChange={handleInputChange}
                                className="textarea textarea-bordered w-full mb-4"
                                placeholder="Provide a quick note about your submission"
                            />

                            <div className="flex justify-between">
                                <button
                                    onClick={handleSubmitAssignment}
                                    className="btn btn-success"
                                >
                                    Submit Assignment
                                </button>
                                <button
                                    onClick={handleCloseModal}
                                    className="btn btn-secondary"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssignmentDetails;
