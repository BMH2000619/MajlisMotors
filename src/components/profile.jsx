import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import defaultProfilePic from '../../public/images/dodge.jpg'
import './profile.css'

const Profile = ({ user }) => {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [profilePic, setProfilePic] = useState(
    user?.profileImage || defaultProfilePic
  )

  const handleEdit = () => {
    setName(user.name || '')
    setNickname(user.nickname || '')
    setEmail(user.email || '')
    setPhone(user.phone || '')
    setProfilePic(user.profileImage || defaultProfilePic)
    setEditing(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    // Here you would send updated data to backend if needed
    setEditing(false)
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

  if (!user) {
    return <div>Please sign in to view your profile.</div>
  }

  return (
    <div className="profile-container">
      <img
        src={editing ? profilePic : user.profileImage || defaultProfilePic}
        alt="Profile"
        className="profile-pic"
      />
      <h2>{user.name || user.username}</h2>
      <p>Email: {user.email}</p>

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
            <strong>Nickname:</strong>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
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
            <strong>Name:</strong> {user.name || ''}
          </div>
          <div className="profile-info">
            <strong>Nickname:</strong> {user.nickname || ''}
          </div>
          <div className="profile-info">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="profile-info">
            <strong>Phone:</strong> {user.phone || 'N/A'}
          </div>
          <button className="profile-edit-btn" onClick={handleEdit}>
            Edit Profile
          </button>
        </>
      )}

     
      {/* <nav className="navbar">
        <ul className="navbar-links">
          ...other links...
          <li>
            <Link to="/profile" className="navbar-link navbar-profile-link">
              <img
                src={user?.profileImage || '/images/dodge.jpg'}
                alt="Profile"
                className="navbar-profile-pic"
              />
             
             </Link> 
         </li>
         </ul>
       </nav> */}
    </div>
  )
}

export default Profile
