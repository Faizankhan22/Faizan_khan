<template>
    <v-container class="d-flex align-center justify-center fill-height">
      <v-card class="elevation-12 login-card">
        <v-card-title class="justify-center">
          <span class="text-h5">Login</span>
        </v-card-title>
        
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              outlined
              color="primary"
              prepend-inner-icon="mdi-email"
            ></v-text-field>
  
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              outlined
              color="primary"
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
  
            <v-btn type="submit" color="primary" class="mt-4" block>Login</v-btn>
  
            <v-alert
              v-if="errorMessage"
              type="error"
              dismissible
              class="mt-4"
            >
              {{ errorMessage }}
            </v-alert>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
 
  import { useRouter } from 'vue-router';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth } from '../JS/firebase';
  
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      console.log('User signed in:', userCredential.user);
      router.push('/home'); // Redirect to home page after successful login
    } catch (error) {
      errorMessage.value = error.message;
      console.error('Login failed:', error);
    }
  };
  </script>
  
  <style scoped>
  .fill-height {
    height: 100vh;
  }
  
  .login-card {
    width: 100%;
    max-width: 400px;
    padding: 20px;
  }
  
  .v-text-field .v-input__control {
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  
  .v-btn {
    font-weight: bold;
    text-transform: uppercase;
  }
  
  .v-alert {
    font-size: 0.875rem;
  }
  </style>
  