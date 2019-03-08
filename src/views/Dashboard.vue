<template>
    <v-container fluid ma-0 pa-0>
        <v-toolbar dark color="purple">
            <v-toolbar-title>Exam Portal</v-toolbar-title>
            <v-spacer></v-spacer>
            <div class="body-2" v-if="login">Logged in as {{ username }}&nbsp;</div>
            <v-btn flat>Logout</v-btn>
        </v-toolbar>
        <div class="central">
            <div v-if="remove"><ProgressCircle /></div>
        </div>
    </v-container>
</template>

<script>
import axios from 'axios'
import ProgressCircle from '../components/ProgressCircle.vue'
export default {
    name: 'Dashboard',
    components: {
        ProgressCircle
    },
    data() {
        return {
            login: false,
            username: '',
            remove: true
        }
    },
    computed: {
        checkLogin: function() {
            if (this.$session.exists()) {
                axios.post('https://www.campuskarma.in/services/api/rest/json/?method=exam.user_token_check', null, {
                    params: {
                        token: this.$session.get('auth_token'),
                        username: this.$session.get('username')
                    }
                }).then((response) => {
                    if (response.data.result.status) {
                        this.username = this.$session.get('username')
                        this.login = true
                    } else {
                        this.login = false
                    }
                }).catch((err) => {
                    console.warn(err)
                })
            } else {
                this.login = false
            }
        }
    },
    created() {
        this.checkLogin()
    },
}
</script>