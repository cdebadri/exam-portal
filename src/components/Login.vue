<template>
<v-container justify-center fluid class="central">
    <v-layout wrap>
        <v-flex xs12 sm12 md8 lg8>
            <div v-if="$mq === 'sm'">
                <!--<v-btn round color="purple" dark @click="changeForm">Register For Free</v-btn> -->
            </div>
            <div v-else>
                <div><h1 class="display-4">Exam Portal</h1></div>
                <div>
                    <v-btn round color="purple" dark @click="changeForm">Register</v-btn>
                </div>
            </div>
        </v-flex>
        <v-flex xs12 sm12 md4 lg4>
            <div v-if="registered">
                <LoginForm />
            </div>
            <div v-else>
                <RegForm @change="changeForm" />
            </div>
        </v-flex>
    </v-layout>
</v-container>
</template>

<style scoped>
    .central {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
</style>

<script>
import LoginForm from './LoginForm.vue'
import RegForm from './RegForm.vue'
export default {
    name: 'Login',
    components: {
        LoginForm,
        RegForm
    },
    data() {
        return {
            registered: true
        }
    },
    methods: {
        changeForm: function() {
            this.registered = !this.registered
        }
    },    
}
</script>