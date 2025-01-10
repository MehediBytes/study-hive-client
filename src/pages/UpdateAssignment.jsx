import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateAssignment = () => {
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();
    const assignment = location.state || {};

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        marks: "",
        thumbnail: "",
        difficulty: "easy",
        dueDate: null,
    });

    useEffect(() => {
        if (assignment) {
            setFormData({
                title: assignment.title || "",
                description: assignment.description || "",
                marks: assignment.marks || "",
                thumbnail: assignment.thumbnail || "",
                difficulty: assignment.difficulty || "easy",
                dueDate: assignment.dueDate ? new Date(assignment.dueDate) : null,
            });
        }
    }, [assignment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        setFormData((prev) => ({ ...prev, dueDate: date }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input Validation
        if (!formData.title || !formData.description || !formData.marks || !formData.thumbnail || !formData.dueDate) {
            toast.error("Please fill out all required fields.");
            return;
        }

        try {
            const updatedAssignment = {
                ...formData,
                dueDate: formData.dueDate.toISOString(),
            };

            const response = await axiosSecure.put(
                `/assignments/${assignment._id}`,
                updatedAssignment
            );

            if (response.status === 200) {
                toast.success("Assignment updated successfully!");
                navigate("/assignments");
            } else {
                toast.error("Failed to update the assignment.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the assignment.", error);
        }
    };

    return (
        <div className="pb-10 px-4">
            <Helmet>
                <title>Update-Assignment | Study-Hive</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">Update Assignment</h1>
            <form onSubmit={handleSubmit} className="bg-base-100 p-6 rounded-lg shadow-lg space-y-6">
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="title">Assignment Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="input input-bordered w-full"
                        placeholder="Enter assignment title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter assignment description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="marks">Marks</label>
                    <input
                        type="number"
                        id="marks"
                        name="marks"
                        className="input input-bordered w-full"
                        placeholder="Enter total marks"
                        value={formData.marks}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="thumbnail">Thumbnail Image URL</label>
                    <input
                        type="text"
                        id="thumbnail"
                        name="thumbnail"
                        className="input input-bordered w-full"
                        placeholder="Enter image URL"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="difficulty">Difficulty Level</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        className="select select-bordered w-full"
                        value={formData.difficulty}
                        onChange={handleChange}
                        required
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="dueDate">Due Date</label>
                    <DatePicker
                        id="dueDate"
                        className="input input-bordered w-full"
                        selected={formData.dueDate}
                        onChange={handleDateChange}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a due date"
                        required
                    />
                </div>
                <button type="submit" className="btn bg-green-600 text-base-100 hover:bg-green-400 w-full">
                    Update Assignment
                </button>
            </form>
        </div>
    );
};

export default UpdateAssignment;
