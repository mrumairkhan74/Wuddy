import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../features/notificationSlice";

const Notification = () => {
  const { notifications, loading, error } = useSelector(
    (state) => state.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  if (loading) {
    return <p className="text-blue-500">Loading....</p>;
  }

  if (error) {
    return <p className="text-red-500">Error fetching notifications</p>;
  }

  if (!notifications || notifications.length === 0) {
    return <p className="text-gray-500">No notifications found</p>;
  }

  return (
    <>
      {notifications.map((notifi) => (
        <h1 key={notifi._id}>
          {notifi.sender.firstName} {notifi.sender.lastName}
        </h1>
      ))}
    </>
  );
};

export default Notification;
