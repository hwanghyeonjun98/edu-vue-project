import { reactive, toRefs } from "vue";

export const useCount = () => {

	return toRefs(reactive({
		count: 0,
	}));
};