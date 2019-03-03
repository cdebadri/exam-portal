<template>
    <div>
        <v-form ref="regform" lazy validation v-model="valid">
            <div class="text-xs-center"><h6 class="title">Registration</h6></div>
            <v-text-field label="Name" required v-model="name">
            </v-text-field>
            <v-text-field type="email" label="Email" required v-model="email" :rules="emailRules">
            </v-text-field>
            <v-text-field label="User Name" required v-model="username" :rules="usernameRules">
            </v-text-field>
            <v-text-field type="password" label="Password" required v-model="password">
            </v-text-field>
            <!--<v-text-field type="password" label="Confirm Password" required>
            </v-text-field>-->
            <v-btn round dark class="move-right" color="purple" @click="submitForm">Register</v-btn>
        </v-form>
        <v-dialog v-model="dialog" persistent width="400">
            <v-card>
                <v-card-title primary-title>
                    <div><h3 class="headline purple--text">Attention!</h3></div>
                </v-card-title>
                <v-card-text>
                    <div v-if="info == 1" class="text-xs-center"><ProgressCircle /></div>
                    <div v-else class="text-xs-center">{{ message }}</div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round dark color="purple" @click="gotoLogin" :disabled="action">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import ProgressCircle from './ProgressCircle.vue'
export default {
    name: 'RegForm',
    components: {
        ProgressCircle
    },
    data() {
        return {
            valid: true,
            name: '',
            email: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            username: '',
            usernameRules: [
                v => !!v || 'User Name Required'
            ],
            password: '',
            dialog: false,
            info: 1, //1: progress, 2: message
            action: false,
            message: '',
            regSuccess: false
        }
    },
    methods: {
        submitForm: function() {
            this.dialog = true
            this.info = 1
            this.action = true
            axios.get('https://www.campuskarma.in/services/api/rest/json/?method=exam.user_register', {
                params: {
                    name: this.name,
                    email: this.email,
                    username: this.username,
                    password: this.password
                }
            }).then((response) => {
                this.action = false
                this.info = 2
                this.message = response.data.result.message
                if (response.data.result.status) {
                    this.$refs.regform.reset()
                    this.regSuccess = true
                }
            }).catch((err) => {
                console.warn(err)
            })
        },
        // verify_email: function(email) {
        //     axios.get('https://www.campuskarma.in/services/api/rest/json/?method=exam.check_email', {
        //         params: {
        //             email: email
        //         }
        //     }).then((response) => {
        //         if (response.data.result.status)
        //             return false
        //     })
        //     return true
        // },
        // verify_username: function(username) {
        //     axios.get('https://www.campuskarma.in/services/api/rest/json/?method=exam.check_username', {
        //         params: {
        //             username: username
        //         }
        //     }).then((response) => {
        //         if (response.data.result.status)
        //             return false
        //     })
        //     return true
        // },
        gotoLogin: function() {
            if(this.regSuccess)
                this.$emit('change')
            this.dialog = false
        }
    },    
}
</script>
