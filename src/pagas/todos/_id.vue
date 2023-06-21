<template>
	<h1>Todo Page</h1>
	<div v-if="loading">
		loading...
	</div>
	<form v-else>
		<div class="row">
			<div class="col-6">
				<div class="form-group">
					<label for="">Todo Subject</label>
					<input type="text" id="" class="form-control" name="" v-model="todo">
				</div>
			</div>
			<div class="col-6">
				<div class="form-group">
					<label for="">Completed</label>
					<div>
						<button type="button">Completed</button>
					</div>
				</div>
			</div>
		</div>

		<button type="button" class="btn btn-primary">Save</button>
	</form>
</template>

<script>
import { useRoute } from "vue-router";
import axios from "axios";
import { ref } from "vue";

export default {
	setup() {
		const route = useRoute();
		const todo = ref(null);
		const loading = ref(true);

		const getTodo = async () => {
			const res = await axios.get(`http://localhost:3001/todos/${parseInt(route.params.id)}`);
			todo.value = res.data.subject;
			loading.value = false;
		};

		getTodo();

		return {
			todo,
			loading,
		};
	},
};
</script>

<style scoped>

</style>