<template>
    <v-container fluid ma-0 pa-0>
        <v-toolbar dark color="purple">
            <v-toolbar-title>Exam Portal</v-toolbar-title>
            <v-spacer></v-spacer>
            <div></div>
        </v-toolbar>
        <v-layout wrap>
            <v-flex md8 lg8 ml-3 py-5>
                <Questions />
            </v-flex>
            <v-spacer />
            <v-flex md3 lg3 mr-3 py-5>
                <Palette :numberOfQuestions="3" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Palette from '../components/Palette.vue'
import Questions from '../components/Questions.vue'
export default {
    name: 'ExamPage',
    components: {
        Questions,
        Palette
    }
}
</script>

