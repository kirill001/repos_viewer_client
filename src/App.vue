<template>
    <div id="app" class="container">
        <router-view/>
    </div>
</template>

<style src="@/assets/styles.css"></style>

<style scoped>
    .container {
        background: #fbfbfb;
        width: 800px;
        max-width: calc(100% - 40px);
        margin: 20px auto;
        border: 1px solid #dedede;
        padding: 20px;
        box-sizing: border-box;
    }
</style>
