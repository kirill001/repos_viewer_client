<template>
    <div class="repo">
        <div class="repo__name">
            {{ repo.author }}/{{ repo.name }}
        </div>
        <div class="repo__stars">
            {{ repo.stars }} stars
        </div>
        <div class="repo__description">
            {{ repo.description }}
        </div>
        <div class="repo__actions">
            <router-link class="button" :to="{name: 'Commits', params: {repo_id: repo.id}}">View commits</router-link>
            <button class="button alert" @click="deleteRepo(repo.id)">Delete</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['repo'],
        methods: {
            deleteRepo(id) {
                if (!confirm('Are you sure?')) {
                    return false;
                }

                this.axios.post(`${this.$root.apiUrl}/repos/${id}/remove`)
                    .then(() => {
                        this.$emit('removed', id);
                    })
                    .catch(() => {});
            }
        }
    }
</script>

<style scoped>
    .repo {
        width: 100%;
        background: #fff;
        border: 1px solid #dedede;
        padding: 20px;
        margin: 10px 0;
        box-sizing: border-box;
        border-radius: 4px;
    }

    .repo__name {
        display: block;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .repo__stars {
        display: block;
        font-weight: bold;
        font-size: 12px;
    }

    .repo__description {
        margin: 8px 0;
    }


</style>