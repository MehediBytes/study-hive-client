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
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever, MdOutlinePreview } from "react-icons/md";

const Assignments = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [assignments, setAssignments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [sortedAssignments, setSortedAssignments] = useState(assignments);
    const [isAscending, setIsAscending] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAssignments();
    }, [searchQuery, difficultyFilter]);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            const params = {
                title: searchQuery,
                difficulty: difficultyFilter,
            };

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/assignments`, { params });
            const fetchedAssignments = response.data;

            setAssignments(fetchedAssignments);
            setSortedAssignments(fetchedAssignments);
        } catch (error) {
            toast.error("Failed to load assignments.", error);
        } finally {
            setLoading(false);
        }
    };

    // Sort assignments by marks
    const handleSort = () => {
        const sorted = [...assignments].sort((a, b) => {
            return isAscending ? a.marks - b.marks : b.marks - a.marks;
        });
        setSortedAssignments(sorted);
        setIsAscending(!isAscending);
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
            className="pb-10 px-5"
        >
            <Helmet>
                <title>All-Assignments | Study-Hive</title>
            </Helmet>
            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-green-600 mb-5 text-center"
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

                {/* Sort Button */}
                <div className="w-full md:w-1/4 mb-4 md:mb-0">
                    <button
                        onClick={handleSort}
                        className="btn bg-green-600 w-full text-base-100 px-6 py-2 rounded-md shadow-sm hover:bg-green-400 transition"
                    >
                        Sort by Marks {isAscending ? "(Ascending)" : "(Descending)"}
                    </button>
                </div>

                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={difficultyFilter}
                    onChange={(e) => {
                        setDifficultyFilter(e.target.value);
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
                        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                    >
                        {sortedAssignments.map((assignment) => (
                            <motion.div
                                key={assignment._id}
                                className="bg-base-100 rounded-lg shadow-lg flex flex-col justify-between flex-grow space-y-1"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div>
                                    <img
                                        src={assignment?.thumbnail}
                                        alt={assignment?.title}
                                        className="rounded-t-lg h-28 w-full object-cover"
                                    />
                                </div>
                                <h2 className="text-xl font-bold px-2">{assignment?.title}</h2>
                                <p className="text-sm text-gray-500 px-2"><strong>Creator mail: </strong>{assignment?.creatorEmail}</p>
                                <p className="text-sm text-gray-400 px-2"><strong>Marks: </strong>{assignment?.marks}</p>
                                <p className="text-sm text-gray-500 px-2"><strong>Difficulty: </strong>{assignment?.difficulty}</p>
                                <div className="flex space-x-5 p-2">
                                    <button
                                        onClick={() => handleUpdate(assignment)}
                                        className="btn btn-info btn-sm"
                                    >
                                        <GrUpdate />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(assignment._id, assignment?.creatorEmail)}
                                        className="btn btn-error btn-sm"
                                    >
                                        <MdDeleteForever className="text-lg" />
                                    </button>
                                    <button
                                        onClick={() => handleView(assignment)}
                                        className="btn btn-outline btn-sm"
                                    >
                                        <MdOutlinePreview />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                    </motion.div>
                    {assignments.length === 0 && (
                        <p className="text-center mt-4">No assignments found. Try a different search or filter.</p>
                    )}

                </div>
            )
            }

        </motion.div>
    );
};

export default Assignments;
