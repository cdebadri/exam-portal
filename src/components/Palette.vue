<template>
    <v-card raised>
        <v-card-text>
            <div>
                <v-chip v-for="question in numberOfQuestions"
                        :key="question" color="red" text-color="white"
                        :selected="selectChip(question)"
                        @click="gotoQuestion(question)"
                >
                    <h3 class="subheading"><strong>{{ question }}</strong></h3>
                </v-chip>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import { EventBus } from '../event-bus.js'
export default {
    name: 'Palette',
    props: {
        numberOfQuestions: Number
    },
    data() {
        return {
            questionNumber: 1
        }
    },
    methods: {
        gotoQuestion: function(question) {
            EventBus.$emit('goto-question', question - 1)
        },
        selectQuestion: function(question) {
            this.questionNumber = question
        },
        selectChip: function(question) {
            if (question == this.questionNumber)
                return true
            return false
        }
    },
    mounted() {
        EventBus.$on('select-question', (question) => {
            this.selectQuestion(question)
        })
    }
}
</script>