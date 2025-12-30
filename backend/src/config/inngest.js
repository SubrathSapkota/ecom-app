import { Inngest } from 'inngest';
import { connectDB } from './db.js';
import User from '../models/user.modal.js';

export const inngest = new Inngest({
  id: 'ecom-app'
});

const syncUser = inngest.createFunction(
  { id: 'sync-user' },
  { event: 'clerk/user.created' },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, image_url, first_name, last_name } = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
      name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
      addresses: [],
      wishlist: []
    };

    await User.create(newUser);
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: 'delete-user-from-db' },
  { event: 'clerk/user.deleted' },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
  }
);

export const functions = [syncUser, deleteUserFromDB];
