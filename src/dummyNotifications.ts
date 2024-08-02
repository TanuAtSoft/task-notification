export interface Notification {
    id: number;
    message: string;
    read: boolean;
    open?: boolean;  // Optional property for dropdown state
  }
  
  export const dummyNotifications: Notification[] = [
    { id: 1, message: "Your order #12345 has been shipped! Your package will arrive in 3-5 business days. Track your shipment using the tracking number provided in your order confirmation email.", read: false },
    { id: 2, message: "Reminder: Your appointment with Dr. Smith is tomorrow at 10:00 AM. Please arrive 15 minutes early to complete any necessary paperwork. If you need to reschedule, contact the office at least 24 hours in advance.", read: false },
    { id: 3, message: "New comment on your post: 'Great article! I found the information very helpful, especially the tips on productivity.'", read: true },
    { id: 4, message: "You have a new follower: John Doe. John is interested in your recent posts about travel and technology.", read: false },
    { id: 5, message: "Weekly summary report is now available. Check your dashboard for detailed insights and analytics on your recent activities and performance.", read: true },
  ];
  