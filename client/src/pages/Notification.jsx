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
      <div className="flex justify-between items-center bg-[#206059] w-full p-4 mt-2">
        <h4 className="text-center text-2xl tracking-[3px]  font-[Poppins] text-white">
          Notification
        </h4>
      </div>
      <div className="container mx-auto">

        {notifications.map((notify) => (
          <div className="flex justify-between items-center gap-2 m-2 p-4 bg-gray-200 rounded-md">
            <div className="flex items-center justify-center gap-2">
              <img src={notify.sender?.profileImg?.url} alt="" className="w-15 h-15 rounded-full object-cover border border-[#206059] p-1" />
              <div className="flex flex-col items-start ">
                <h3 className="font-bold font-[Poppins]">{notify.sender?.firstName} {notify.sender?.lastName}</h3>
                <p className="text-gray-600">{notify.message}</p>
              </div>
            </div>
            <div className="">
              <p className="text-[10px]">
                {new Date(notify.createdAt).toDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notification;
