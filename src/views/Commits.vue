<template>
    <div>
         <h2>Commits</h2>

        <div v-if="loading">Loading...</div>
        <div v-else>
            <div class="content">
                <div v-if="commits.length === 0">
                    No imported repositories
                </div>
                <div v-else>
                    <button v-if="selectedCommits.length" @click="removeCommits" class="button alert">Remove changed commits</button>
                    <Commit v-for="(commit) in commits" :key="commit.id" :commit="commit" @stateChanged="toggleCommit" />
                </div>
            </div>

            <Pagination v-if="total > 20" :active="currentPage" :total="total" @pageChanged="pageChanged" />

            <router-link :to="{name: 'Home'}" class="button">Home</router-link>
        </div>

    </div>
</template>

<script>
    import Commit from '@/components/Commit'
    import Pagination from '@/components/Pagination'

    export default {
        data: () => ({
            repo_id: null,
            commits: [],
            total: null,
            loading: false,
            currentPage: 1,
            selectedCommits: []
        }),
        components: {
            Commit,
            Pagination
        },
        created() {
            this.repo_id = this.$route.params.repo_id;

            this.loadCommits();
        },
        methods: {
            loadCommits() {
                this.loading = true;

                this.axios(`${this.$root.apiUrl}/projects/${this.repo_id}/commits?page=${this.currentPage}`)
                    .then(res => {
                        this.total = res.data.data.total;
                        this.commits = res.data.data.commits;
                    })
                    .catch(() => {})
                    .then(() => {
                        this.loading = false;
                    });
            },
            pageChanged(id) {
                this.currentPage = id;
                this.loadCommits();
            },
            toggleCommit(id) {


                const index = this.selectedCommits.indexOf(id);

                if (index > -1) {
                    this.selectedCommits.splice(index, 1);
                } else {
                    this.selectedCommits.push(id);
                }
            },
            removeCommits() {
                if (!confirm('Are you sure?')) {
                    return false;
                }

                this.axios.delete(`${this.$root.apiUrl}/projects/${this.repo_id}/commits`, {data: {ids: this.selectedCommits}})
                    .then(() => {

                        this.selectedCommits.forEach(id => {
                            let index = this.commits.findIndex(c => c.id === id);

                            if (index > -1) {
                                this.commits.splice(index, 1);
                            }
                        });

                        this.selectedCommits = [];

                        this.pageChanged(1);
                    })
                    .catch(() => {});
            }
        }
    }
</script>

<style scoped>
    .content {
        margin-bottom: 20px;
    }

    .button {
        margin-top: 16px;
    }
</style>