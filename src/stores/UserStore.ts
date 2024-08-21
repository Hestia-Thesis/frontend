import { defineStore } from "pinia";
import { User } from "../models/Classes";
import { UserInterface, UserDetails } from "../models/Interfaces";

export const useUserStore = defineStore("user", {
    
    state: () => ({
        user : {} as User | undefined,
        hasUserDetails: false
    }),
    actions: {
        async setUser(user: UserInterface) {
            const userObj = {
                user_id: user.user_id,
                email: user.email,
                password: user.password,
                userDetails: {
                    user_id: user.user_id,
                    bedrooms: 0,
                    house_value: 0,
                    no_of_children: 0,
                    tot_ppl: 0,
                    employment_full_time_employee: 0,
                    employment_part_time_employee: 0,
                    employment_retired: 0,
                    employment_self_employed: 0,
                    employment_student: 0,
                    employment_unemployeed_seeking_work: 0,
                    family_structure_1_non_pensioner: 0,
                    family_structure_all_pensioners: 0,
                    family_structure_all_students: 0,
                    family_structure_couple_with_dependent_children: 0,
                    family_structure_other: 0,
                    family_structure_single_parent_dependent_children: 0,
                    savings_just_managing: 0,
                    savings_saving_a_lot: 0,
                    savings_saving_little: 0,
                    savings_using_savings_in_debt: 0,
                    house_type_bungalow: 0,
                    house_type_detached_house: 0,
                    house_type_flat_maisonette: 0,
                    house_type_semi_detached: 0,
                    house_type_terraced: 0,
                } as UserDetails
            } as User
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
                        this.user!.userDetails = data[0];
                        this.hasUserDetails = true;
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
        },
        isAuthenticated: (state) => {
            return !!state.user?.user_id
        }
    }
})