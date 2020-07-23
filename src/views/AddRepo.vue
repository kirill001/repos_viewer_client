<template>
    <div>
        <h2>New repository</h2>

        <div class="tip">Note that browser import will download no more than 300 commits. To download all commits, use CLI commands.</div>

        <form @submit.prevent="importRepo">
            <div class="content">
                <div class="form-block" :class="{required: requiredFields.includes('author')}">
                    <label class="form-label">Repository Author</label>
                    <input type="text" class="form-input" v-model="repo.author">
                </div>
                <div class="form-block" :class="{required: requiredFields.includes('name')}">
                    <label class="form-label">Repository name</label>
                    <input type="text" class="form-input" v-model="repo.name">
                </div>
            </div>

            <button type="submit" class="button success">{{ importing ? 'Importing...' : 'Import' }}</button>
            <router-link :to="{name: 'Home'}" class="button">Cancel</router-link>

            <div class="error" v-if="error">{{ error }}</div>
        </form>

    </div>
</template>

<script>

    export default {
        data: () => ({
            repo: {
                author: '',
                name: ''
            },
            requiredFields: [],
            error: false,
            importing: false
        }),
        methods: {
            importRepo() {
                if (this.importing) {
                    return false;
                }

                this.importing = true;
                this.requiredFields = [];
                this.error = false;

                if (!this.repo.author.trim()) {
                    this.requiredFields.push('author');
                }

                if (!this.repo.name.trim()) {
                    this.requiredFields.push('name');
                }

                if (this.requiredFields.length) {
                    return false;
                }

                this.axios.post(`${this.$root.apiUrl}/repos/add`, this.repo)
                    .then(res => {
                        if (res.data.status === 'error') {
                           this.error = res.data.message;
                        } else {
                            this.$router.push({name: 'Home'});
                        }
                    })
                    .catch(() => {
                        this.error = 'Unknown error';
                    })
                    .then(() => {
                        this.importing = false;
                    });
            }
        }
    }
</script>

<style scoped>
    .content {
        margin-bottom: 20px;
    }

    .form-block {
        margin-bottom: 8px;
        width: 320px;
        max-width: 100%;
    }

    .form-label {
        font-weight: bold;
        font-size: 14px;
        display: block;
        margin-bottom: 4px;
    }

    .form-block.required .form-input {
        border-color: #bf0404;
    }

    .form-input {
        outline: none;
        border: 1px solid #dedede;
        border-radius: 4px;
        padding: 0 8px;
        width: 100%;
        background: #fff;
        line-height: 32px;
        transition: .3s;
    }

    .form-input:focus {
        border-color: #72cbe8;
    }

    .error {
        color: #bf0404;
        font-size: 14px;
        margin-top: 8px;
    }

    .tip {
        font-style: italic;
        margin-bottom: 20px;
        background: #96f196;
        padding: 16px;
        border-radius: 4px;
    }
</style>