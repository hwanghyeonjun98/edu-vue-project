<template>
	<div class="container">
		<h1>ToDo List</h1>
		<form action="#" class=" mb-4" @submit.prevent="onSubmit">
			<div class="d-flex">
				<div class="flex-grow-1 mr-2">
					<input id="name" v-model="todo" class="form-control" name="name" placeholder="Type new To-Do" type="text">
				</div>
				<div>
					<button class="btn btn-primary">Add</button>
				</div>
			</div>
			<div v-show="hasError" style="color: red">This field cannt not</div>
		</form>
		<div v-for="todo in todos" :key="todo.id" class="card mb-2">
			<div class="card-body p-2 d-flex justify-content-between align-items-center">
				<div class="form-check">
					<input :id="'todo_'+todo.id" v-model="todo.complated" :name="'todo_'+todo.id" class="form-check-input" type="checkbox" />
					<label :for="'todo_'+todo.id" :style="todo.complated ? todoSyle : {}" class="form-check-label">{{ todo.subject }}</label>
				</div>
				<button class="btn btn-danger btn-sm" type="button">Delete</button>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";

export default {
	setup() {
		let todo = ref("");
		const todos = ref([{
			id       : 1,
			subject  : "휴대폰 사기",
			complated: false,
		}, {
			id       : 2,
			subject  : "장보기",
			complated: false,
		}]);

		const hasError = ref(false);

		const todoSyle = {
			textDecoration: "line-through",
			color         : "lightgray",
		};

		const onSubmit = () => {
			if (todo.value !== "") {
				todos.value.push({
					id     : Date.now(),
					subject: todo.value,
				});

				todo.value = "";
				hasError.value = false;
			} else {
				hasError.value = true;
			}
		};

		return {
			todo,
			todos,
			onSubmit,
			hasError,
			todoSyle,
		};
	},
};
</script>

<style>
label,
input[type=radio],
input[type=checkbox] {
	cursor: pointer;
}
</style>