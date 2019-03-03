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
        <v-dialog v-model="dialog" persistent width="300">
            <v-card>
                <v-card-title primary-title>
                    <div><h3 class="headline red--text">Attention!</h3></div>
                </v-card-title>
                <v-card-text>{{ message }}</v-card-text>
                <v-card-actions>
                    <v-btn round dark color="purple" @click="gotoLogin">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'RegForm',
    data() {
        return {
            valid: false,
            name: '',
            email: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => this.verify_email(v) || 'Email already exists'
            ],
            username: '',
            usernameRules: [
                v => !!v || 'User Name taken',
                v => this.verify_username(v) || 'User Name taken'
            ],
            password: '',
            dialog: false,
            message: ''
        }
    },
    methods: {
        submitForm: function() {
            axios.get('https://www.campuskarma.in/services/api/rest/json/?method=exam.user_register', {
                params: {
                    name: this.name,
                    email: this.email,
                    username: this.username,
                    password: this.password
                }
            }).then((response) => {
                this.message = response.data.result.message
                this.dialog = response.data.result.status
                if (!this.dialog)
                    this.$refs.regform.reset()
            })
        },
        verify_email: function(email) {
            axios.get('https://www.campuskarma.in/services/api/rest/json/?method=exam.check_email', {
                params: {
                    email: email
                }
            }).then((response) => {
                if (response.data.result.status)
                    return true
            })
            return false
        },
        verify_username: function(username) {
            axios.get('https://www.campuskarma.in/services/api/rest/json/?method=exam.check_username', {
                params: {
                    username: username
                }
            }).then((response) => {
                if (response.data.result.status)
                    return true
            })
            return false
        },
        gotoLogin: function() {
            this.$emit('change')
        }
    },    
}
</script>
