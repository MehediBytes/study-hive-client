import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";

const Assignments = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [assignments, setAssignments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchAssignments();
    }, [searchQuery, difficultyFilter, currentPage]);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                title: searchQuery,
                difficulty: difficultyFilter,
            };

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/assignments`, { params });
            setAssignments(response.data.assignments);
            setTotalPages(Math.ceil(response.data.total / itemsPerPage));
        } catch (error) {
            toast.error("Failed to load assignments.", error);
        }
        finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
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
                    await axiosSecure.delete(`/assignments/${assignmentId}`);
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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto pb-10 px-4"
        >
            <Helmet>
                <title>All-Assignments | Study-Hive</title>
            </Helmet>
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-green-600 mb-8 text-center"
            >
                All Assignments
            </motion.h1>

            <motion.div
                className="flex flex-col md:flex-row justify-between items-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search by title"
                            className="grow"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                </div>

                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={difficultyFilter}
                    onChange={(e) => {
                        setDifficultyFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </motion.div>

            {loading ? (
                <Loading></Loading>
            ) : (
                <div>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                    >
                        {assignments.map((assignment) => (
                            <motion.div
                                key={assignment._id}
                                className="bg-base-100 p-6 rounded-lg shadow-lg flex flex-col justify-between space-y-4"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={assignment?.thumbnail}
                                    alt={assignment?.title}
                                    className="rounded-lg h-48 object-cover"
                                />
                                <h2 className="text-xl font-bold">{assignment?.title}</h2>
                                <p className="text-sm text-gray-400">Marks: {assignment?.marks}</p>
                                <p className="text-sm text-gray-400">Difficulty: {assignment?.difficulty}</p>
                                <p className="text-sm text-gray-400">Deadline: {new Date(assignment?.dueDate).toLocaleDateString()}</p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleUpdate(assignment)}
                                        className="btn btn-warning btn-sm"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(assignment._id, assignment?.creatorEmail)}
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
                            </motion.div>
                        ))}

                    </motion.div>
                    {assignments.length === 0 && (
                        <p className="text-center mt-4">No assignments found. Try a different search or filter.</p>
                    )}
                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn bg-base-100 text-green-400 btn-sm"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages).keys()].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`btn btn-sm mx-1 ${currentPage === index + 1 ? 'btn-active text-green-400' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="btn bg-base-100 text-green-400 btn-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )
            }

        </motion.div>
    );
};

export default Assignments;
