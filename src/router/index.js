import { createRouter, createWebHistory } from "vue-router";
import Home from "../pagas/index.vue";
import Todos from "../pagas/todos/index.vue";
import Todo from "../pagas/todos/_id.vue";
import TodoCreate from "../pagas/todos/create/index.vue";

const router = createRouter({
	history: createWebHistory(),
	routes : [
		{
			path     : "/",
			name     : "Home",
			component: Home,
		},
		{
			path     : "/todos",
			name     : "Todos",
			component: Todos,
		},
		{
			path     : "/todos/create",
			name     : "TodoCreate",
			component: TodoCreate,
		},
		{
			path     : "/todos/:id",
			name     : "Todo",
			component: Todo,
		},
	],
});

// 1. /home 2. /todos 3. /todos/create 4. /todos/:id
export default router;