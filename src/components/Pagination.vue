<template>
    <div>
        <div v-for="(page, i) in Math.ceil(total/20)" :key="i" :class="{active: page === active}" class="page-button" @click="changePage(page)">
            {{ page }}
        </div>
    </div>
</template>

<script>
    export default {
        props: ['total', 'active'],
        methods: {
            changePage(page) {
                this.$emit('pageChanged', page);
            }
        }
    }
</script>

<style scoped>
    .page-button {
        display: inline-block;
        vertical-align: top;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #dedede;
        background: #fff;
        color: #333;
        font-size: 14px;
        cursor: pointer;
        transition: .3s;
        margin-right: -1px;
        margin-bottom: -1px;
    }

    .page-button:hover {
        background: #f1f1f1;
    }

    .page-button.active {
        background: #01a001;
        border-color: #01a001;
        color: #fff;
    }

    .page-button.active:hover {
        background: #01a001;
    }
</style>