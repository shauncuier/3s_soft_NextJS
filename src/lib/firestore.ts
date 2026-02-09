import { db } from "@/firebase/firebase.config";
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    Timestamp,
    DocumentSnapshot,
    QueryDocumentSnapshot,
} from "firebase/firestore";
import {
    Blog,
    PortfolioItem,
    TeamMember,
    ContactSubmission,
    Service,
    Testimonial,
} from "@/types/firestore";

// Collection references
const COLLECTIONS = {
    blogs: "blogs",
    portfolio: "portfolio",
    team: "team",
    contacts: "contacts",
    services: "services",
} as const;

// Generic helper to convert Firestore doc to typed object
function docToData<T>(doc: DocumentSnapshot | QueryDocumentSnapshot): T {
    const data = doc.data();
    if (!data) return { id: doc.id } as T;

    return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamps to Date
        ...(data.createdAt instanceof Timestamp && { createdAt: data.createdAt.toDate() }),
        ...(data.publishedAt instanceof Timestamp && { publishedAt: data.publishedAt.toDate() }),
    } as T;
}

// ==================== BLOGS ====================
export async function getBlogs(publishedOnly = true): Promise<Blog[]> {
    const blogsRef = collection(db, COLLECTIONS.blogs);
    const q = query(blogsRef, orderBy("publishedAt", "desc"));
    const snapshot = await getDocs(q);
    const blogs = snapshot.docs.map((doc) => docToData<Blog>(doc));

    if (publishedOnly) {
        return blogs.filter(blog => blog.published);
    }
    return blogs;
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
    const blogsRef = collection(db, COLLECTIONS.blogs);
    const q = query(blogsRef, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return docToData<Blog>(snapshot.docs[0]);
}

export async function createBlog(blog: Omit<Blog, "id">): Promise<string> {
    const blogsRef = collection(db, COLLECTIONS.blogs);
    const docRef = await addDoc(blogsRef, {
        ...blog,
        createdAt: Timestamp.now(),
        publishedAt: blog.published ? Timestamp.now() : null,
    });
    return docRef.id;
}

export async function updateBlog(id: string, data: Partial<Blog>): Promise<void> {
    const blogRef = doc(db, COLLECTIONS.blogs, id);
    await updateDoc(blogRef, data);
}

export async function deleteBlog(id: string): Promise<void> {
    const blogRef = doc(db, COLLECTIONS.blogs, id);
    await deleteDoc(blogRef);
}

// ==================== PORTFOLIO ====================
export async function getPortfolio(featuredOnly = false): Promise<PortfolioItem[]> {
    const portfolioRef = collection(db, COLLECTIONS.portfolio);
    const q = featuredOnly
        ? query(portfolioRef, where("featured", "==", true))
        : query(portfolioRef);
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => docToData<PortfolioItem>(doc));
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
    const portfolioRef = collection(db, COLLECTIONS.portfolio);
    const q = query(portfolioRef, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return docToData<PortfolioItem>(snapshot.docs[0]);
}

export async function createPortfolioItem(item: Omit<PortfolioItem, "id">): Promise<string> {
    const portfolioRef = collection(db, COLLECTIONS.portfolio);
    const docRef = await addDoc(portfolioRef, item);
    return docRef.id;
}

export async function updatePortfolioItem(id: string, data: Partial<PortfolioItem>): Promise<void> {
    const itemRef = doc(db, COLLECTIONS.portfolio, id);
    await updateDoc(itemRef, data);
}

export async function deletePortfolioItem(id: string): Promise<void> {
    const itemRef = doc(db, COLLECTIONS.portfolio, id);
    await deleteDoc(itemRef);
}

// ==================== TEAM ====================
export async function getTeamMembers(): Promise<TeamMember[]> {
    const teamRef = collection(db, COLLECTIONS.team);
    const snapshot = await getDocs(teamRef);
    return snapshot.docs.map((doc) => docToData<TeamMember>(doc));
}

export async function createTeamMember(member: Omit<TeamMember, "id">): Promise<string> {
    const teamRef = collection(db, COLLECTIONS.team);
    const docRef = await addDoc(teamRef, member);
    return docRef.id;
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<void> {
    const memberRef = doc(db, COLLECTIONS.team, id);
    await updateDoc(memberRef, data);
}

export async function deleteTeamMember(id: string): Promise<void> {
    const memberRef = doc(db, COLLECTIONS.team, id);
    await deleteDoc(memberRef);
}

// ==================== CONTACTS ====================
export async function getContacts(): Promise<ContactSubmission[]> {
    const contactsRef = collection(db, COLLECTIONS.contacts);
    const q = query(contactsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => docToData<ContactSubmission>(doc));
}

export async function createContact(contact: Omit<ContactSubmission, "id" | "createdAt" | "status">): Promise<string> {
    const contactsRef = collection(db, COLLECTIONS.contacts);
    const docRef = await addDoc(contactsRef, {
        ...contact,
        createdAt: Timestamp.now(),
        status: "new",
    });
    return docRef.id;
}

export async function updateContactStatus(id: string, status: ContactSubmission["status"]): Promise<void> {
    const contactRef = doc(db, COLLECTIONS.contacts, id);
    await updateDoc(contactRef, { status });
}

// ==================== SERVICES ====================
export async function getServices(): Promise<Service[]> {
    const servicesRef = collection(db, COLLECTIONS.services);
    const snapshot = await getDocs(servicesRef);
    return snapshot.docs.map((doc) => docToData<Service>(doc));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    const servicesRef = collection(db, COLLECTIONS.services);
    const q = query(servicesRef, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return docToData<Service>(snapshot.docs[0]);
}

// ==================== TESTIMONIALS ====================
export async function getTestimonials(): Promise<Testimonial[]> {
    const testimonialsRef = collection(db, "testimonials");
    const q = query(testimonialsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => docToData<Testimonial>(doc));
}

export async function createTestimonial(testimonial: Omit<Testimonial, "id" | "createdAt">): Promise<string> {
    const testimonialsRef = collection(db, "testimonials");
    const docRef = await addDoc(testimonialsRef, {
        ...testimonial,
        createdAt: Timestamp.now(),
    });
    return docRef.id;
}

export async function updateTestimonial(id: string, data: Partial<Testimonial>): Promise<void> {
    const testimonialRef = doc(db, "testimonials", id);
    await updateDoc(testimonialRef, data);
}

export async function deleteTestimonial(id: string): Promise<void> {
    const testimonialRef = doc(db, "testimonials", id);
    await deleteDoc(testimonialRef);
}
