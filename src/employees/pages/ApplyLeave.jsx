import React, { useState, useEffect } from "react";
import axios from "axios";
import FeedbackModal from "../components/FeedbackModal"; // ✅ ADDED
import "../styles/applyLeave.css";

const ApplyLeave = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ ADDED MODAL STATE
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
    description: "",
    attachment: null,
  });

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/leave/leave"
        );

        console.log("Leave Types:", res.data);

        if (Array.isArray(res.data)) {
          setLeaveTypes(res.data);
        } else if (res.data.data) {
          setLeaveTypes(res.data.data);
        } else {
          setLeaveTypes([]);
        }
      } catch (err) {
        console.error("Error fetching leave types:", err);
        setError("Failed to load leave types");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveTypes();
  }, []);

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
      const diff =
        Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

      updatedForm.days = diff;
    } else {
      updatedForm.days = 0;
    }

    setForm(updatedForm);
  };

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
        "http://localhost:5000/api/leave/leave",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ✅ REPLACED ALERT WITH MODAL
      setModal({
        show: true,
        type: "success",
        message: "Leave submitted successfully ✅",
      });

      setForm({
        type: "",
        start: "",
        end: "",
        days: 0,
        reason: "",
        description: "",
        attachment: null,
      });

    } catch (err) {
      console.error("Submit error:", err);

      setModal({
        show: true,
        type: "error",
        message: "Failed to submit leave ❌",
      });
    }
  };

  return (
    <div className="apply-leave-container">
      <h1 className="form-title">Apply for Leave</h1>

      <form className="leave-form" onSubmit={handleSubmit}>
        {/* Leave Type */}
        <div className="form-group">
          <label>
            Leave Type <span className="required">*</span>
          </label>

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
              <option disabled>No leave types available</option>
            ) : (
              leaveTypes.map((type, index) => (
                <option
                  key={type._id || index}
                  value={type.name || type}
                >
                  {type.name || type}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Leave Duration */}
        <div className="form-group">
          <label>
            Leave Duration <span className="required">*</span>
          </label>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="start"
                value={form.start}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="end"
                value={form.end}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Total Days */}
        <div className="form-group">
          <label>Total Days</label>
          <input
            type="number"
            name="days"
            value={form.days}
            readOnly
          />
        </div>

        {/* Reason */}
        <div className="form-group">
          <label>
            Reason <span className="required">*</span>
          </label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Enter reason..."
            required
          />
        </div>

        {/* Attachment */}
        <div className="form-group">
          <label>
            Attachment <span className="optional">(optional)</span>
          </label>
          <input
            type="file"
            name="attachment"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Leave Request
        </button>
      </form>

      {/* ✅ MODAL ADDED */}
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

