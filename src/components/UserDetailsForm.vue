<script setup lang="ts">
import VInput from './VInput.vue';
import VButton from './VButton.vue';
import { UserDetails } from '../models/Interfaces';
import { ref, computed } from 'vue';
import { useUserStore } from '../stores/UserStore';
import { useToast } from 'vue-toastification';

    const userStore = useUserStore()
    const toast = useToast()
    
    const userId = () => {
        if(userStore.user) {
            if(userStore.user.userDetails) {
                return userStore.user.userDetails
            }
            else {
                console.log("User details not found, returning default values")
                return {
                    user_id: userStore.user.user_id,
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
            }
        }
        else {
            throw new Error("User is not logged in")
        }
    }
    
    const userData = userId()

    const searchActive = (object : Object) => {
        const highestValue = ref("");
        const highestNumber = ref(0);
        for(const [key, value] of Object.entries(object)) {
            if(value > highestNumber.value) {
                highestNumber.value = value;
                highestValue.value = key;
            }
        }
        return highestValue.value
    }

    const searchClosestKey = (object : Object, value: number) => {
        let closestKey: string;
        let smallestDifference = Infinity;

        for (const [key, objValue] of Object.entries(object)) {
            const difference = Math.abs(objValue - value);

            if (difference < smallestDifference) {
                smallestDifference = difference;
                closestKey = key;
            }
        }

        return closestKey!;
    }

    const bedroomsValues = {
        "1" : 1,
        "2" : 2,
        "3" : 3,
        "4" : 4,
        "5 or more" : 5
    }

    const selectedBedroomsValue = ref(searchClosestKey(bedroomsValues, userData.bedrooms ?? 0))

    const houseValues = {
        "Up to 100K" : 50,
        "Between 100K - 150K" : 125,
        "Between 150K - 250K" : 200,
        "Between 250K - 500K" : 375,
        "Between 500K - 750K" : 625,
        "Between 750K - 1M" : 875,
        "More than 1M" : 1000
    }

    const selectedHouseValue = ref(searchClosestKey(houseValues, userData.house_value ?? 0))

    const childrenValues = {
        "0" : 0,
        "1" : 1,
        "2" : 2,
        "3 or more" : 3
    }

    const selectedChildrenValue = ref(searchClosestKey(childrenValues, userData.no_of_children ?? 0))

    const totalPeopleValues = {
        "1 person" : 1,
        "2 people" : 2,
        "3-4 people" : 3.5,
        "5 or more" : 5
    }

    const selectedTotalPeopleValue = ref(searchClosestKey(totalPeopleValues, userData.tot_ppl ?? 0))

    const employementTypes = {
        "Full time employee" :  userData.employment_full_time_employee,
        "Part time employee" : userData.employment_part_time_employee,
        "Retired" : userData.employment_retired,
        "Self employed" : userData.employment_self_employed,
        "Student" : userData.employment_student,
        "Unemployed/Seeking work" : userData.employment_unemployeed_seeking_work
    }
    
    const selectedEmployementType = ref(searchActive(employementTypes))

    const familyStructureTypes = {
        "One person household (non-pensioner)" : userData.family_structure_1_non_pensioner,
        "All pensioner household" : userData.family_structure_all_pensioners,
        "All student household" : userData.family_structure_all_students,
        "Couple with dependant children" : userData.family_structure_couple_with_dependent_children,
        "Other" : userData.family_structure_other,
        "Single parent with dependant children" : userData.family_structure_single_parent_dependent_children,
    }

    const selectedFamilyStructure = ref(searchActive(familyStructureTypes))

    const savingsTypes = {
        "Just managing to make ends meet" : userData.savings_just_managing,
        "Saving a lot" : userData.savings_saving_a_lot,
        "Saving a little" : userData.savings_saving_little,
        "Drawing on savings/Running into dept" : userData.savings_using_savings_in_debt,
    }

    const selectedSavingsType = ref(searchActive(savingsTypes))

    const houseTypes = {
        "Bungalow" : userData.house_type_bungalow,
        "Detached house" : userData.house_type_detached_house,
        "Flat maisonette" : userData.house_type_flat_maisonette,
        "Semi detached" : userData.house_type_semi_detached
    }

    const selectedHouseType = ref(searchActive(houseTypes))

    const formData = computed(() => ({
        user_id : userData.user_id,
        bedrooms: bedroomsValues[selectedBedroomsValue.value as keyof typeof bedroomsValues] ?? 0,
        house_value: houseValues[selectedHouseValue.value as keyof typeof houseValues] ?? 0,
        no_of_children: childrenValues[selectedChildrenValue.value as keyof typeof childrenValues],
        tot_ppl: totalPeopleValues[selectedTotalPeopleValue.value as keyof typeof totalPeopleValues],
        employment_full_time_employee: selectedEmployementType.value == Object.keys(employementTypes)[0] ? 1 : 0,
        employment_part_time_employee: selectedEmployementType.value == Object.keys(employementTypes)[1] ? 1 : 0,
        employment_retired: selectedEmployementType.value == Object.keys(employementTypes)[2] ? 1 : 0,
        employment_self_employed: selectedEmployementType.value == Object.keys(employementTypes)[3] ? 1 : 0,
        employment_student: selectedEmployementType.value == Object.keys(employementTypes)[4] ? 1 : 0,
        employment_unemployeed_seeking_work: selectedEmployementType.value == Object.keys(employementTypes)[5] ? 1 : 0,
        family_structure_1_non_pensioner: selectedFamilyStructure.value == Object.keys(familyStructureTypes)[0] ? 1 : 0,
        family_structure_all_pensioners: selectedFamilyStructure.value == Object.keys(familyStructureTypes)[1] ? 1 : 0,
        family_structure_all_students: selectedFamilyStructure.value == Object.keys(familyStructureTypes)[2] ? 1 : 0,
        family_structure_couple_with_dependent_children: selectedFamilyStructure.value == Object.keys(familyStructureTypes)[3] ? 1 : 0,
        family_structure_other: selectedFamilyStructure.value == Object.keys(familyStructureTypes)[4] ? 1 : 0,
        family_structure_single_parent_dependent_children: selectedFamilyStructure.value == Object.keys(familyStructureTypes)[5] ? 1 : 0,
        savings_just_managing: selectedSavingsType.value == Object.keys(savingsTypes)[0] ? 1 : 0,
        savings_saving_a_lot: selectedSavingsType.value == Object.keys(savingsTypes)[1] ? 1 : 0,
        savings_saving_little: selectedSavingsType.value == Object.keys(savingsTypes)[2] ? 1 : 0,
        savings_using_savings_in_debt: selectedSavingsType.value == Object.keys(savingsTypes)[3] ? 1 : 0,
        house_type_bungalow: selectedHouseType.value == Object.keys(houseTypes)[0] ? 1 : 0,
        house_type_detached_house: selectedHouseType.value == Object.keys(houseTypes)[1] ? 1 : 0,
        house_type_flat_maisonette: selectedHouseType.value == Object.keys(houseTypes)[2] ? 1 : 0,
        house_type_semi_detached: selectedHouseType.value == Object.keys(houseTypes)[3] ? 1 : 0,
        house_type_terraced: selectedHouseType.value == Object.keys(houseTypes)[4] ? 1 : 0,
    }))

    const submitForm = async () => {
        const response = ref()
        if (userStore.hasUserDetails) {
            response.value = await updateUserDetails(formData.value)
        }
        else {
            response.value = await postUserDetails(formData.value)
        }
        console.log(response.value)
        if(response.value) {
            alert('Profile successfully saved')
        }
        else {
            alert('Failed to save profile')
        }
        userStore.setUserDetails();
    }

    const postUserDetails = (userDetails : UserDetails) => {
        return fetch("http://127.0.0.1:8000/user_details", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers : {
                'Content-type': 'application/json',
            },
        })
        .then((response) => {
            return response.ok
        })
        .catch((error) => {
            console.log('Error:', error)
            toast.error(error.message || 'An error occured')
        })
    }

    const updateUserDetails = (userDetails : UserDetails) => {
        return fetch("http://127.0.0.1:8000/user_details/" + userDetails.user_id, {
            method: "PUT",
            body: JSON.stringify(userDetails),
            headers : {
                'Content-type': 'application/json',
            },
        })
        .then((response) => {
            return response.ok
        })
        .catch((error) => {
            console.log('Error:', error)
            toast.error(error.message || 'An error occured')
        })
    }


