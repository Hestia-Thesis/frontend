import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { User } from "../models/Classes";
import { UserInterface, UserDetails } from "../models/Interfaces";
import { api_url } from "../components/api/api_url";

export const useUserStore = defineStore("user", () => {
    // State
    const user = ref<User | undefined>(undefined);
    const hasUserDetails = ref(false);

    // Actions
    const setUser = async (userInput: UserInterface) => {
        const userObj: User = {
            user_id: userInput.user_id,
            email: userInput.email,
            password: userInput.password,
            userDetails: {
            } as UserDetails,
        };
        user.value = userObj;
        setUserDetails();
    };

    const clearUser = () => {
        user.value = undefined;
        hasUserDetails.value = false;
        localStorage.removeItem("user");
    };

    const setUserDetails = () => {
        if (user.value != undefined) {
            fetch(api_url + "/user_details/" + user.value.user_id)
                .then((response) => response.json())
                .then((data) => {
                    user.value!.userDetails = data[0];
                    hasUserDetails.value = true;
                })
                .catch((error) => {
                    throw new Error(error);
                });
        } else {
            throw new Error("No user is logged in");
        }
    };

    // Getters
    const getUserWithoutDetails = computed<UserInterface | undefined>(() => {
        if (user.value != undefined) {
            return {
                user_id: user.value.user_id,
                email: user.value.email,
                password: user.value.password,
            };
        }
    });

    const getUser = computed(() => user.value);

    const isAuthenticated = computed(() => !!user.value?.user_id);
    
    const userFromStorage = localStorage.getItem("user");

    if (userFromStorage != undefined && userFromStorage != "") {
        try {
            user.value = JSON.parse(userFromStorage);
        }
        catch(error) {
            console.error("Failed to fetch user from local storage", error);
            localStorage.removeItem("user")
        }
    }

    watch(
        user,
        (userVal) => {
            localStorage.setItem("user", JSON.stringify(userVal));
        },
        { deep: true }
    )

    // Return the state, actions, and getters
    return {
        user,
        hasUserDetails,
        setUser,
        clearUser,
        setUserDetails,
        getUserWithoutDetails,
        getUser,
        isAuthenticated,
    };
});
