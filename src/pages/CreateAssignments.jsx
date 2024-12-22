import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const CreateAssignments = () => {
    const {user} = useContext(AuthContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [marks, setMarks] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [dueDate, setDueDate] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input Validation
        if (!title || !description || !marks || !thumbnail || !dueDate) {
            toast.error("Please fill out all required fields.");
            return;
        }

        // Preparing the assignment data
        const assignmentData = {
            title,
            description,
            marks,
            thumbnail,
            difficulty,
            dueDate: dueDate.toISOString(),
            creatorEmail: user?.email
        };

        try {
            // Sending assignment data to the server using Axios
            await axios.post(`${import.meta.env.VITE_API_URL}/assignments`, assignmentData);

            // Reset form fields
            setTitle("");
            setDescription("");
            setMarks("");
            setThumbnail("");
            setDifficulty("easy");
            setDueDate(null);

            toast.success("Assignment created successfully");
            navigate("/assignments");
        } catch (error) {
            toast.error("Failed to create assignment. Please try again.");
            console.error("Error creating assignment:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-10 px-4">
            <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">Create Assignment</h1>
            <form onSubmit={handleSubmit} className="bg-base-100 p-6 rounded-lg shadow-lg space-y-6">
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="title">Assignment Title</label>
                    <input
                        type="text"
                        id="title"
                        className="input input-bordered w-full"
                        placeholder="Enter assignment title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter assignment description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="marks">Marks</label>
                    <input
                        type="number"
                        id="marks"
                        className="input input-bordered w-full"
                        placeholder="Enter total marks"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="thumbnail">Thumbnail Image URL</label>
                    <input
                        type="text"
                        id="thumbnail"
                        className="input input-bordered w-full"
                        placeholder="Enter image URL"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="difficulty">Difficulty Level</label>
                    <select
                        id="difficulty"
                        className="select select-bordered w-full"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
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
                        selected={dueDate}
                        onChange={(date) => setDueDate(date)}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Select a due date"
                    />
                </div>
                <button type="submit" className="btn bg-green-600 text-base-100 hover:bg-green-400 w-full">
                    Create Assignment
                </button>
            </form>
        </div>
    );
};

export default CreateAssignments;
