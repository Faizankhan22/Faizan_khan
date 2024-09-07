<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- Messages Display -->
        <v-list  class="bg-success rounded-3 list">
          <v-list-item  
            v-for="(message, index) in messages"
            :key="index" 
          >
            <v-list-item-content>
              <v-list-item-title class="bg-blue rounded w-50 pa-5" >{{ message.text }}</v-list-item-title>
            <v-list-item-subtitle >{{ formatTime(message.timestamp) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- Message Input -->
        <v-form @submit.prevent="sendMessage"  class="" >
          <v-textarea
            v-model="newMessage"
            label="Type your message"
            class="bg-black"
            rows="3"
            outlined
            required
          ></v-textarea>
          <v-btn :loading="loading" :color="loading ? 'yellow' : 'black'" type="submit">
            <span v-if="!loading">Send</span>
            <v-progress-circular
              v-else
              indeterminate
              color="blue"
              size="70"
            ></v-progress-circular>
          </v-btn>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { database, ref as dbRef, push, onChildAdded, auth } from '../JS/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { format } from 'date-fns'; // Import the format function from date-fns

const newMessage = ref('');
const messages = ref([]);
const loading = ref(false);
const user = ref(null); // Store the authenticated user

// Check if a user is authenticated
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user.value = currentUser;
    console.log('User logged in:', currentUser);
  } else {
    console.log('No user is logged in');
    // Redirect to login page or show an alert
  }
});

// Send a new message
const sendMessage = async () => {
  if (!user.value) {
    alert('You must be logged in to send a message.');
    return;
  }

  loading.value = true;

  const message = {
    text: newMessage.value,
    timestamp: new Date().toISOString(),
    userId: user.value.uid,
  };

  try {
    await push(dbRef(database, 'messages'), message);
    newMessage.value = '';
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Failed to send the message. Please try again.');
  } finally {
    loading.value = false;
  }
};

// Fetch messages in real-time
onMounted(() => {
  const messagesRef = dbRef(database, 'messages');
  onChildAdded(messagesRef, (snapshot) => {
    messages.value.push(snapshot.val());
  });
});

// Function to format the timestamp
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return format(date, 'hh:mm a'); // Formats the time as "HH:MM AM/PM"
};

</script>

<style scoped>
/* Optional: Add styles for the chat interface */
.v-textarea {
  margin-bottom: 16px;
}

.list{

  /* overflow: auto; */
  /* height: 300px; */
}
</style>
