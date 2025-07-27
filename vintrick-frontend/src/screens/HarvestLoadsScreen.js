// src/screens/HarvestLoadsScreen.js
import './HarvestLoadsScreen.css';
import React, { useState, useEffect } from "react";
import HeaderBar from "../components/HeaderBar";
import AddEditHarvestLoadForm from "../components/AddEditHarvestLoadForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

// All available crush pads (adjust as needed)
const CRUSH_PADS = ["All", "White Crush Pad", "Red Crush Pad", "Reserve Crush Pad"];

// Fetches all harvest loads from the backend (now receives authFetch as a param)
const fetchHarvestLoads = async (authFetch) => {
  const response = await authFetch('/api/harvestloads');
  if (!response.ok) throw new Error('Failed to fetch harvest loads');
  const data = await response.json();

  // Map backend fields to display fields (adjust as needed)
  return data.map(item => ({
    id: item.uid,
    uid: item.uid,
    Date_Received: item.Date_Received,
    WO: item.WO,
    Block: item.Block,
    Vintrace_ST: item.Vintrace_ST,
    Tons: item.Tons,
    Crush_Pad: item.Crush_Pad || "",
  }));
};

export default function HarvestLoadsScreen() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [crushPad, setCrushPad] = useState("All");
  const [sortCol, setSortCol] = useState("Date_Received");
  const [sortDesc, setSortDesc] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add/Edit modal state
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const navigate = useNavigate();
  const { authFetch } = useAuth(); // Use authFetch from context

  useEffect(() => {
    setLoading(true);
    fetchHarvestLoads(authFetch)
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [authFetch]);

  // Open Add modal
  function handleAddNew() {
    setFormMode("add");
    setSelectedRecord(null);
    setShowForm(true);
  }

  // Open Edit modal
  function handleOpenEdit(record) {
    setFormMode("edit");
    setSelectedRecord(record);
    setShowForm(true);
  }

  // Submit handler for form
  async function handleFormSubmit(formValues) {
    try {
      let res;
      if (formMode === "add") {
        // POST create
        res = await authFetch('/api/harvestloads', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues)
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Add failed');
        }
      } else {
        // PATCH update (use .id or .uid)
        const uid = formValues.id || formValues.uid;
        res = await authFetch(`/api/harvestloads/${uid}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues)
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Edit failed');
        }
      }
      setShowForm(false);
      setLoading(true);
      setError(null);
      const updated = await fetchHarvestLoads(authFetch);
      setData(updated);
    } catch (e) {
      setError(e.message);
    }
  }

  // Filter & sort
  const filtered = data.filter(rec => {
    let match = true;
    if (crushPad !== "All" && rec.Crush_Pad !== crushPad) match = false;
    if (
      search &&
      !(
        `${rec.Date_Received} ${rec.WO} ${rec.Block} ${rec.Vintrace_ST}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    )
      match = false;
    return match;
  });

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortCol];
    const valB = b[sortCol];
    if (valA < valB) return sortDesc ? 1 : -1;
    if (valA > valB) return sortDesc ? -1 : 1;
    return 0;
  });

  return (
    <div className="harvestloads-root">
      <HeaderBar
        title="Harvest Loads"
        onBack={() => navigate(-1)}
        onAdd={handleAddNew}
        addLabel="+ Add"
      />
      <div className="card harvestloads-card">
        <div className="harvestloads-controls">
          <input
            className="harvestloads-search"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="harvestloads-crushpad"
            value={crushPad}
            onChange={e => setCrushPad(e.target.value)}
          >
            {CRUSH_PADS.map(cp => (
              <option value={cp} key={cp}>{cp}</option>
            ))}
          </select>
        </div>
        <div className="harvestloads-table-scroll">
          <table className="harvestloads-table">
            <thead>
              <tr>
                {["Date_Received", "WO", "Block", "Vintrace_ST", "Tons"].map(col => (
                  <th
                    key={col}
                    onClick={() => {
                      setSortCol(col);
                      setSortDesc(c => (sortCol === col ? !c : false));
                    }}
                  >
                    {col.replace("_", " ")} {sortCol === col ? (sortDesc ? "▼" : "▲") : ""}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(rec => (
                <tr key={rec.id}>
                  <td>{rec.Date_Received}</td>
                  <td>{rec.WO}</td>
                  <td>{rec.Block}</td>
                  <td>{rec.Vintrace_ST}</td>
                  <td>{rec.Tons}</td>
                  <td>
                    <button
                      className="nav-btn nav-btn-light"
                      style={{ padding: "5px 14px", fontSize: 15 }}
                      onClick={() => handleOpenEdit(rec)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 24 }}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {error && (
          <div style={{ color: "red", padding: 10, textAlign: "center" }}>
            {error}
          </div>
        )}
      </div>
      <AddEditHarvestLoadForm
        show={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        initialData={formMode === "edit" ? selectedRecord : undefined}
        mode={formMode}
      />
    </div>
  );
}
