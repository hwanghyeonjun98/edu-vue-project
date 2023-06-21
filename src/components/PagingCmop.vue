<template>
	<div class="d-flex justify-content-center" v-if="todos.length">
		<nav aria-label="Page navigation example">
			<ul class="pagination">
				<li class="page-item" v-if="currentPage !== 1" @click="getTodos(currentPage - 1)">
					<a class="page-link" href="#">
						&lt;
					</a>
				</li>
				<li class="page-item" v-for="page in numberOfPage" :key="page" :class="currentPage === page ? 'active' : ''">
					<a class="page-link" href="#" @click="getTodos(page);">{{ page }}</a>
				</li>
				<li class="page-item" v-if="currentPage !== numberOfPage">
					<a class="page-link" href="#" @click="getTodos(currentPage + 1)">
						&gt;</a>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>

export default {
	emits: [
		"get-todos",
	],
	props: [
		"numberOfPage",
		"currentPage",
		"todos",
	],
	setup(props, {emit}) {
		const getTodos = (page) => {
			emit("get-todos", page);
		};

		return {
			getTodos,
		};
	},
};
</script>

<style>

</style>