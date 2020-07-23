<template>
    <div class="commit">
        <label class="commit__name">
            {{ commit.date }}
            <input type="checkbox" ref="checkbox" @change="toggleState">
        </label>
        <div class="commit__description">
            {{ commit.message }}
        </div>
        <a :href="commit.url" class="commit__url">{{ commit.url }}</a>
    </div>
</template>

<script>
    export default {
        props: ['commit'],
        methods: {
            toggleState() {
                this.$emit('stateChanged', this.commit.id);
            }
        }

    }
</script>

<style scoped>
    .commit {
        width: 100%;
        background: #fff;
        border: 1px solid #dedede;
        padding: 20px;
        margin: 10px 0;
        box-sizing: border-box;
        border-radius: 4px;
    }

    .commit__name {
        cursor: pointer;
        display: block;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .commit__description {
        margin: 8px 0;
    }

    .commit__url {
        width: 100%;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: none;
        color: #0569b6;
    }


</style>