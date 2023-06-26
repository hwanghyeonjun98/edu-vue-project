export default {
	namespaced : true,
	state      : {
		toasts : [],
		// toastMessage   : "",
		// toastAlertType : "",
		// isShowToast    : false,
	},
	mutations  : {
		// UPDATE_TOAST_MESSAGE(state, payload) {
		// 	state.toastMessage = payload;
		// },
		// UPDATE_TOAST_ALERTYPE(state, payload) {
		// 	state.toastAlertType = payload;
		// },
		// UPDATE_TOAST_STATUS(state, payload) {
		// 	state.isShowToast = payload;
		// },
		ADD_TOAST(state, payload) {
			state.toasts.push(payload);
		},
		REMOVE_TOAST(state) {
			state.toasts.shift();
		},
	},
	actions    : {
		showToast({commit}, payload) {
			// message, type = "success"
			// commit("UPDATE_TOAST_MESSAGE", message);
			// commit("UPDATE_TOAST_ALERTYPE", type);
			// commit("UPDATE_TOAST_STATUS", true);
			commit("ADD_TOAST", {
				id      : Date.now(),
				message : payload.message,
				type    : payload.type,
			});

			setTimeout(() => {
				commit("REMOVE_TOAST");
			}, 5000);
		},
	},
	getters    : {
		toastMessageWithSmaile(state) {
			return state.toastMessage + " 😀";
		},
	},
};