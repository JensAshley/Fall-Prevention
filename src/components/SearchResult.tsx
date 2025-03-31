import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

interface Patient {
    id: string;
    patient_info: {
        first_name: string;
        last_name: string;
        address?: string;
        phone?: string;
        gender?: string;
    };
}

interface SearchResultProps {
    results: Patient[];
    pinnedPatients: Patient[];
    handlePinPatient: (patient: Patient) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ results, pinnedPatients, handlePinPatient }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, index) => (
                    <tr key={result.id}>
                        <td>{index + 1}</td>
                        <td>
                            {result.patient_info?.first_name} {result.patient_info?.last_name}
                        </td>
                        <td>{result.patient_info?.address || "N/A"}</td>
                        <td>{result.patient_info?.phone || "N/A"}</td>
                        <td>{result.patient_info?.gender || "N/A"}</td>
                        <td>
                            <Button
                                variant="warning"
                                size="sm"
                                onClick={() => handlePinPatient(result)}
                            >
                                {pinnedPatients.some((p: Patient) => p.id === result.id) ? "Unpin" : "Pin"}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default SearchResult;
