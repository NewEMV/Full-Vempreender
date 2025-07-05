import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Post } from "@/types/post";

const postsCollectionRef = collection(db, "posts");

export async function getPosts(postLimit?: number): Promise<Post[]> {
  const postsQuery = postLimit
    ? query(postsCollectionRef, limit(postLimit))
    : query(postsCollectionRef);

  try {
    const snapshot = await getDocs(postsQuery);
    if (snapshot.empty) {
      return [];
    }
    // Safely map documents to Post objects, providing defaults for missing fields
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        image: data.image || '',
        aiHint: data.aiHint || '',
        content: data.content || '',
      };
    }) as Post[];
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return [];
  }
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const docRef = doc(db, "posts", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }
    const data = snapshot.data();
    // Safely map the document to a Post object
    return {
      id: snapshot.id,
      title: data.title || '',
      image: data.image || '',
      aiHint: data.aiHint || '',
      content: data.content || '',
    } as Post;
  } catch (error)
  {
    console.error("Error fetching post: ", error);
    return null;
  }
}
