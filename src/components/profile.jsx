import React, { useState } from "react"
import defaultProfilePic from "../../public/images/dodge.jpg"
import "./Profile.css"

const Profile = () => {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState("John Doe")
  const [email, setEmail] = useState("johndoe@email.com")
  const [phone, setPhone] = useState("+1 234 567 890")
  const [profilePic, setProfilePic] = useState(defaultProfilePic)

  const handleSave = (e) => {
    e.preventDefault()
    setEditing(false)
    // Optionally, save changes to backend here
  }

  const handlePicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePic(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="profile-container">
      <img src={profilePic} alt="Profile" className="profile-pic" />
      <h2 className="profile-title">User Profile</h2>
      {editing ? (
        <form onSubmit={handleSave} className="profile-edit-form">
          <div className="profile-info">
            <strong>Name:</strong>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="profile-input"
            />
          </div>
          <div className="profile-info">
            <strong>Email:</strong>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="profile-input"
            />
          </div>
          <div className="profile-info">
            <strong>Phone:</strong>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="profile-input"
            />
          </div>
          <div className="profile-info">
            <strong>Profile Picture:</strong>
            <input
              type="file"
              accept="image/*"
              onChange={handlePicChange}
              className="profile-input"
            />
          </div>
          <button type="submit" className="profile-edit-btn">
            Save
          </button>
        </form>
      ) : (
        <>
          <div className="profile-info">
            <strong>Name:</strong> {name}
          </div>
          <div className="profile-info">
            <strong>Email:</strong> {email}
          </div>
          <div className="profile-info">
            <strong>Phone:</strong> {phone}
          </div>
          <button className="profile-edit-btn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </>
      )}
    </div>
  )
}

export default Profile
