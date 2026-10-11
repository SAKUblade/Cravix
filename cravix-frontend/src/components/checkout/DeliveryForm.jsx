import {
  MapPin,
  Phone,
  User,
  Home,
  Building2,
  Hash,
  FileText,
} from "lucide-react";

import "./DeliveryForm.css";

function DeliveryForm({ formData, handleChange }) {
  return (
    <div className="delivery-form">

      {/* Header */}

      <div className="delivery-header">

        <div className="delivery-icon">
          <MapPin size={26} />
        </div>

        <div className="delivery-heading">
          <h2>Delivery Details</h2>

          <p>
            Please enter your delivery information.
          </p>
        </div>

      </div>

      {/* Name & Phone */}

      <div className="form-grid">

        <div className="form-group">

          <label>Full Name</label>

          <div className="input-group">

            <User
              size={20}
              className="input-icon"
            />

            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="John Doe"
              className="form-input"
            />

          </div>

        </div>

        <div className="form-group">

          <label>Phone Number</label>

          <div className="input-group">

            <Phone
              size={20}
              className="input-icon"
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="form-input"
            />

          </div>

        </div>

      </div>

      {/* Address */}

      <div className="form-group form-spacing">

        <label>Delivery Address</label>

        <div className="input-group">

          <Home
            size={20}
            className="input-icon textarea-icon"
          />

          <textarea
            rows="4"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House No., Street, Area..."
            className="form-textarea"
          />

        </div>

      </div>

      {/* City & Pincode */}

      <div className="form-grid form-spacing">

        <div className="form-group">

          <label>City</label>

          <div className="input-group">

            <Building2
              size={20}
              className="input-icon"
            />

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Noida"
              className="form-input"
            />

          </div>

        </div>

        <div className="form-group">

          <label>Pincode</label>

          <div className="input-group">

            <Hash
              size={20}
              className="input-icon"
            />

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="201301"
              className="form-input"
            />

          </div>

        </div>

      </div>

      {/* Instructions */}

      <div className="form-group form-spacing">

        <label>Delivery Instructions</label>

        <div className="input-group">

          <FileText
            size={20}
            className="input-icon textarea-icon"
          />

          <textarea
            rows="3"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Ring the bell once..."
            className="form-textarea"
          />

        </div>

      </div>

    </div>
  );
}

export default DeliveryForm;