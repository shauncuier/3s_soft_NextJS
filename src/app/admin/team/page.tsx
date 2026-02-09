"use client";

import { useEffect, useState } from "react";
import { getTeamMembers, deleteTeamMember, updateTeamMember } from "@/lib/firestore";
import { TeamMember } from "@/types/firestore";
import Link from "next/link";
import { FiEdit, FiTrash2, FiPlus, FiArrowUp, FiArrowDown } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminTeam() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [reordering, setReordering] = useState(false);

    useEffect(() => {
        fetchTeam();
    }, []);

    async function fetchTeam() {
        try {
            const data = await getTeamMembers();
            setTeam(data);
        } catch (error) {
            console.error("Error fetching team:", error);
            toast.error("Failed to load team members");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this team member?")) return;

        try {
            await deleteTeamMember(id);
            setTeam(team.filter((m) => m.id !== id));
            toast.success("Team member deleted successfully");
        } catch (error) {
            console.error("Error deleting team member:", error);
            toast.error("Failed to delete team member");
        }
    }

    async function handleReorder(index: number, direction: "up" | "down") {
        if (reordering) return;

        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= team.length) return;

        setReordering(true);
        const newTeam = [...team];
        const temp = newTeam[index];
        newTeam[index] = newTeam[newIndex];
        newTeam[newIndex] = temp;

        // Update order values
        const updatedTeam = newTeam.map((member, idx) => ({
            ...member,
            order: idx,
        }));

        setTeam(updatedTeam);

        try {
            // Save new order to database
            await Promise.all([
                updateTeamMember(updatedTeam[index].id!, { order: index }),
                updateTeamMember(updatedTeam[newIndex].id!, { order: newIndex }),
            ]);
            toast.success("Order updated");
        } catch (error) {
            console.error("Error updating order:", error);
            toast.error("Failed to update order");
            fetchTeam(); // Revert on error
        } finally {
            setReordering(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Team Members</h1>
                    <p className="text-gray-400 text-sm mt-1">Use arrows to reorder members</p>
                </div>
                <Link
                    href="/admin/team/new"
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                    <FiPlus className="w-5 h-5" />
                    Add Member
                </Link>
            </div>

            {team.length === 0 ? (
                <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                    <p className="text-gray-400 mb-4">No team members yet</p>
                    <Link
                        href="/admin/team/new"
                        className="text-green-400 hover:text-green-300"
                    >
                        Add your first team member →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {team.map((member, index) => (
                        <div
                            key={member.id}
                            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors relative"
                        >
                            {/* Order Badge */}
                            <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                {index + 1}
                            </div>

                            {/* Reorder Buttons */}
                            <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                                <button
                                    onClick={() => handleReorder(index, "up")}
                                    disabled={index === 0 || reordering}
                                    className={`p-1.5 rounded transition-colors ${index === 0 || reordering
                                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-700 text-white hover:bg-blue-500"
                                        }`}
                                    title="Move up"
                                >
                                    <FiArrowUp className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleReorder(index, "down")}
                                    disabled={index === team.length - 1 || reordering}
                                    className={`p-1.5 rounded transition-colors ${index === team.length - 1 || reordering
                                            ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-700 text-white hover:bg-blue-500"
                                        }`}
                                    title="Move down"
                                >
                                    <FiArrowDown className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="h-48 bg-gray-700 relative overflow-hidden group">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-white font-medium">{member.name}</h3>
                                <p className="text-blue-400 text-sm mb-2">{member.position}</p>
                                <div className="flex flex-wrap gap-1 justify-center mb-4">
                                    {member.skills.slice(0, 3).map((skill, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-0.5 bg-gray-700 text-gray-300 text-xs rounded"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-center gap-2">
                                    <Link
                                        href={`/admin/team/${member.id}`}
                                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                    >
                                        <FiEdit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => member.id && handleDelete(member.id)}
                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                                    >
                                        <FiTrash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
