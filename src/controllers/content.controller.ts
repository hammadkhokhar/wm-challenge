import { Request, Response } from "express";
import {
  QuerySnapshot,
  getDocs,
  CollectionReference,
  addDoc,
  DocumentReference,
  collection,
  DocumentData,
} from "firebase/firestore";
import { database } from "../config/firebase.config";
import { ContentData } from "../interfaces/content.interface";

class Content {
  private static instance: Content | null = null;
  private collection: CollectionReference;

  // Private constructor to prevent instantiation of the class
  private constructor(collection: CollectionReference) {
    this.collection = collection;
  }

  // Singleton pattern to ensure only one instance of the class is created
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
      // Get all documents in the collection
      const contents: QuerySnapshot<DocumentData> = await getDocs(
        this.collection,
      );

      // Iterate through each document in the collection
      contents.forEach((doc) => {
        const contentData = doc.data() as ContentData;
        // Checks if individual user selections match the document to recommend
        if (
          (userSelection.learning_speed === "any" ||
            userSelection.learning_speed === contentData.learning_speed) &&
          (userSelection.support_type === "any" ||
            userSelection.support_type === contentData.support_type) &&
          (userSelection.learning_style === "any" ||
            userSelection.learning_style === contentData.learning_style) &&
          userSelection.challenges.some((challenge) =>
            contentData.challenges.includes(challenge),
          )
        ) {
          // Add the document to the recommendations
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
      const processed = await contentInstance.add(doc);
      console.log("Document added:", processed.id);
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
