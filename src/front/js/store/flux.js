const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			userId: localStorage.getItem("userId"),
			userToken: localStorage.getItem("userToken"),
			userName: localStorage.getItem("userName"),
			actualizador: false,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			setId : (userId) => {
                setStore({"userId":(userId)});
                if (userId) {
                    localStorage.setItem("userId", userId);
                } else {
                    localStorage.removeItem("userId");
                }
            },

			setToken : (userToken) => {
                setStore({"userToken":(userToken)});
                if (userToken) {
                    localStorage.setItem("userToken", userToken);
                } else {
                    localStorage.removeItem("userToken");
                }
            },

			setName : (userName) => {
                setStore({"userName":(userName)});
                if (userName) {
                    localStorage.setItem("userName", userName);
                } else {
                    localStorage.removeItem("userName");
                }
			},
			toggleEstado: () => {
				setStore({"actualizador":(prevEstado) => !prevEstado}); // Cambia entre true y false
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
