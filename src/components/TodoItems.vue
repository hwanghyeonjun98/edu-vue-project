<template>
	<div class="card mb-2" v-for="(todo, idx) in todos" :key="todo.id">
		<div class="card-body p-2 d-flex justify-content-between align-items-center" @click="moveToPage(todo.id)">
			<div class="form-check">
				<input type="checkbox" class="form-check-input" :id="'todo_'+todo.id" :checked="todo.completed" :name="'todo_'+todo.id" @change="toggleTodo(idx, $event)" @click.stop />
				<!-- <label :for="'todo_'+todo.id" :style="todo.completed ? todoSyle : {}" class="form-check-label">{{ todo.subject }}</label> -->
				<label class="form-check-label" :class="{todo: todo.completed}" :for="'todo_'+todo.id" @click.stop>{{ todo.subject }}</label>
			</div>

			<button type="button" class="btn btn-danger btn-sm" @click.stop="openModal(todo.id)">Delete</button>
		</div>
	</div>
	<teleport to="#modal">
		<Modal v-if="isShowModal" @close="closeModal" @delete="deleteTodo">
		</Modal>
	</teleport>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "@/components/DeleteModal.vue";

export default {
	components: {
		Modal,
	},
	props     : {
		todos: {
			type   : Array,
			require: true,
		},
	},
	emits     : [
		"toggle-todo",
		"delete-todo",
	],
	setup(props, {emit}) {
		const router = useRouter();
		const isShowModal = ref(false);
		const todoDeleteId = ref(null);
		const toggleTodo = (idx, event) => {
			emit("toggle-todo", idx, event.target.checked);
		};

		const openModal = (id) => {
			todoDeleteId.value = id;
			isShowModal.value = true;
		};

		const closeModal = () => {
			todoDeleteId.value = null;
			isShowModal.value = false;
		};

		const deleteTodo = () => {
			emit("delete-todo", todoDeleteId.value);
			closeModal();
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
			isShowModal,
			openModal,
			closeModal,
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