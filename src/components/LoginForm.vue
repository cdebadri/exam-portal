<template>
    <div>
        <v-form ref="loginform" lazy validation>
            <div class="text-xs-center"><h6 class="title">Log In</h6></div>
            <v-text-field label="User Name" required v-model="username">
            </v-text-field>
            <v-text-field type="password" label="Password" required v-model="password">
            </v-text-field>
            <div class="text-xs-right">
                <v-btn flat class="caption" @click="dialog = true; info = 3; action = false">Forgot password?</v-btn>
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
                    <div><h3 class="headline purple--text">Attention!</h3></div>
                </v-card-title>
                <v-card-text>
                    <div v-if="info == 1" class="text-xs-center"><ProgressCircle /></div>
                    <div v-else-if="info == 2">{{ message }}</div>
                    <div v-else>
                        <v-form ref="forgotPasswordForm">
                            <v-text-field label="User Name" required v-model="forgotPasswordName">
                            </v-text-field>
                        </v-form>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn round dark color="purple" @click="dialog = false" :disabled="action">OK</v-btn>
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
            info: 1, //1: progress, 2: message, 3: forgot-password
            dialog: false,
            forgotPasswordDialog: false,
            forgotPasswordName: '',
            action: false
        }
    },
    methods: {
        login: function() {
            this.dialog = true
            this.info = 1
            this.action = true
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
                    this.info = 2
                    this.action = false
                    this.message = response.data.result.message
                }
            }).catch((err) => {
                console.warn(err)
            })
        },
        forgotPassword: function() {
            this.info = 1
            this.action = true
            axios.get('https://www.campuskarma.in/services/api/rest/json/?method=exam.request_password', {
                params: {
                    username: this.forgotPasswordName
                }
            }).then((response) => {
                this.info = 2
                this.action = false
                this.message = response.data.result.message
            }).catch((err) => {
                console.warn(err)
            })
        }
    } 
}
</script>