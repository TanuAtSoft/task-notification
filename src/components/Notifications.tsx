// src/components/Notification.tsx
import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [newNotification, setNewNotification] = useState('');

  useEffect(() => {
    const q = query(collection(db, "notifications"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
    });
    return () => unsubscribe();
  }, []);

  const handleAddNotification = async (message: string) => {
    await addDoc(collection(db, "notifications"), {
      message,
      timestamp: new Date(),
      read: false
    });
  };

  const handleMarkAsRead = async (id: string) => {
    const notificationRef = doc(db, "notifications", id);
    await updateDoc(notificationRef, { read: true });
  };

  return (
    <div>
      <div>
        <button onClick={() => handleAddNotification('Notification 1')}>Notification 1</button>
        <button onClick={() => handleAddNotification('Notification 2')}>Notification 2</button>
        <button onClick={() => handleAddNotification('Notification 3')}>Notification 3</button>
      </div>
      <ul>
        {notifications.map(notif => (
          <li key={notif.id} onClick={() => !notif.read && handleMarkAsRead(notif.id)}>
            {notif.message} {notif.read ? '(Read)' : '(Unread)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
