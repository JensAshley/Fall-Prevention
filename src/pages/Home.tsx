import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import SearchBar from "../components/SearchBar";
import FormButton from "../components/FormButton";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, query } from "firebase/firestore";
import {
  collection,
  query as firestoreQuery,
  where,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import app from "../app/firebaseSetup";
import NavBar from "../components/NavBar";
import SearchResult from "../components/SearchResult";
import IncompleteFormCard from "../components/IncompleteFormCard";
import Modal from "react-bootstrap/esm/Modal";
import { Button, Tabs, Tab, Card } from "react-bootstrap";
import StickyNote from "../components/StickyNote"; // Import StickyNote component

const db = getFirestore(app);
const usersCollection = collection(db, "patients");
const remindersCollection = collection(db, "reminders");
const incompleteCollection = collection(db, "incomplete");

const Home: React.FC = () => {
  const admin = useSelector((state: RootState) => state.user);

  // TODO: replace dummy values with actual patient profiles from Firestore
  const [patients, setPatients] = useState<any[]>([
    { id: "1", patient_info: { first_name: "John", last_name: "Doe" } },
    { id: "2", patient_info: { first_name: "Jane", last_name: "Smith" } },
    { id: "3", patient_info: { first_name: "Michael", last_name: "Johnson" } },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [reminderText, setReminderText] = useState<string>("");
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [incompleteForms, setIncompleteForms] = useState<any[]>([]);
  const [searchedPatients, setSearchedPatients] = useState<any[]>([]);
  const [selectedPatientName, setSelectedPatientName] = useState<string>("");
  const [patientSearchQuery, setPatientSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const [pinnedPatients, setPinnedPatients] = useState<any[]>([]);

  const loadPinnedPatients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pinnedPatients"));
      const pinned = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPinnedPatients(pinned);
    } catch (error) {
      console.error("Error loading pinned patients:", error);
    }
  };

  useEffect(() => {
    loadPinnedPatients();
  }, []);

  const handlePinPatient = async (patient: any) => {
    try {
      const existingPin = pinnedPatients.find((p) => p.id === patient.id);
      if (existingPin) {
        await deleteDoc(doc(db, "pinnedPatients", patient.id));
        setPinnedPatients((prev) => prev.filter((p) => p.id !== patient.id));
      } else {
        await addDoc(collection(db, "pinnedPatients"), {
          id: patient.id,
          patient_info: patient.patient_info,
        });
        setPinnedPatients((prev) => [...prev, patient]);
      }
    } catch (error) {
      console.error("Error pinning/unpinning patient:", error);
    }
  };


  const handleShowModal = (patientId: string) => {
    setSelectedPatientId(patientId);
    setPatientSearchQuery("");
    setSearchedPatients([]);
    setSelectedPatientName("");
    setShowModal(true);
  };


  
  const handlePatientSearch = async (query: string) => {
    setPatientSearchQuery(query);

    if (query.trim().length < 2) {
      setSearchedPatients([]);
      return;
    }

    try {
      // Create a query that looks for patients where name_lower contains the search string
      const q = firestoreQuery(
        usersCollection,
        where('patient_info.name_lower', '>=', query.toLowerCase()),
        where('patient_info.name_lower', '<=', query.toLowerCase() + '\uf8ff')
      );

      const querySnapshot = await getDocs(q);
      const patients = querySnapshot.docs.map(doc => ({
        id: doc.id,
        patient_info: doc.data().patient_info
      }));

      setSearchedPatients(patients);
    } catch (error) {
      console.error("Error searching patients:", error);
      setSearchedPatients([]);
    }
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setReminderText("");
  };

  const handlePatientSelect = (patient: any) => {
    setSelectedPatientId(patient.id);
    setSelectedPatientName(`${patient.patient_info.first_name} ${patient.patient_info.last_name}`);
    setSearchedPatients([]); // Clear search results
    setPatientSearchQuery(""); // Clear search input
  };

  const handleAddReminder = async () => {
    if (!reminderText.trim() || !selectedPatientId) return;

    try {
      await addDoc(remindersCollection, {
        patientId: selectedPatientId,
        text: reminderText,
      });
      setReminderText("");
      alert("Reminder added successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error adding reminder: ", error);
    }
  };

  const loadIncompleteForms = async () => {
    const querySnapshot = await getDocs(incompleteCollection);
    const forms = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIncompleteForms(forms);
  };

  useEffect(() => {
    loadIncompleteForms();
  }, []);

  const handleIncompleteFormClick = (formId: string) => {
    navigate(`/newpatient?formId=${formId}`);
  };

  const handleDeleteForm = async (formId: string) => {
    await deleteDoc(doc(db, "incomplete", formId));
    setIncompleteForms((prevForms) =>
      prevForms.filter((form) => form.id !== formId)
    );
  };

  const [hasSearched, setHasSearched] = useState(false); // track if search was performed

  const handleSearch = async (searchType: string, queryValue: string) => {
    if (!queryValue.trim()) return;

    setHasSearched(true); // mark that a search has been done

    const searchLower = queryValue.toLowerCase();
    const endValue = searchLower + "\uf8ff";

    const q = firestoreQuery(
      usersCollection,
      where("patient_info.name_lower", ">=", searchLower),
      where("patient_info.name_lower", "<=", endValue)
    );

    try {
      const querySnapshot = await getDocs(q);
      let users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSearchResults(users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };


  return (
    <div className="main">
      <NavBar />

      <div className="content" style={{ padding: "20px", flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <SearchBar onSearch={handleSearch} />
            <div style={{ marginLeft: "20px" }}>
              <Link
                to="/newpatient"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <FormButton onFormSubmit={() => { }} />
              </Link>
            </div>
          </div>

          {hasSearched && searchResults.length === 0 ? (
            <p>No results found</p>
          ) : (
            searchResults.length > 0 && <SearchResult
              results={searchResults}
              pinnedPatients={pinnedPatients}
              handlePinPatient={handlePinPatient}
            />
          )}


          <p style={{ fontSize: "25px" }}>Patient Portal</p>

          {/* Incomplete Forms Section */}
          <h4>Incomplete Forms</h4>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {incompleteForms.length > 0 ? (
              incompleteForms.map((form) => (
                <IncompleteFormCard
                  key={form.id}
                  form={form}
                  onClick={() => handleIncompleteFormClick(form.id)}
                  onDelete={() => handleDeleteForm(form.id)}
                />
              ))
            ) : (
              <p>No current incomplete forms</p>
            )}
          </div>

          {/* Sticky Note */}
          <StickyNote />

          {/* Tabs Inside a Box */}
          <Card
            className="mb-3"
            style={{ borderRadius: "8px", border: "1px solid #ddd" }}
          >
            <Card.Body>
              <Tabs
                defaultActiveKey="frequentlyAccessedPatients"
                id="patient-tabs"
                className="custom-tabs"
              >
                <Tab
                  eventKey="frequentlyAccessedPatients"
                  title="Frequently Accessed Patients"
                >
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {patients.map((patient) => (
                      <Card
                        key={patient.id}
                        style={{ width: "18rem", margin: "10px" }}
                      >
                        <Card.Body>
                          <Card.Title>
                            {patient.patient_info.first_name}{" "}
                            {patient.patient_info.last_name}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Tab>

                <Tab eventKey="patientReminders" title="Patient Reminders">
                  <h4>Patient Reminders</h4>
                  <Button onClick={() => handleShowModal("1")}>
                    Add Reminder
                  </Button>
                </Tab>
                <Tab eventKey="pinnedPatients" title="Pinned Patients">
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {pinnedPatients.length > 0 ? (
                      pinnedPatients.map((patient) => (
                        <Card key={patient.id} style={{ width: "18rem", margin: "10px" }}>
                          <Card.Body>
                            <Card.Title>
                              {patient.patient_info.first_name} {patient.patient_info.last_name}
                            </Card.Title>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handlePinPatient(patient)}
                            >
                              Unpin
                            </Button>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <p>No pinned patients</p>
                    )}
                  </div>
                </Tab>

              </Tabs>
            </Card.Body>
          </Card>
        </div>

        {/* Reminder Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>

  <Modal.Header closeButton>
    <Modal.Title>Send Reminder</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="mb-3 position-relative">
      <label htmlFor="patientSearch" className="form-label">Search Patient</label>
      <input
        type="text"
        id="patientSearch"
        className="form-control"
        value={patientSearchQuery}
        onChange={(e) => handlePatientSearch(e.target.value)}
        placeholder="Search for a patient..."
      />
      
      {/* Search Results Dropdown */}
      {patientSearchQuery.length >= 2 && (
        <div 
          className="position-absolute w-100 mt-1 border rounded bg-white shadow-sm" 
          style={{ 
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto'
          }}
        >
          {searchedPatients.length > 0 ? (
            searchedPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-2 hover:bg-gray-100 cursor-pointer border-bottom"
                onClick={() => handlePatientSelect(patient)}
                style={{ cursor: 'pointer' }}
              >
                {patient.patient_info.first_name} {patient.patient_info.last_name}
              </div>
            ))
          ) : (
            <div className="p-2 text-muted">No patients found</div>
          )}
        </div>
      )}

      {/* Selected Patient Display */}
      {selectedPatientName && (
        <div className="mt-2 p-2 bg-light rounded">
          Selected Patient: {selectedPatientName}
        </div>
      )}
    </div>

    {/* Reminder Input */}
    <div className="mt-3">
      <label htmlFor="reminderText" className="form-label">Reminder Message</label>
      <input
        type="text"
        id="reminderText"
        className="form-control"
        value={reminderText}
        onChange={(e) => setReminderText(e.target.value)}
        placeholder="Enter reminder message"
      />
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Cancel
    </Button>
    <Button 
      variant="primary" 
      onClick={handleAddReminder}
      disabled={!selectedPatientId || !reminderText.trim()}
    >
      Send
    </Button>
  </Modal.Footer>
</Modal>
      </div>
    </div>
  );
};

export default Home;