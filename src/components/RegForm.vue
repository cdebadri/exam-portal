<template>
    <v-form ref="regform" lazy validation>
        <div class="text-xs-center"><h6 class="title">Registration</h6></div>
        <v-text-field label="User Name" required>
        </v-text-field>
        <v-text-field type="email" label="Email" required>
        </v-text-field>
        <v-text-field type="password" label="Password" required>
        </v-text-field>
        <v-text-field type="password" label="Confirm Password" required>
        </v-text-field>
        <v-btn round dark class="move-right" color="purple" @click="submitForm">Register</v-btn>
    </v-form>
</template>

<script>
export default {
    name: 'RegForm',
    methods: {
        submitForm: function() {
            this.$emit('change')
        }
    },    
}
</script>
