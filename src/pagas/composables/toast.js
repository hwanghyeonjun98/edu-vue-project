import { computed } from "vue";
import { useStore } from "vuex";

export const useToast = () => {
	const store = useStore();
	const toasts = computed(() => store.state.toast.toasts);
	// const toastMessage = computed(() => store.getters["toast/toastMessageWithSmaile"]);
	// const toastAlertType = computed(() => store.state.toast.toastAlertType);
	// const isShowToast = computed(() => store.state.toast.isShowToast);

	const showToast = (message, type = "success") => {
		store.dispatch("toast/showToast", {message, type});
	};

	return {
		// toastMessage,
		// toastAlertType,
		// isShowToast,
		toasts,
		showToast,
	};
};
