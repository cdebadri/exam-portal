<template>
    <v-form ref="loginform" lazy validation>
        <div class="text-xs-center"><h6 class="title">Log In</h6></div>
        <v-text-field label="User Name" required>
        </v-text-field>
        <v-text-field type="password" label="Password" required>
        </v-text-field>
        <div class="text-xs-right">
            <v-btn flat class="caption">Forgot password?</v-btn>
        </div>
        <div>
            <!--<v-checkbox class="move-left" color="white" :label="`Remember me`">
            </v-checkbox>-->
            <v-btn round dark class="move-right" color="purple" to="/exam">Log in</v-btn>
        </div>
    </v-form>
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
export default {
    name: 'LoginForm',
}
</script>