import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { API } from "../../config";
import Swal from "sweetalert2";
import Loading from "../../components/loader/Loading";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

// Fetching all bookings
const fetchBookings = async () => {
  const response = await fetch(`${API}/booking`);
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return response.json();
};

// Function to approve selected bookings
const approveBookings = async (selectedBookings) => {
  const response = await fetch(`${API}/bookings/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ booking_ids: selectedBookings }),
  });
  if (!response.ok) {
    throw new Error("Failed to approve bookings");
  }
  return response.json();
};

const Bookings = () => {
  const {
    data: bookings,
    error,
    isLoading,
    refetch, // Use refetch to manually fetch data
  } = useQuery("booking", fetchBookings);

  const queryClient = useQueryClient();

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  // Mutation to delete a booking
  const deleteBookingMutation = useMutation(
    (bookingId) => axios.delete(`${API}/booking/${bookingId}`),
    {
      onSuccess: () => {
        // Invalidate and refetch bookings after delete
        queryClient.invalidateQueries("booking");
      },
      onError: (error) => {
        Swal.fire(
          "Error",
          "Failed to delete booking: " + error.message,
          "error"
        );
      },
    }
  );

  const handleDelete = (bookingId) => {
    // Show confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, delete the booking
        deleteBookingMutation.mutate(bookingId);
        Swal.fire("Deleted!", "The booking has been deleted.", "success");
      }
    });
  };

  const [selectedBookings, setSelectedBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load selected bookings from localStorage when the component mounts
  useEffect(() => {
    const savedSelectedBookings = localStorage.getItem("selectedBookings");
    if (savedSelectedBookings) {
      setSelectedBookings(JSON.parse(savedSelectedBookings));
    }
  }, []);

  // Update localStorage whenever selectedBookings changes
  useEffect(() => {
    localStorage.setItem("selectedBookings", JSON.stringify(selectedBookings));
  }, [selectedBookings]);

  // Remove invalid selected bookings from localStorage
  useEffect(() => {
    if (bookings?.data) {
      const validBookings = bookings.data.map((booking) => booking.id);
      const updatedSelected = selectedBookings.filter((id) =>
        validBookings.includes(id)
      );

      // Update state and localStorage if some invalid IDs were found
      if (updatedSelected.length !== selectedBookings.length) {
        setSelectedBookings(updatedSelected);
        localStorage.setItem("selectedBookings", JSON.stringify(updatedSelected));
      }
    }
  }, [bookings, selectedBookings]);

  // Toggle selection for a booking
  const handleSelectBooking = (id) => {
    setSelectedBookings((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((bookingId) => bookingId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle approve selected bookings
  const handleApprove = () => {
    if (selectedBookings.length === 0) {
      Swal.fire(
        "No bookings selected",
        "Please select at least one booking.",
        "info"
      );
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve the selected bookings?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve them!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make API call to approve bookings
        approveBookings(selectedBookings)
          .then(() => {
            Swal.fire(
              "Approved!",
              "The bookings have been approved.",
              "success"
            );
            refetch(); // Refetch the bookings after approval
            setSelectedBookings([]); // Clear selected bookings
            localStorage.removeItem("selectedBookings"); // Clear from localStorage
          })
          .catch((error) => {
            Swal.fire("Error!", error.message, "error");
          });
      }
    });
  };

  const filteredBookings =
    bookings?.data?.filter((booking) => {
      const fullName =
        `${booking.first_name} ${booking.last_name}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    }) || []; // Fallback to an empty array if bookings is undefined

  // Sort bookings to show selected ones first
  const sortedBookings = filteredBookings.sort((a, b) => {
    const aSelected = selectedBookings.includes(a.id) ? -1 : 1;
    const bSelected = selectedBookings.includes(b.id) ? -1 : 1;
    return aSelected - bSelected;
  });

  if (isLoading) {
    return (
      <section className="content">
        <div className="row">
          <Loading />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div>
        <section className="content">
          <div className="row">Error: {error.message}</div>
        </section>
      </div>
    );
  }

  return (
    <>
      <section className="content">
        <div className="row">
          <div className="col-12">
            <div className="d-md-flex align-items-center justify-content-between mb-20"></div>
            <div className="box">
              <div className="box-body">
                <div className="d-md-flex align-items-center justify-content-between mb-20">
                  <Link className="btn btn-primary" to={"/add/booking"}>
                    ADD BOOKINGS
                  </Link>
                  <button className="btn btn-success" onClick={handleApprove}>
                    Approve Selected
                  </button>
                </div>

                {/* Search Input */}
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Patient Name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="bb-2">✅</th>
                        <th className="bb-2">Booking ID</th>
                        <th className="bb-2">Patient Name</th>
                        <th className="bb-2">Phone Number</th>
                        <th className="bb-2">Date</th>
                        <th className="bb-2">Category</th>
                        <th className="bb-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className={
                            selectedBookings.includes(booking.id)
                              ? "table-success bolden-font"
                              : ""
                          }
                        >
                          <td>
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id={`booking_checkbox_${booking.id}`} // unique id
                                onChange={() => handleSelectBooking(booking.id)}
                                checked={selectedBookings.includes(booking.id)}
                              />
                              <label
                                htmlFor={`booking_checkbox_${booking.id}`}
                              ></label>
                            </div>
                          </td>
                          <td>{booking.id}</td>
                          <td>{`${booking.first_name} ${booking.last_name}`}</td>
                          <td>
                            {booking.phone_number
                              ? booking.phone_number
                              : "N/A"}
                          </td>
                          <td>
                            {new Date(
                              booking.booking_date
                            ).toLocaleDateString()}
                          </td>
                          <td>{booking.category}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(booking.id)}
                              style={{
                                textTransform: "uppercase",
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bookings;
