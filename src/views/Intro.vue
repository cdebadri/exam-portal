<template>
    <v-container>
        <v-toolbar dark color="purple">
            <v-toolbar-title>Exam Portal</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat v-scroll-to="'#login'">Home</v-btn>
        </v-toolbar>
        <Login id="login"></Login>
    </v-container>
</template>

<script>
import Login from '../components/Login.vue'
export default {
    name: 'Intro',
    components: {
        Login
    }
}
</script>