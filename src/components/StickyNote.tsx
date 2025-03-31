// src/components/StickyNote.tsx
import React, { useEffect, useState } from "react";
import "./StickyNote.css"; // Custom styles for sticky note
import { get, getDatabase, ref, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const StickyNote: React.FC = () => {
  const [noteContent, setNoteContent] = useState<string>("Type your note here...");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleDrag = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleDragEnd = () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleSave = async () => {
    const auth = getAuth();
    const db = getDatabase();
    const user = auth.currentUser;
  
  
    if (!user) {
      return;
    }
  
  
    try {
      const adminRef = ref(db, `admin/${user.uid}`);
      const snapshot = await get(adminRef);
  
  
      if (!snapshot.exists()) {
        console.error("Admin data not found");
        return;
      }
  
  
      await update(adminRef, { stickyNoteText: noteContent });
  
  
      setIsEditing(false);
    } catch (error) {
      console.error("Error ", error);
    }
  };
  

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      setError(null);

      if (user) {
        try {
          const db = getDatabase();
          const adminRef = ref(db, `admin/${user.uid}`);
          const snapshot = await get(adminRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            setNoteContent(data.stickyNoteText || "");
          } else {
            setNoteContent(""); 
          }
        } catch (err) {
          console.error("Error fetching sticky note:", err);
        }
      } else {
        setNoteContent(""); 
      }

      setIsLoading(false);
    });

    return () => unsubscribe(); 
  }, []);


  return (
    <div
      className="sticky-note"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="sticky-note-header">
        <span>Sticky Note</span>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
      {isEditing ? (
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
      ) : (
        <p>{noteContent}</p>
      )}
      {!isEditing && (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default StickyNote;
