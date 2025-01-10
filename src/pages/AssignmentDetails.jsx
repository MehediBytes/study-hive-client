import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AssignmentDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
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
                setAssignment(response?.data);
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
            const existingSubmissionResponse = await axiosSecure.get(
                `/submissions/check?assignmentId=${assignment._id}&userEmail=${user?.email}`
            );

            if (existingSubmissionResponse.data) {
                toast.error("You have already submitted this assignment.");
                return;
            }

            await axios.post(`${import.meta.env.VITE_API_URL}/submissions`, {
                googleDocsLink: submission?.googleDocsLink,
                quickNote: submission?.quickNote,
                userEmail: user?.email,
                obtainedMarks: submission?.obtainedMarks,
                feedback: submission?.feedback,
                assignmentId: assignment?._id,
                status: "pending"
            });

            toast.success("Assignment submitted successfully!");
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to submit the assignment.");
        }
        navigate("/my-assignments")
    };

    const handleTakeAssignment = () => {
        if (!user?.email) {
            navigate("/auth/login")
            toast.error("Plaese log in for take assignments!")
        }
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

    const isDueDateOver = new Date(assignment?.dueDate) < new Date();

    return (
        <div className="pb-10 px-5">
            <Helmet>
                <title>Assignments-details | Study-Hive</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
                {assignment?.title}
            </h1>

            <div className="bg-base-100 p-5 rounded-lg shadow-lg md:flex md:justify-between md:items-center gap-5 space-y-4">
                <div className="md:w-1/2">
                    <img
                        src={assignment?.thumbnail}
                        alt={assignment?.title}
                        className="rounded-lg w-full h-96 object-cover"
                    />
                </div>
                <div className="md:w-1/2 space-y-8">
                    <p className="text-sm text-gray-500"><strong>Creator mail: </strong>{assignment?.creatorEmail}</p>
                    <p className="text-sm text-gray-400"><strong>Marks: </strong>{assignment?.marks}</p>
                    <p className="text-sm text-gray-500"><strong>Difficulty: </strong>{assignment?.difficulty}</p>
                    <p className="text-sm text-gray-400"><strong>Deadline: </strong>{new Date(assignment?.dueDate).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500"><strong>Description: </strong>{assignment?.description}</p>

                    {
                        <>
                            <button
                                onClick={handleTakeAssignment}
                                className={`btn mt-4 ${isDueDateOver
                                    ? "btn-disabled bg-gray-400 text-gray-700"
                                    : "bg-green-700 text-base-100 hover:bg-green-500"
                                    }`}
                                disabled={isDueDateOver}
                            >
                                Take Assignment
                            </button>
                            {isDueDateOver && (
                                <p className="text-red-600 mt-2">
                                    Assignment due date is over.
                                </p>
                            )}
                        </>
                    }

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
                                        className="btn btn-success text-base-100"
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
        </div>
    );
};

export default AssignmentDetails;