</script>

 
<template>
    <div class="text-base">
        Profile details
    </div>
    <div class="my-20px">
        <div class="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 bottom-0">
            <VInput id="bedrooms" size="sm" type="select" :options="Object.keys(bedroomsValues)" v-model="selectedBedroomsValue" label="How many bedrooms does my residence have?">
            </VInput>
            <VInput id="houseValue" size="sm" type="select" :options="Object.keys(houseValues)" v-model="selectedHouseValue" label="How much is my residence worth?">
            </VInput>
            <VInput id="children" size="sm" type="select" :options="Object.keys(childrenValues)" v-model="selectedChildrenValue" label="How many children do I have in my household?">
            </VInput>
            <VInput id="totalPeople" size="sm" type="select" :options="Object.keys(totalPeopleValues)" v-model="selectedTotalPeopleValue" label="How many people does my houshold consist of?">
            </VInput>
            <VInput class="col-span-2" id="employement" size="md" type="select" :options="Object.keys(employementTypes)" v-model="selectedEmployementType" label="What is my employement status?">
            </VInput>
            <VInput class="col-span-2 xl:col-span-3 2xl:col-span-2" id="familyStructure" size="md" type="select" :options="Object.keys(familyStructureTypes)" v-model="selectedFamilyStructure" label="How is my family structured?">
            </VInput>
            <VInput class="col-span-2 xl:col-span-3 2xl:col-span-2" id="savings" size="md" type="select" :options="Object.keys(savingsTypes)" v-model="selectedSavingsType" label="What is my savings status like?">
            </VInput>
            <VInput class="col-span-2 xl:col-span-3 2xl:col-span-2" id="houseType" size="md" type="select" :options="Object.keys(houseTypes)" v-model="selectedHouseType" label="What is my house type?">
            </VInput>
        </div>
    </div>
    <div class="relative my-20px">
        <VButton class="font-semibold text-base" type="submit" @click="submitForm">
            Save
        </VButton>
    </div>

</template>