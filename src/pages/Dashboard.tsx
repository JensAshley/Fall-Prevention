import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import UserIcon from "../components/UserIcon";
import { setDoc } from "firebase/firestore";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "../components/NavBar";
import NavDropdown from "react-bootstrap/NavDropdown";
import BathroomLightsChart from "./ProgressGraph";

// Define type for message
type Message = {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
};

function Dashboard() {
  const userId = useSelector((state: RootState) => state.user.viewUser);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMessaging, setShowMessaging] = useState(false); // State to toggle messaging component
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Firebase Firestore reference
    const firestore = getFirestore();

    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(`${userData.last_name}, ${userData.first_name}`);
          setEmail(userData.email);
        } else {
          console.log("No user found");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();

    // Fetch messages
    const messagesCollection = collection(firestore, "messages");
    const unsubscribe = onSnapshot(messagesCollection, (snapshot) => {
      const messagesData: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Ensure the document data matches the Message type
        if (
          "senderId" in data &&
          "senderName" in data &&
          "message" in data &&
          "timestamp" in data
        ) {
          messagesData.push({
            id: doc.id,
            senderId: data.senderId,
            senderName: data.senderName,
            message: data.message,
            timestamp: data.timestamp,
          });
        }
      });
      setMessages(messagesData);
    });

    // Clean up subscription
    return () => {
      unsubscribe();
    };
  }, [userId]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        // Firebase Firestore reference
        const firestore = getFirestore();

        // Add message to Firestore
        await addDoc(collection(firestore, "messages"), {
          senderId: userId,
          senderName: name,
          message: message.trim(),
          timestamp: new Date().toISOString(),
        });

        setMessage("");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    }
  };

  const saveNotes = async () => {
    try {
      // Firebase Firestore reference
      const firestore = getFirestore();

      // Update user notes in Firestore
      await setDoc(doc(firestore, "users", userId), { notes }, { merge: true });

      console.log("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes: ", error);
    }
  };

  return (
    <div className="main">
      <NavBar />
      <div
        className="content"
        style={{
          display: "flex",
          alignItems: "flex-start",
          //justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div style={{ marginRight: "150px", marginLeft: "20px" }}>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
              marginBottom: "1rem", // Space between SVG and other elements
            }}
          >
            {/* SVG Icon 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="75"
              height="75"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </div>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <p style={{ fontSize: "25px" }}>{name}</p>
          </div>
          <div
            style={{
              width: "300px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Graph</h2>
            {/* Placeholder for Graph component 
            <div style={{ textAlign: "center", color: "#999" }}>
              Graph component placeholder
            </div>
          </div> */}
          <h1 style={{ textAlign: "center" }}>Patient 1</h1>
          <BathroomLightsChart />
          <br />
          <br />
          <h1 style={{ textAlign: "center" }}>Patient 2</h1>
          <BathroomLightsChart />
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: "300px",
                marginRight: "20px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Messaging
              </h2>
              {/* Show/hide messaging component based on state */}
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  background: "#f9f9f9",
                  marginBottom: "10px",
                }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      marginBottom: "10px",
                      padding: "5px",
                      borderRadius: "5px",
                      background: "#fff",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    <strong style={{ color: "#333" }}>{msg.senderName} </strong>
                    <span style={{ color: "#555" }}>{msg.message}</span>
                  </div>
                ))}
              </div>
              {/* Messaging input box */}
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "5px",
                    marginRight: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  placeholder="Type your message..."
                />
                <button
                  onClick={sendMessage}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    background: "#eee",
                    cursor: "pointer",
                  }}
                >
                  Send
                </button>
              </div>
            </div>
            <div
              style={{
                width: "300px",
                marginRight: "20px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Notes
              </h2>
              <textarea
                style={{
                  width: "100%",
                  minHeight: "200px",
                  fontSize: "16px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
                placeholder="Add your notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button
                onClick={saveNotes}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  background: "#007bff",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
