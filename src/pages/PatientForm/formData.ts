export interface FormData {
  reg_date: Date;
  patient_info: {
    first_name: string;
    last_name: string;
    name_lower: string;
    gender: string;
    birthday: Date;
    age: string;
    phone: string;
    email: string;
    address: string;
  };
  emergency_contact: {
    first_name: string;
    last_name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  evaluation: {
    evaluation_date: Date;
    selected_algorithm: string;
    at_risk: string;
    final_risk_score: string;
  };
  steadi_evaluation?: {
    screening_tool: string;
    risk_assess: string;
    assess_score: string;
    key_questions_score: string;
    brochure_score: string;
    medication_details: string[];
    mental_health_details: string[];
    tug_test?: {
      time: string;
    };
    chair_stand_test?: {
      stands: string;
    };
    balance_test?: {
      side_by_side: string;
      semi_tandem: string;
      tandem: string;
      one_foot: string;
    };
  };
  key_questions?: {
    fall_last_year: string;
    fall_count: string;
    injured: string;
    unsteady: string;
    worry_falling: string;
  };
  brochure?: {
    fallen_past_year: string;
    use_cane_walker: string;
    unsteady: string;
    hold_furniture: string;
    worry_falling: string;
    push_hand: string;
    trouble_step: string;
    rush_toilet: string;
    lost_feeling: string;
    light_headed: string;
    take_meds: string;
    feel_sad: string;
  };
  other_evaluation?: {
    risk_assess: string;
    risk_score: string;
    additional_evaluation: string;
  };
}

export const initialFormData: FormData = {
  reg_date: new Date(),
  patient_info: {
    first_name: "",
    last_name: "",
    name_lower: "",
    gender: "",
    birthday: new Date(),
    age: "",
    phone: "",
    email: "",
    address: "",
  },
  emergency_contact: {
    first_name: "",
    last_name: "",
    relationship: "",
    phone: "",
    email: "",
  },
  evaluation: {
    evaluation_date: new Date(),
    selected_algorithm: "",
    at_risk: "",
    final_risk_score: "",
  },
  steadi_evaluation: {
    screening_tool: "",
    risk_assess: "",
    assess_score: "",
    key_questions_score: "",
    brochure_score: "",
    medication_details: [],
    mental_health_details: [],
    tug_test: {
      time: "",
    },
    chair_stand_test: {
      stands: "",
    },
    balance_test: {
      side_by_side: "",
      semi_tandem: "",
      tandem: "",
      one_foot: "",
    },
  },
  key_questions: {
    fall_last_year: "",
    fall_count: "",
    injured: "",
    unsteady: "",
    worry_falling: "",
  },
  brochure: {
    fallen_past_year: "",
    use_cane_walker: "",
    unsteady: "",
    hold_furniture: "",
    worry_falling: "",
    push_hand: "",
    trouble_step: "",
    rush_toilet: "",
    lost_feeling: "",
    light_headed: "",
    take_meds: "",
    feel_sad: "",
  },
  other_evaluation: {
    risk_assess: "",
    risk_score: "",
    additional_evaluation: "",
  },
};