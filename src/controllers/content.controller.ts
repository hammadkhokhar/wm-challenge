import { Request, Response } from "express";
import {
  QuerySnapshot,
  getDocs,
  CollectionReference,
  addDoc,
  DocumentReference,
  collection,
  DocumentData,
  query,
  where,
  Query,
} from "firebase/firestore";
import { database } from "../config/firebase.config";
import { ContentData } from "../interfaces/content.interface";

class Content {
  private static instance: Content | null = null;
  private readonly collection: CollectionReference<DocumentData>;

  // Private constructor to prevent instantiation of the class from outside
  private constructor(collection: CollectionReference) {
    this.collection = collection;
  }

  // Ensure only one instance of the class is created
  static getInstance(collection: CollectionReference): Content {
    if (!Content.instance) {
      Content.instance = new Content(collection);
    }
    return Content.instance;
  }

  // Add a document to the collection
  async add(data: ContentData): Promise<DocumentReference> {
    try {
      const doc = await addDoc(this.collection, data);
      return doc;
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  }

  // Get content recommendations based on user selections
  async getContentRecommendations(
    userSelection: ContentData,
  ): Promise<ContentData[]> {
    try {
      const content: ContentData[] = [];
      
      // Query builder for the collection
      let queryFilter: Query<DocumentData> = query(this.collection);

      // Query building with filters
      if (userSelection.learning_speed !== "any") {
        queryFilter = query(queryFilter, where("learning_speed", "==", userSelection.learning_speed));
      }
      if (userSelection.support_type !== "any") {
        queryFilter = query(queryFilter, where("support_type", "==", userSelection.support_type));
      }
      if (userSelection.learning_style !== "any") {
        queryFilter = query(queryFilter, where("learning_style", "==", userSelection.learning_style));
      }

      // Execute the query
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(queryFilter);

      // Process query results
      querySnapshot.forEach((doc) => {
        const contentData = doc.data() as ContentData;
        if (userSelection.challenges.some(challenge => contentData.challenges.includes(challenge))) {
          content.push(contentData);
        }
      });

      return content;
    } catch (error) {
      console.error("Error getting documents:", error);
      throw error;
    }
  }
}

// Add content to the collection
async function addContent(req: Request, res: Response): Promise<void> {
  const contentCollectionRef = collection(database, "content");
  const contentInstance = Content.getInstance(contentCollectionRef);

  try {
    // Data to seed the collection with
    const data: ContentData[] = [
      {
        name: "Stress Away",
        challenges: ["stress", "time", "communication"],
        learning_speed: "Fast",
        support_type: "Peer support",
        description: "Learn how to manage stress",
        learning_style: "Reading",
      },
      {
        name: "Communicate Better",
        challenges: ["communication", "collaboration", "advancement"],
        learning_speed: "Slow",
        description: "Learn how to communicate better",
        support_type: "Personalized coaching sessions",
        learning_style: "Watching",
      },
      {
        name: "Balanced Life",
        challenges: [
          "stress",
          "time",
          "balance",
          "advancement",
          "collaboration",
          "communication",
        ],
        learning_speed: "Moderate",
        description: "Learn how to balance",
        support_type: "Personalized coaching sessions",
        learning_style: "Watching",
      },
    ];

    // Add documents to the collection
    for (const doc of data) {
      const existingDocQuery = query(contentCollectionRef, where("name", "==", doc.name));
      const existingDocs = await getDocs(existingDocQuery);

      if (existingDocs.empty) {
        const processed = await contentInstance.add(doc);
        console.log("Document added:", processed.id);
      } else {
        console.log("Document already exists:", doc.name);
      }
    }

    res.status(201).send({ message: "Seeded" });
  } catch (error) {
    console.error("Failed to add document:", error);
    res.status(500).send(error);
  }
}

// Get content recommendations based on user selections
async function getContentRecommendations(
  req: Request,
  res: Response,
): Promise<void> {
  const userSelection: ContentData = req.body;

  // Get the collection reference
  const contentCollectionRef = collection(database, "content");

  // Get an instance of the Content class
  const contentInstance = Content.getInstance(contentCollectionRef);

  try {
    // Get content recommendations based on user challenges
    const content: ContentData[] =
      await contentInstance.getContentRecommendations(userSelection);
    // Send the recommendations as a response
    res.status(200).send(content);
  } catch (error) {
    console.error("Failed to get documents:", error);
    res.status(500).send(error);
  }
}

// Export the functions
export { addContent, getContentRecommendations };
