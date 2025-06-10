import React, { useEffect, useState } from "react";
import axios from "axios";

const CarReviews = ({ carId, currentUserId, token }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);