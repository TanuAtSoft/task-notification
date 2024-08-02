// // src/components/Notification.tsx
// import React, { useEffect, useState } from 'react';
// import { collection, addDoc, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
// import { db } from '../firebaseConfig';

// const Notification: React.FC = () => {
//   const [notifications, setNotifications] = useState<any[]>([]);

//   useEffect(() => {
//     const q = query(collection(db, "notifications"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setNotifications(data);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleAddNotification = async (message: string) => {
//     await addDoc(collection(db, "notifications"), {
//       message,
//       timestamp: new Date(),
//       read: false
//     });
//   };

//   const handleMarkAsRead = async (id: string) => {
//     const notificationRef = doc(db, "notifications", id);
//     await updateDoc(notificationRef, { read: true });
//   };

//   return (
//     <div>
//       <div>
//         <button onClick={() => handleAddNotification('Notification 1')}>Notification 1</button>
//         <button onClick={() => handleAddNotification('Notification 2')}>Notification 2</button>
//         <button onClick={() => handleAddNotification('Notification 3')}>Notification 3</button>
//       </div>
//       <ul>
//         {notifications.map(notif => (
//           <li
//             key={notif.id}
//             onClick={() => !notif.read && handleMarkAsRead(notif.id)}
//             style={{ cursor: 'pointer' }}
//           >
//             {notif.message} {notif.read ? '(Read)' : '(Unread)'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notification;

//Note: Here the above code is for setting up firebase storage system for the paid account features/free trail


import React, { useState } from 'react';
import './Notifications.css';
import {Notification,dummyNotifications} from "../dummyNotifications"

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true, open: false } : notification
    ));
  };

  const toggleDropdown = (id: number) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, open: !notification.open } : notification
    ));
  };

  return (
    <div className="container">
      <h2 className="heading">Notifications</h2>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li
            key={notification.id}
            className={`notification-item ${notification.read ? 'read' : ''}`}
            onClick={() => toggleDropdown(notification.id)}
          >
            <p className="notification-content">
              {notification.message.slice(0, 50)}{notification.message.length > 50 ? '...' : ''}
            </p>
            <div 
              className={`notification-dropdown ${notification.open ? 'open' : ''}`}
            >
              <p className="notification-content">{notification.message}</p>
              {!notification.read && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();  // Prevents dropdown from closing on button click
                    markAsRead(notification.id);
                  }}
                  className="mark-read-button"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
