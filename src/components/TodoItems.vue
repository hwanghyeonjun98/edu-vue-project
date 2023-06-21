<template>
	<div class="card mb-2" v-for="(todo, idx) in todos" :key="todo.id">
		<div class="card-body p-2 d-flex justify-content-between align-items-center" @click="moveToPage(todo.id)">
			<div class="form-check">
				<input type="checkbox" class="form-check-input" :id="'todo_'+todo.id" :checked="todo.completed" :name="'todo_'+todo.id" @change="toggleTodo(idx, $event)" @click.stop />
				<!-- <label :for="'todo_'+todo.id" :style="todo.completed ? todoSyle : {}" class="form-check-label">{{ todo.subject }}</label> -->
				<label class="form-check-label" :class="{todo: todo.completed}" :for="'todo_'+todo.id" @click.stop>{{ todo.subject }}</label>
			</div>

			<button type="button" class="btn btn-danger btn-sm" @click.stop="deleteTodo(idx)">Delete</button>
		</div>
	</div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
	props: {
		todos: {
			type   : Array,
			require: true,
		},
	},
	emits: [
		"toggle-todo",
		"delete-todo",
	],
	setup(props, {emit}) {
		const router = useRouter();
		const toggleTodo = (idx, event) => {
			emit("toggle-todo", idx, event.target.checked);
		};

		const deleteTodo = (idx) => {
			emit("delete-todo", idx);
		};

		const moveToPage = (todoId) => {
			// router.push(`/todos/${todoId}`);
			router.push({
				name  : "Todo",
				params: {
					id: todoId,
				},
			});
		};

		return {
			toggleTodo,
			deleteTodo,
			moveToPage,
		};
	},
};
</script>

<style>
.todo {
	color: gray;
	text-decoration: line-through;
}

.card-body {
	cursor: pointer;
}
</style>