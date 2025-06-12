import React, { useState, useEffect } from 'react'
import defaultProfilePic from '../../public/images/default-profile.jpg'
import './profile.css'
import Client from '../services/api' 

const BACKEND_URL = "http://localhost:3001"

const Profile = ({ user, setUser }) => {
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePic, setProfilePic] = useState(defaultProfilePic)
  const [localUser, setLocalUser] = useState(user || {})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setLocalUser(user)
      setFirstName(user.firstName || '')
      setLastName(user.lastName || '')
      setProfilePic(user.img || defaultProfilePic)
    }
  }, [user])

  const handleEdit = () => {
    setEditing(true)
    setError('')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      if (
        profilePic &&
        profilePic !== defaultProfilePic &&
        profilePic instanceof File
      ) {
        formData.append('img', profilePic)
      }
      const res = await Client.put(`/auth/update/${user.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setLocalUser(res.data)
      if (setUser) setUser(res.data)
      setEditing(false)
    } catch (err) {
      setError('Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  const handlePicChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePic(file)
    }
  }

  if (!user) {
    return (
      <div className="profile-container">
        Please sign in to view your profile.
      </div>
    )
  }

  return (
    <div className="profile-container">
      <img
        src={
          editing
            ? profilePic instanceof File
              ? URL.createObjectURL(profilePic)
              : profilePic
            : localUser.img
            ? `${BACKEND_URL}/${localUser.img}`
            : defaultProfilePic
        }
        alt="Profile"
        className="profile-pic"
      />
      {editing ? (
        <form onSubmit={handleSave} className="profile-edit-form">
          <div className="profile-info">
            <strong>First Name:</strong>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="profile-input"
              required
            />
          </div>
          <div className="profile-info">
            <strong>Last Name:</strong>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="profile-input"
              required
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
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" className="profile-edit-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      ) : (
        <>
          <h2>
            {localUser.firstName} {localUser.lastName}
          </h2>
          <div className="profile-info">
            <strong>Username:</strong> {localUser.username}
          </div>
          <div className="profile-info">
            <strong>Email:</strong> {localUser.email}
          </div>
          <button className="profile-edit-btn" onClick={handleEdit}>
            Edit Profile
          </button>
        </>
      )}
    </div>
  )
}

export default Profile
