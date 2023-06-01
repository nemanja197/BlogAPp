import { initializeApp } from "firebase/app";

export const environment={

  firebaseConfig:{
      apiKey: "AIzaSyCpBoiROz3fXvDI2JHSzJDrAE9KcaleGAU",
      authDomain: "ang-blog-edc70.firebaseapp.com",
      projectId: "ang-blog-edc70",
      storageBucket: "ang-blog-edc70.appspot.com",
      messagingSenderId: "880407046594",
      appId: "1:880407046594:web:cda2a9e12da388c5c70e5b"
  },
  production:false
};
export const firebase= initializeApp(environment.firebaseConfig);