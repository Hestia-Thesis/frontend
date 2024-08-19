import { defineStore } from "pinia";
import { User } from "../models/Classes";
import { UserInterface, UserDetails } from "../models/Interfaces";

export const useUserStore = defineStore("user", {
    state: () => ({
        user : {} as User | undefined
    }),
    actions: {
        setUser(user: UserInterface) {
            const userObj = {
                user_id: user.user_id,
                email: user.email,
                password: user.password,
                userDetails: {
                    user_id: user.user_id
                } as UserDetails
            }
            this.user = userObj
            this.setUserDetails()
        },
        clearUser() {
            this.user = undefined
        },
        setUserDetails() {
            if(this.user != undefined) {
                    fetch("http://127.0.0.1:8000/user_details" + this.user.user_id)
                    .then((response) => response.json())
                    .then((data) => {
                        this.user!.userDetails = data[0]
                    })
                    .catch((error) => {
                        throw new Error(error)
                    })
            }
            else {
                throw new Error("No user is logged in")
            }
            
        }
        
    },
    getters : {
        getUserWithoutDetails: (state) => {
            if(state.user != undefined)
            return {
                user_id: state.user.user_id,
                email: state.user.email,
                password: state.user.password
            } as UserInterface
        },
        getUser: (state) => {
            return state.user
        }
    }
})