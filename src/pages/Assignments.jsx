import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Assignments = () => {
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssignments();
    }, [searchQuery, difficultyFilter]);

    const fetchAssignments = async () => {
        try {
            const params = {};
            if (searchQuery) params.title = searchQuery;
            if (difficultyFilter) params.difficulty = difficultyFilter;

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/assignments`, { params });
            setAssignments(response.data);
        } catch (error) {
            toast.error("Failed to load assignments.");
            console.error(error);
        }
    };

    const handleSearch = () => {
        fetchAssignments();
    };

    const handleDelete = async (assignmentId, creatorEmail) => {
        if (user?.email !== creatorEmail) {
            Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "You can only delete assignments you created.",
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${import.meta.env.VITE_API_URL}/assignments/${assignmentId}`);
                    setAssignments(assignments.filter((assignment) => assignment._id !== assignmentId));
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Your assignment has been deleted.",
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Failed",
                        text: "Failed to delete the assignment.",
                    });
                    console.error(error);
                }
            }
        });
    };

    const handleUpdate = (assignment) => {
        if (user?.email !== assignment.creatorEmail) {
            Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "You can only update assignments you created.",
            });
            return;
        }
        navigate(`/update-assignment/${assignment._id}`, { state: assignment });
    };

    const handleView = (assignment) => {
        navigate(`/assignment-details/${assignment._id}`);
    };

    return (
        <div className="max-w-5xl mx-auto pb-10 px-4">
            <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">All Assignments</h1>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="flex items-center w-full md:w-1/3 mb-4 md:mb-0">
                    <input
                        type="text"
                        placeholder="Search by title"
                        className="input input-bordered w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="btn bg-green-600 text-base-100 font-semibold rounded-lg hover:bg-green-400 ml-2"
                    >
                        Search
                    </button>
                </div>

                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                    <option value="">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.map((assignment) => (
                    <div
                        key={assignment._id}
                        className="bg-base-100 p-6 rounded-lg shadow-lg flex flex-col space-y-4"
                    >
                        <img
                            src={assignment.thumbnail}
                            alt={assignment.title}
                            className="rounded-lg h-48 object-cover"
                        />
                        <h2 className="text-xl font-bold">{assignment.title}</h2>
                        <p className="text-sm text-gray-500">Marks: {assignment.marks}</p>
                        <p className="text-sm text-gray-500">Difficulty: {assignment.difficulty}</p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleUpdate(assignment)}
                                className="btn btn-warning btn-sm"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(assignment._id, assignment.creatorEmail)}
                                className="btn btn-error btn-sm"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleView(assignment)}
                                className="btn btn-primary btn-sm"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assignments;
