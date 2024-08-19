export interface UserInterface {
    user_id: number;
    email: string;
    password: string;
}

export interface UserDetails{
    user_id: number,
    bedrooms?: number,
    house_value?: number,
    no_of_children?: number,
    tot_ppl?: number,
    employment_full_time_employee?: number,
    employment_part_time_employee?: number,
    employment_retired?: number,
    employment_self_employed?: number,
    employment_student?: number,
    employment_unemployeed_seeking_work?: number,
    family_structure_1_non_pensioner?: number,
	family_structure_all_pensioners?: number,
	family_structure_all_students?: number,
	family_structure_couple_with_dependent_children?: number,
	family_structure_other?: number,
	family_structure_single_parent_dependent_children?: number,
	savings_just_managing?: number,
	savings_saving_a_lot?: number,
	savings_saving_little?: number,
	savings_using_savings_in_debt?: number,
	house_type_bungalow?: number,
	house_type_detached_house?: number,
	house_type_flat_maisonette?: number,
	house_type_semi_detached?: number,
	house_type_terraced?: number,
}