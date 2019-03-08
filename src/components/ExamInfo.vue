<template>
    <v-container justify-center fluid>
        <div class="display-1 purple--text">Campus Karma</div>
        <div class="subheading">in association with</div>
        <div class="display-1 purple--text">{{ university }}</div>
        <div class="subheading">Presents</div>
        <div class"display-1 purple--text">{{ title }}</div>
        <v-layout wrap>
            <v-flex xs12 sm12 md6 lg6>
                <div class="subheading">Duration: {{ duration }} mins.</div>
                <div class="subheading">Date: {{ exam_date }}</div>
                <div class="subheading"></div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    name: 'ExamInfo',
    data() {
        return {
            title: '',
            exam_date: '',
            university: '',
            duration: '',
            rules: ''
        }
    },
    methods: {
        examInfo: function() {
            axios.get('https://www.campuskarma.in/services/api/rest/json/?method=exam.dashboard', {
                params: {
                    auth_token: this.$session.get('auth_token'),
                    username: this.$session.get('username')
                }
            }).then((response) => {
                if (response.data.result.status) {
                    this.title = response.data.result.title,
                    this.exam_date = response.data.result.exam_date
                    this.university = response.data.result.university
                    this.rules = response.data.result.rules
                    this.duration = response.data.result.duration
                }
            })
        }
    },
    created() {
        
    },
}
</script>