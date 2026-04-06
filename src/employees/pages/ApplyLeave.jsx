import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackModal from "../components/FeedbackModal";
import "../styles/applyLeave.css";

const ApplyLeave = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [form, setForm] = useState({
    type: "",
    start: "",
    end: "",
    days: 0,
    reason: "",
    attachment: null,
  });

  // =========================
  // FETCH ENTITLED LEAVE TYPES
  // =========================
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/leave/my-leave-types",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setLeaveTypes(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Failed to load leave types");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveTypes();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "attachment") {
      setForm({ ...form, attachment: files[0] });
      return;
    }

    const updatedForm = { ...form, [name]: value };

    const startDate = new Date(updatedForm.start);
    const endDate = new Date(updatedForm.end);

    if (updatedForm.start && updatedForm.end && endDate >= startDate) {
      updatedForm.days =
        Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    } else {
      updatedForm.days = 0;
    }

    setForm(updatedForm);
  };

  // =========================
  // SUBMIT (🔥 FIXED)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("type", form.type);
      formData.append("start", form.start);
      formData.append("end", form.end);
      formData.append("days", form.days);
      formData.append("reason", form.reason);

      if (form.attachment) {
        formData.append("attachment", form.attachment);
      }

      await axios.post(
        "http://localhost:5000/api/leave/apply", // ✅ FIXED
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // ✅ SUCCESS
      setModal({
        show: true,
        type: "success",
        message: "Leave applied & balance updated ✅",
      });

      // 🔥 TRIGGER DASHBOARD REFRESH
      window.dispatchEvent(new Event("leaveUpdated"));

      // RESET FORM
      setForm({
        type: "",
        start: "",
        end: "",
        days: 0,
        reason: "",
        attachment: null,
      });

    } catch (err) {
      setModal({
        show: true,
        type: "error",
        message:
          err.response?.data?.message || "Failed to submit leave ❌",
      });
    }
  };

  return (
    <div className="apply-leave-container">
      <h1 className="form-title">Apply for Leave</h1>

      <form className="leave-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Leave Type *</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Leave Type</option>

            {loading ? (
              <option disabled>Loading...</option>
            ) : error ? (
              <option disabled>{error}</option>
            ) : leaveTypes.length === 0 ? (
              <option disabled>No entitled leaves</option>
            ) : (
              leaveTypes.map((type) => (
                <option key={type.leaveTypeId} value={type.name}>
                  {type.name || type.leaveType?.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Leave Duration *</label>
          <div className="form-row">
            <input type="date" name="start" value={form.start} onChange={handleChange} required />
            <input type="date" name="end" value={form.end} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Total Days</label>
          <input type="number" value={form.days} readOnly />
        </div>

        <div className="form-group">
          <label>Reason *</label>
          <textarea name="reason" value={form.reason} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Attachment</label>
          <input type="file" name="attachment" onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">
          Submit Leave Request
        </button>
      </form>

      <FeedbackModal
        show={modal.show}
        type={modal.type}
        message={modal.message}
        onClose={() => setModal({ ...modal, show: false })}
      />
    </div>
  );
};

export default ApplyLeave;

