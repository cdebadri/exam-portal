<template>
    <v-card v-model="questionNumber" raised>
        <v-card-title primary-title>
            <div><h3 class="headline">Question {{ questionNumber + 1 }}</h3></div>
        </v-card-title>
        <v-card-text class="body-2">
            <div>{{ questions[questionNumber] }}</div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn round dark color="red">clear</v-btn>
            <v-btn round dark color="green" @click="next">continue</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { EventBus } from '../event-bus.js'
export default {
    name: 'Questions',
    data() {
        return {
            questionNumber: 0,
            questions: [
                'Contents of Question 1',
                'Contents of Question 2',
                'Contents of Question 3'
            ]
        }
    },
    methods: {
        next: function() {
            const questionNumber = parseInt(this.questionNumber)
            this.questionNumber = (questionNumber < 2) ? (questionNumber + 1) : 0
            EventBus.$emit('select-question', this.questionNumber + 1)  
        },
        gotoQuestion: function(question) {
            this.questionNumber = question
        }
    },
    mounted() {
        EventBus.$on('goto-question', (question) => {
            this.gotoQuestion(question)
        })
    }
}
</script>