"use client";

import { useEffect, useState } from "react";
import { getContacts, updateContactStatus } from "@/lib/firestore";
import { ContactSubmission } from "@/types/firestore";
import { FiMail, FiPhone, FiCheck, FiMessageSquare } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminContacts() {
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
    const [replyText, setReplyText] = useState("");
    const [sendingReply, setSendingReply] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    async function handleSendReply() {
        if (!selectedContact || !replyText) return;
        setSendingReply(true);
        const loadingToast = toast.loading("Sending email reply...");

        try {
            const response = await fetch("/api/admin/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: selectedContact.email,
                    subject: `Re: Your Inquiry for ${selectedContact.service} at 3S-SOFT`,
                    message: replyText,
                    contactId: selectedContact.id,
                }),
            });

            const result = await response.json();

            if (result.success) {
                toast.success("Reply sent successfully!", { id: loadingToast });
                setReplyText("");
                if (selectedContact.id) {
                    await handleMarkAsReplied(selectedContact.id);
                }
            } else {
                throw new Error(result.error || "Failed to send email");
            }
        } catch (error: any) {
            console.error("Reply Error:", error);
            toast.error(error.message || "Error sending reply", { id: loadingToast });
        } finally {
            setSendingReply(false);
        }
    }

    async function fetchContacts() {
        try {
            const data = await getContacts();
            setContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
            toast.error("Failed to load contacts");
        } finally {
            setLoading(false);
        }
    }

    async function handleMarkAsRead(id: string) {
        try {
            await updateContactStatus(id, "read");
            setContacts(contacts.map((c) => (c.id === id ? { ...c, status: "read" } : c)));
            toast.success("Marked as read");
        } catch (error) {
            console.error("Error updating contact:", error);
            toast.error("Failed to update");
        }
    }

    async function handleMarkAsReplied(id: string) {
        try {
            await updateContactStatus(id, "replied");
            setContacts(contacts.map((c) => (c.id === id ? { ...c, status: "replied" } : c)));
            toast.success("Marked as replied");
        } catch (error) {
            console.error("Error updating contact:", error);
            toast.error("Failed to update");
        }
    }

    const statusColors = {
        new: "bg-blue-500",
        read: "bg-yellow-500",
        replied: "bg-green-500",
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex gap-6">
            {/* Contact List */}
            <div className="w-1/2">
                <h1 className="text-3xl font-bold text-white mb-8">Contacts</h1>

                {contacts.length === 0 ? (
                    <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                        <p className="text-gray-400">No contact submissions yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => {
                                    setSelectedContact(contact);
                                    if (contact.status === "new" && contact.id) {
                                        handleMarkAsRead(contact.id);
                                    }
                                }}
                                className={`bg-gray-800 rounded-xl p-4 border cursor-pointer transition-all ${selectedContact?.id === contact.id
                                    ? "border-blue-500"
                                    : "border-gray-700 hover:border-gray-600"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-white font-medium">{contact.name}</h3>
                                        <p className="text-gray-400 text-sm">{contact.email}</p>
                                    </div>
                                    <span
                                        className={`px-2 py-1 text-xs font-medium text-white rounded ${statusColors[contact.status]
                                            }`}
                                    >
                                        {contact.status}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    {contact.service} • {contact.createdAt?.toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Contact Detail */}
            <div className="w-1/2">
                {selectedContact ? (
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 sticky top-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{selectedContact.name}</h2>
                                <p className="text-gray-400">{selectedContact.service}</p>
                            </div>
                            <span
                                className={`px-3 py-1 text-sm font-medium text-white rounded ${statusColors[selectedContact.status]
                                    }`}
                            >
                                {selectedContact.status}
                            </span>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center gap-3 text-gray-300">
                                <FiMail className="w-5 h-5 text-gray-500" />
                                <a href={`mailto:${selectedContact.email}`} className="hover:text-blue-400">
                                    {selectedContact.email}
                                </a>
                            </div>
                            {selectedContact.phone && (
                                <div className="flex items-center gap-3 text-gray-300">
                                    <FiPhone className="w-5 h-5 text-gray-500" />
                                    <a href={`tel:${selectedContact.phone}`} className="hover:text-blue-400">
                                        {selectedContact.phone}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <h3 className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                                <FiMessageSquare className="w-4 h-4" /> Message
                            </h3>
                            <p className="text-white bg-gray-700 rounded-lg p-4 mb-4">{selectedContact.message}</p>

                            <label className="text-gray-400 text-sm mb-2 block">Your Reply</label>
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 min-h-[120px]"
                                placeholder="Type your reply here..."
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleSendReply}
                                disabled={sendingReply || !replyText}
                                className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white text-center rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {sendingReply ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                ) : (
                                    <FiMail className="w-4 h-4" />
                                )}
                                Send SMTP Reply
                            </button>
                            {selectedContact.status !== "replied" && (
                                <button
                                    onClick={() => selectedContact.id && handleMarkAsReplied(selectedContact.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-transparent border border-green-500/30 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                                >
                                    <FiCheck className="w-4 h-4" /> Mark Replied
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
                        <p className="text-gray-400">Select a contact to view details</p>
                    </div>
                )}
            </div>
        </div>
    );
}
