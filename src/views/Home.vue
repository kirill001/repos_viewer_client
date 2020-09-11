<template>
    <div>
         <h2>Imported repositories</h2>

        <div v-if="loading">Loading...</div>
        <div v-else>
            <div class="content">
                <div v-if="repositories.length === 0">
                    No imported repositories
                </div>
                <div v-else>
                    <Repo v-for="(repo, i) in repositories" :key="i" @removed="removeRepo" :repo="repo" />
                </div>
            </div>


            <router-link :to="{name: 'AddRepo'}" class="button success">Import new repository</router-link>
        </div>

    </div>
</template>

<script>
    import Repo from '@/components/Repo'

    export default {
        data: () => ({
            repositories: [],
            loading: false,
        }),
        components: {
            Repo
        },
        created() {
            this.loading = true;

            this.axios(`${this.$root.apiUrl}/projects`)
                .then(res => {
                    this.repositories = res.data;
                })
                .catch(() => {})
                .then(() => {
                    this.loading = false;
                })
        },
        methods: {
            removeRepo(id) {
                const index = this.repositories.findIndex(r => r.id === id);

                if (index > -1) {
                    this.repositories.splice(index, 1);
                }
            }
        }
    }
</script>

<style scoped>
    .content {
        margin-bottom: 20px;
    }
</style>