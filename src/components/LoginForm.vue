<template>
    <div>
        <v-form ref="loginform" lazy validation>
            <div class="text-xs-center"><h6 class="title">Log In</h6></div>
            <v-text-field label="User Name" required v-model="username">
            </v-text-field>
            <v-text-field type="password" label="Password" required v-model="password">
            </v-text-field>
            <div class="text-xs-right">
                <v-btn flat class="caption" @click="forgotPasswordDialog = true">Forgot password?</v-btn>
            </div>
            <div>
                <!--<v-checkbox class="move-left" color="white" :label="`Remember me`">
                </v-checkbox>-->
                <v-btn round dark class="move-right" color="purple" @click="login">Log in</v-btn>
            </div>
        </v-form>
        <v-dialog v-model="dialog" persistent width="400">
            <v-card>
                <v-card-title primary-title>
                    <div><h3 class="headline red--text">Attention!</h3></div>
                </v-card-title>
                <v-card-text>
                    <div v-if=""><ProgressCircle /></div>
                    <div v-else>{{ message }}</div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round dark color="purple" @click="dialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="forgotPasswordDialog" persistent width="400">
            <v-card>
                <v-card-title primary-title>
                    <div><h3 class="headline red--text">Forgot Password</h3></div>
                </v-card-title>
                <v-card-text>
                    <v-form ref="forgotPasswordForm">
                        <v-text-field label="User Name" required v-model="forgotPasswordName">
                        </v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round dark color="purple" @click="forgotPassword">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style>
    .move-right {
        float: right;
    }

    .move-left {
        float: left;
    }
</style>

<script>
import axios from 'axios'
import ProgressCircle from './ProgressCircle.vue'
export default {
    name: 'LoginForm',
    components: {
        ProgressCircle
    },
    data() {
        return {
            username: '',
            password: '',
            message: '',
            dialog: false,
            forgotPasswordDialog: false,
            forgotPasswordName: ''
        }
    },
    methods: {
        login: function() {
            axios.post('https://www.campuskarma.in/services/api/rest/json/?method=exam.gettoken', null, {
                params: {
                    username: this.username,
                    password: this.password
                }
            }).then((response) => {
                if (response.data.result.status) {
                    this.$session.start()
                    this.$session.set('username', this.username)
                    this.$session.set('auth_token', response.data.result.auth_token)
                    this.$refs.loginform.reset()
                    console.log('session started')
                    this.$router.push('/exam')           
                } else {
                    this.message = response.data.result.message
                    this.dialog = true
                }
            }).catch((err) => {
                console.warn(err)
            })
        },
        forgotPassword: function() {
            this.forgotPasswordDialog = false
            axios.get('https://www.campuskarma.in/services/api/rest/json/?method=exam.request_password', {
                params: {
                    username: this.forgotPasswordName
                }
            }).then((response) => {
                this.message = response.data.result.message
                this.dialog = true
            }).catch((err) => {
                console.warn(err)
            })
        }
    } 
}
</script>