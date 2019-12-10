<template>
    <div id="app">
        <My></My>
    </div>
</template>

<script>
    import My from "./components/My";

    export default {
        name: 'app',
        components: {
            My,
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
