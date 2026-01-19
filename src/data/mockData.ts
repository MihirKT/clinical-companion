import {
  Patient,
  Visit,
  Transcript,
  ClinicalInsight,
  DifferentialDiagnosis,
  SafetyAlert,
  ClinicalTask,
  CorrectionEntry,
  VitalSign,
  Medication,
  AmbientSession,
  ClinicalMoment,
  ClinicianStyleProfile,
  RefinementVersion,
  QualityWarning,
  RecentTranscription,
  VisitType,
  TranscriptSegment,
} from "@/types/clinical";

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Sarah Johnson",
    age: 45,
    gender: "female",
    medicalId: "MRN-2024-001",
    contact: "+1 (555) 123-4567",
    primaryCondition: "Type 2 Diabetes",
    lastVisit: new Date("2024-01-15"),
    aiSummary:
      "Long-term diabetic patient with well-controlled HbA1c. Recent concerns about peripheral neuropathy symptoms.",
    alerts: [
      {
        id: "a1",
        type: "allergy",
        message: "Penicillin allergy",
        severity: "high",
      },
      {
        id: "a2",
        type: "medication",
        message: "On Metformin 1000mg BID",
        severity: "low",
      },
    ],
  },
  {
    id: "p2",
    name: "Michael Chen",
    age: 62,
    gender: "male",
    medicalId: "MRN-2024-002",
    contact: "+1 (555) 234-5678",
    primaryCondition: "Hypertension, CAD",
    lastVisit: new Date("2024-01-10"),
    aiSummary:
      "Cardiovascular patient with stable angina. Recently adjusted medication regimen showing improvement.",
    alerts: [
      {
        id: "a3",
        type: "risk",
        message: "High cardiovascular risk",
        severity: "high",
      },
    ],
  },
  {
    id: "p3",
    name: "Emily Rodriguez",
    age: 34,
    gender: "female",
    medicalId: "MRN-2024-003",
    primaryCondition: "Anxiety Disorder",
    lastVisit: new Date("2024-01-18"),
    aiSummary:
      "Managing generalized anxiety with CBT and low-dose SSRI. Good therapeutic response.",
  },
  {
    id: "p4",
    name: "James Thompson",
    age: 78,
    gender: "male",
    medicalId: "MRN-2024-004",
    primaryCondition: "COPD, Heart Failure",
    lastVisit: new Date("2024-01-12"),
    aiSummary:
      "Elderly patient with multiple comorbidities. Stable on current regimen but requires close monitoring.",
    alerts: [
      {
        id: "a4",
        type: "condition",
        message: "Fall risk - use caution",
        severity: "medium",
      },
      {
        id: "a5",
        type: "medication",
        message: "Multiple drug interactions possible",
        severity: "medium",
      },
    ],
  },
  {
    id: "p5",
    name: "Lisa Park",
    age: 28,
    gender: "female",
    medicalId: "MRN-2024-005",
    primaryCondition: "Migraine",
    lastVisit: new Date("2024-01-20"),
    aiSummary:
      "Chronic migraine patient, exploring preventive options after triptans showed limited efficacy.",
  },
  {
    id: "p6",
    name: "Robert Williams",
    age: 55,
    gender: "male",
    medicalId: "MRN-2024-006",
    primaryCondition: "Osteoarthritis",
    lastVisit: new Date("2024-01-08"),
    aiSummary:
      "Bilateral knee OA with moderate pain. Considering referral to orthopedics for evaluation.",
  },
];

// Mock Visits
export const mockVisits: Visit[] = [
  {
    id: "v1",
    patientId: "p1",
    date: new Date("2024-01-15"),
    type: "follow-up",
    diagnosis: "Type 2 Diabetes - stable",
    notes: "Regular follow-up, HbA1c reviewed",
  },
  {
    id: "v2",
    patientId: "p1",
    date: new Date("2023-10-20"),
    type: "consultation",
    diagnosis: "Peripheral neuropathy symptoms",
    notes: "New symptom presentation, ordered nerve conduction study",
  },
  {
    id: "v3",
    patientId: "p1",
    date: new Date("2023-07-12"),
    type: "routine",
    diagnosis: "Annual diabetic review",
  },
  {
    id: "v4",
    patientId: "p1",
    date: new Date("2023-04-05"),
    type: "follow-up",
    diagnosis: "Diabetes control check",
    notes: "HbA1c 7.3%, discussed medication compliance",
  },
  {
    id: "v5",
    patientId: "p1",
    date: new Date("2023-01-10"),
    type: "routine",
    diagnosis: "Annual physical examination",
    notes: "Routine labs ordered, all within normal limits",
  },
  {
    id: "v6",
    patientId: "p2",
    date: new Date("2024-01-10"),
    type: "follow-up",
    diagnosis: "Stable angina, medication adjustment",
  },
  {
    id: "v7",
    patientId: "p2",
    date: new Date("2023-12-28"),
    type: "consultation",
    diagnosis: "Chest pain evaluation",
    notes: "EKG performed, no acute changes",
  },
  {
    id: "v8",
    patientId: "p2",
    date: new Date("2023-10-15"),
    type: "follow-up",
    diagnosis: "Hypertension management",
    notes: "BP controlled on current regimen",
  },
  {
    id: "v9",
    patientId: "p3",
    date: new Date("2024-01-18"),
    type: "follow-up",
    diagnosis: "Anxiety disorder - well controlled",
    notes: "Patient reports good response to therapy and medication",
  },
  {
    id: "v10",
    patientId: "p3",
    date: new Date("2023-12-15"),
    type: "consultation",
    diagnosis: "Anxiety disorder assessment",
    notes: "Started on SSRI therapy",
  },
  {
    id: "v11",
    patientId: "p4",
    date: new Date("2024-01-12"),
    type: "post-op",
    diagnosis: "COPD exacerbation hospitalization",
    notes: "Discharged with oral steroid taper",
  },
  {
    id: "v12",
    patientId: "p4",
    date: new Date("2024-01-05"),
    type: "follow-up",
    diagnosis: "Post-hospitalization assessment",
    notes: "Recovery progressing well",
  },
  {
    id: "v13",
    patientId: "p5",
    date: new Date("2024-01-20"),
    type: "consultation",
    diagnosis: "Chronic migraine inadequately controlled",
    notes: "Started preventive therapy",
  },
  {
    id: "v14",
    patientId: "p5",
    date: new Date("2024-01-17"),
    type: "follow-up",
    diagnosis: "Preventive migraine therapy assessment",
    notes: "Good tolerance, early signs of efficacy",
  },
  {
    id: "v15",
    patientId: "p6",
    date: new Date("2024-01-08"),
    type: "consultation",
    diagnosis: "Bilateral knee osteoarthritis",
    notes: "Referred to orthopedics for surgical evaluation",
  },
  {
    id: "v16",
    patientId: "p6",
    date: new Date("2023-12-20"),
    type: "follow-up",
    diagnosis: "Physical therapy progress assessment",
    notes: "Slight improvement in ROM",
  },
];

// Enhanced Mock Transcript with speaker roles and clinical classification
export const mockTranscript: Transcript = {
  id: "t1",
  visitId: "v1",
  patientId: "p1",
  patientName: "Sarah Johnson",
  visitType: "follow-up",
  title: "Diabetic Follow-up - Neuropathy Symptoms",
  audioQuality: "good",
  rawText: `Doctor: Good morning Mrs Johnson. How are you feeling today?

Patient: Morning doctor. I've been doing okay mostly, but I've noticed some tingling in my feet lately, especially at night.

Doctor: I see. Tell me more about this tingling sensation. When did it start?

Patient: Maybe about two weeks ago. It's like pins and needles, mostly in my toes but sometimes up to my ankles.

Doctor: That's helpful to know. Are you experiencing any numbness along with the tingling?

Patient: Yes, sometimes. And my feet feel cold even when they're not.

Doctor: Let's check your latest blood sugar readings and examine your feet. Have you been taking your Metformin regularly?

Patient: Yes, twice a day with meals, just like you prescribed.`,
  improvedText: `Doctor: Good morning, Mrs. Johnson. How are you feeling today?

Patient: Good morning, Doctor. I've been doing okay mostly, but I've noticed some tingling in my feet lately, especially at night.

Doctor: I see. Tell me more about this tingling sensation. When did it start?

Patient: Approximately two weeks ago. It feels like pins and needles, primarily in my toes but sometimes extending up to my ankles.

Doctor: That's helpful information. Are you experiencing any numbness along with the tingling?

Patient: Yes, sometimes. And my feet feel cold even when they're objectively warm.

Doctor: Let's review your latest blood glucose readings and examine your feet. Have you been taking your Metformin regularly?

Patient: Yes, twice daily with meals, exactly as prescribed.`,
  segments: [
    {
      id: "s1",
      startTime: 0,
      endTime: 5,
      text: "Good morning Mrs Johnson. How are you feeling today?",
      speaker: "Doctor",
      speakerRole: "clinician",
      isClinical: true,
      confidenceScore: 0.95,
    },
    {
      id: "s2",
      startTime: 5,
      endTime: 15,
      text: "Morning doctor. I've been doing okay mostly, but I've noticed some tingling in my feet lately, especially at night.",
      speaker: "Patient",
      speakerRole: "patient",
      isClinical: true,
      confidenceScore: 0.92,
    },
    {
      id: "s3",
      startTime: 15,
      endTime: 22,
      text: "I see. Tell me more about this tingling sensation. When did it start?",
      speaker: "Doctor",
      speakerRole: "clinician",
      isClinical: true,
      confidenceScore: 0.97,
    },
    {
      id: "s4",
      startTime: 22,
      endTime: 35,
      text: "Maybe about two weeks ago. It's like pins and needles, mostly in my toes but sometimes up to my ankles.",
      speaker: "Patient",
      speakerRole: "patient",
      isAiImproved: true,
      originalText:
        "Maybe about two weeks ago. It's like pins and needles, mostly in my toes but sometimes up to my ankles.",
      isClinical: true,
      confidenceScore: 0.89,
    },
    {
      id: "s5",
      startTime: 35,
      endTime: 42,
      text: "That's helpful to know. Are you experiencing any numbness along with the tingling?",
      speaker: "Doctor",
      speakerRole: "clinician",
      isClinical: true,
      confidenceScore: 0.96,
    },
    {
      id: "s6",
      startTime: 42,
      endTime: 50,
      text: "Yes, sometimes. And my feet feel cold even when they're not.",
      speaker: "Patient",
      speakerRole: "patient",
      isAiImproved: true,
      originalText:
        "Yes, sometimes. And my feet feel cold even when they're not.",
      isClinical: true,
      confidenceScore: 0.88,
    },
    {
      id: "s7",
      startTime: 50,
      endTime: 62,
      text: "Let's check your latest blood sugar readings and examine your feet. Have you been taking your Metformin regularly?",
      speaker: "Doctor",
      speakerRole: "clinician",
      isClinical: true,
      confidenceScore: 0.94,
    },
    {
      id: "s8",
      startTime: 62,
      endTime: 70,
      text: "Yes, twice a day with meals, just like you prescribed.",
      speaker: "Patient",
      speakerRole: "patient",
      isClinical: true,
      confidenceScore: 0.91,
    },
  ],
  duration: 70,
  createdAt: new Date("2024-01-15"),
  qualityWarnings: [],
};

// Enhanced Mock Clinical Insights with explainability
export const mockInsights: ClinicalInsight[] = [
  {
    id: "i1",
    type: "finding",
    title: "Key Clinical Findings",
    content: [
      "Patient reports tingling sensation in feet for 2 weeks",
      "Symptoms include pins and needles in toes extending to ankles",
      "Associated numbness and cold sensation in feet",
      "Symptoms worse at night",
      "Medication compliance confirmed (Metformin BID)",
    ],
    confidence: "high",
    linkedSegmentIds: ["s2", "s4", "s6", "s8"],
    linkedTimestamps: [5, 22, 42, 62],
    explanation:
      "These findings were extracted from direct patient statements describing symptom onset, location, character, and timing. Medication compliance was confirmed through explicit patient acknowledgment.",
  },
  {
    id: "i2",
    type: "diagnosis",
    title: "Differential Diagnosis",
    content: "Based on patient presentation and history",
    confidence: "medium",
    linkedSegmentIds: ["s2", "s4", "s6"],
    explanation:
      "Diagnosis considerations are based on the combination of sensory symptoms (tingling, numbness, cold sensation) in a patient with known Type 2 Diabetes on Metformin therapy.",
  },
  {
    id: "i3",
    type: "alert",
    title: "Safety Alerts",
    content: "Potential complications requiring attention",
    confidence: "high",
    severity: "medium",
    linkedSegmentIds: ["s7", "s8"],
    explanation:
      "Safety considerations arise from the known association between long-term Metformin use and B12 deficiency, combined with the development of neuropathic symptoms.",
  },
  {
    id: "i4",
    type: "task",
    title: "Recommended Clinical Tasks",
    content: "Actions to consider based on this visit",
    confidence: "high",
    linkedSegmentIds: ["s7"],
    explanation:
      "Tasks are generated based on standard of care for diabetic patients presenting with new neuropathic symptoms.",
  },
];

export const mockDifferentialDiagnosis: DifferentialDiagnosis[] = [
  {
    id: "d1",
    condition: "Diabetic Peripheral Neuropathy",
    likelihood: "likely",
    reasoning:
      "Classic presentation in long-standing T2DM patient with bilateral symmetric sensory symptoms",
    linkedSegmentIds: ["s2", "s4", "s6"],
    explanation:
      "The patient describes bilateral distal sensory symptoms (tingling, numbness) with nighttime predominance, which is characteristic of diabetic peripheral neuropathy.",
  },
  {
    id: "d2",
    condition: "Peripheral Vascular Disease",
    likelihood: "probable",
    reasoning:
      "Cold sensation and T2DM history suggest possible vascular component",
    linkedSegmentIds: ["s6"],
    explanation:
      "The subjective cold sensation in feet, combined with diabetes as a major cardiovascular risk factor, raises concern for concurrent peripheral vascular disease.",
  },
  {
    id: "d3",
    condition: "B12 Deficiency Neuropathy",
    likelihood: "possible",
    reasoning:
      "Metformin use associated with B12 deficiency; consider screening",
    linkedSegmentIds: ["s7", "s8"],
    explanation:
      "Long-term Metformin use is associated with decreased B12 absorption. This should be excluded as a contributing factor to the neuropathy symptoms.",
  },
];

export const mockSafetyAlerts: SafetyAlert[] = [
  {
    id: "sa1",
    type: "drug-interaction",
    title: "B12 Monitoring Required",
    description:
      "Long-term Metformin use may cause B12 deficiency. Consider annual B12 level monitoring.",
    severity: "medium",
    linkedSegmentIds: ["s7", "s8"],
  },
  {
    id: "sa2",
    type: "risk",
    title: "Foot Care Assessment Needed",
    description:
      "Neuropathy symptoms increase risk of foot ulcers and infections in diabetic patients.",
    severity: "high",
    linkedSegmentIds: ["s2", "s4"],
  },
];

// Enhanced Clinical Tasks with implicit detection
export const mockClinicalTasks: ClinicalTask[] = [
  {
    id: "ct1",
    task: "Order HbA1c test",
    priority: "high",
    completed: false,
    isImplicit: false,
    source: "explicit",
    linkedSegmentId: "s7",
  },
  {
    id: "ct2",
    task: "Perform monofilament foot exam",
    priority: "high",
    completed: false,
    isImplicit: false,
    source: "explicit",
    linkedSegmentId: "s7",
  },
  {
    id: "ct3",
    task: "Check B12 levels",
    priority: "medium",
    completed: false,
    isImplicit: true,
    source: "inferred",
    linkedSegmentId: "s8",
  },
  {
    id: "ct4",
    task: "Order nerve conduction study if symptoms persist",
    priority: "medium",
    completed: false,
    isImplicit: true,
    source: "inferred",
    linkedSegmentId: "s4",
  },
  {
    id: "ct5",
    task: "Refer to diabetic foot clinic",
    priority: "low",
    completed: false,
    isImplicit: true,
    source: "inferred",
    linkedSegmentId: "s2",
  },
  {
    id: "ct6",
    task: "Schedule follow-up in 4 weeks",
    priority: "medium",
    completed: false,
    isImplicit: false,
    source: "explicit",
  },
];

// Mock Corrections
export const mockCorrections: CorrectionEntry[] = [
  {
    id: "c1",
    original: "metforman",
    corrected: "Metformin",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "c2",
    original: "diabeties",
    corrected: "diabetes",
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "c3",
    original: "HBA1C",
    corrected: "HbA1c",
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "c4",
    original: "nuropathy",
    corrected: "neuropathy",
    createdAt: new Date("2024-01-03"),
  },
];

// Mock Vitals for Patient p1
export const mockVitals: VitalSign[] = [
  {
    date: new Date("2024-01-15"),
    bloodPressureSystolic: 128,
    bloodPressureDiastolic: 82,
    heartRate: 72,
    temperature: 36.8,
    oxygenSaturation: 98,
    weight: 74,
  },
  {
    date: new Date("2023-10-20"),
    bloodPressureSystolic: 132,
    bloodPressureDiastolic: 85,
    heartRate: 78,
    temperature: 36.7,
    oxygenSaturation: 97,
    weight: 75,
  },
  {
    date: new Date("2023-07-12"),
    bloodPressureSystolic: 130,
    bloodPressureDiastolic: 84,
    heartRate: 74,
    temperature: 36.6,
    oxygenSaturation: 98,
    weight: 76,
  },
  {
    date: new Date("2023-04-05"),
    bloodPressureSystolic: 135,
    bloodPressureDiastolic: 88,
    heartRate: 80,
    temperature: 36.8,
    oxygenSaturation: 97,
    weight: 78,
  },
  {
    date: new Date("2023-01-10"),
    bloodPressureSystolic: 140,
    bloodPressureDiastolic: 90,
    heartRate: 82,
    temperature: 36.7,
    oxygenSaturation: 96,
    weight: 80,
  },
  {
    date: new Date("2022-10-15"),
    bloodPressureSystolic: 138,
    bloodPressureDiastolic: 88,
    heartRate: 76,
    temperature: 36.8,
    oxygenSaturation: 98,
    weight: 79,
  },
];

// Mock Medications for Patient p1
export const mockMedications: Medication[] = [
  {
    id: "m1",
    name: "Metformin",
    dosage: "1000mg",
    frequency: "Twice daily",
    startDate: new Date("2020-03-15"),
    active: true,
  },
  {
    id: "m2",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: new Date("2021-06-20"),
    active: true,
  },
  {
    id: "m3",
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    startDate: new Date("2022-01-10"),
    active: true,
  },
  {
    id: "m4",
    name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    startDate: new Date("2021-06-20"),
    active: true,
  },
  {
    id: "m5",
    name: "Glipizide",
    dosage: "5mg",
    frequency: "Once daily",
    startDate: new Date("2019-08-01"),
    endDate: new Date("2020-03-15"),
    active: false,
  },
];

// Previous Summaries
export interface PreviousSummary {
  id: string;
  patientId: string;
  patientName: string;
  type: "soap" | "discharge" | "referral" | "progress" | "custom";
  title: string;
  content: string;
  createdAt: Date;
  visitType?: VisitType;
}

export const mockPreviousSummaries: PreviousSummary[] = [
  {
    id: "sum1",
    patientId: "p1",
    patientName: "Sarah Johnson",
    type: "soap",
    title: "SOAP Note - Diabetic Follow-up",
    visitType: "follow-up",
    content: `SUBJECTIVE:
Mrs. Sarah Johnson, a 45-year-old female with a history of Type 2 Diabetes Mellitus, presents for follow-up. She reports new-onset tingling sensation in bilateral feet for approximately 2 weeks, especially at night.

OBJECTIVE:
Vital signs: BP 128/82, HR 72, Temp 36.8°C, Weight 74 kg
Foot examination: Decreased sensation to monofilament testing bilaterally in distal feet
Labs: HbA1c 7.2%, glucose 145 mg/dL

ASSESSMENT:
1. Type 2 Diabetes Mellitus - on Metformin, reasonably controlled
2. New-onset diabetic peripheral neuropathy
3. Hypertension - well controlled on Lisinopril
4. Hyperlipidemia - on Atorvastatin

PLAN:
1. Order serum B12 level to rule out B12 deficiency contributing to neuropathy
2. Order nerve conduction studies to confirm neuropathy
3. Start Gabapentin 100mg TID for symptom management
4. Discussed lifestyle modifications including foot care and glucose monitoring
5. Follow-up in 4 weeks to review NCS results and assess symptom response`,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "sum2",
    patientId: "p1",
    patientName: "Sarah Johnson",
    type: "progress",
    title: "Progress Note - Neuropathy Assessment",
    visitType: "follow-up",
    content: `Patient continues to experience bilateral foot tingling but reports 30% reduction in symptoms since starting Gabapentin. Nerve conduction study shows mild-moderate demyelinating neuropathy consistent with diabetes. HbA1c result: 7.2% - fair control. 

Current medications: Metformin 1000mg BID, Lisinopril 10mg daily, Atorvastatin 20mg daily, Gabapentin 100mg TID, Aspirin 81mg daily

Will continue current diabetes regimen and Gabapentin. Referred to endocrinology for optimization of glycemic control. Reassess in 6 weeks.

Advised patient on daily foot inspection and appropriate footwear to prevent ulcer formation.`,
    createdAt: new Date("2023-10-20"),
  },
  {
    id: "sum3",
    patientId: "p1",
    patientName: "Sarah Johnson",
    type: "progress",
    title: "Progress Note - Annual Diabetic Review",
    content: `Annual diabetic comprehensive review completed. Retinal screening: no diabetic retinopathy noted. Microalbumin level normal. Current HbA1c 7.3%.

Patient doing well overall with good medication adherence. Blood pressure well controlled. Lipid panel within target range. Neuropathy symptoms improving with Gabapentin therapy.

Continue current regimen. Next annual exam in 12 months.`,
    createdAt: new Date("2023-07-12"),
  },
  {
    id: "sum4",
    patientId: "p1",
    patientName: "Sarah Johnson",
    type: "progress",
    title: "Progress Note - Diabetes Control Check",
    content: `Patient reports good compliance with medications and diet modifications. Blood glucose logs show average readings 120-145 mg/dL. HbA1c 7.3% - goal is <7%.

Discussed intensifying glycemic control through additional medication or insulin if needed. Patient willing to try additional therapy.

Referral sent to Endocrinology for advanced management options.`,
    createdAt: new Date("2023-04-05"),
  },
  {
    id: "sum5",
    patientId: "p1",
    patientName: "Sarah Johnson",
    type: "soap",
    title: "SOAP Note - Annual Physical",
    content: `SUBJECTIVE:
Patient presents for annual physical examination. Reports good overall health, well-controlled diabetes, and good exercise routine.

OBJECTIVE:
Vital signs: BP 132/84, HR 74, Temp 36.7°C, Weight 75 kg, BMI 28.5
Physical exam: Normal, no abnormalities noted
Labs: FBS 138, HbA1c 7.3%, Lipid panel normal, Creatinine 0.9, Urinalysis normal

ASSESSMENT:
Healthy 45-year-old female with well-controlled Type 2 Diabetes and hypertension. Annual preventive exam completed.

PLAN:
1. Continue current medications
2. Emphasize importance of weight management and exercise
3. Schedule mammogram
4. Influenza vaccine administered
5. Return for annual exam in 12 months`,
    createdAt: new Date("2023-01-10"),
  },
  {
    id: "sum6",
    patientId: "p2",
    patientName: "Michael Chen",
    type: "soap",
    title: "SOAP Note - Cardiology Follow-up",
    visitType: "follow-up",
    content: `SUBJECTIVE:
Mr. Chen reports stable angina with occasional chest tightness during exertion, relieved by rest and nitroglycerin. Denies rest pain, shortness of breath, or palpitations. Compliance with medications good.

OBJECTIVE:
BP 138/86, HR 68, regular rhythm. Heart sounds normal, no murmurs. Lungs clear bilaterally.
EKG: Normal sinus rhythm, no acute changes
Labs: Troponin negative, lipid panel within acceptable range

ASSESSMENT:
1. Stable coronary artery disease with well-controlled angina
2. Hypertension - controlled
3. Hyperlipidemia - on statin therapy

PLAN:
1. Continue current cardiac medications
2. Stress test in 3 months
3. Consider medication adjustment if symptoms worsen
4. Cardiac rehab referral reviewed, patient declined
5. Follow-up in 4 weeks`,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "sum7",
    patientId: "p2",
    patientName: "Michael Chen",
    type: "progress",
    title: "Progress Note - Medication Adjustment",
    content: `Patient tolerated medication adjustment well. Beta-blocker dose increased, Amlodipine added for additional blood pressure and cardiac protection. Chest pain episodes reduced by approximately 50% over past 4 weeks. Blood pressure readings more stable, average 135/82.

Patient reports improved exercise tolerance and better sleep quality. No adverse effects reported.

Continue new regimen and close monitoring. Patient educated on chest pain warning signs and when to seek emergency care.

Follow-up in 4 weeks.`,
    createdAt: new Date("2023-12-28"),
  },
  {
    id: "sum8",
    patientId: "p2",
    patientName: "Michael Chen",
    type: "progress",
    title: "Progress Note - Hypertension Management",
    content: `Patient blood pressures consistently in range 135-140 systolic, 82-88 diastolic on current regimen of Metoprolol 50mg BID and Lisinopril 20mg daily. 

Home BP monitoring encouraged. Patient learning to use home monitor correctly. BP readings correlating well with office readings.

Continue current therapy. Next visit in 8 weeks for recheck.`,
    createdAt: new Date("2023-10-15"),
  },
  {
    id: "sum9",
    patientId: "p3",
    patientName: "Emily Rodriguez",
    type: "progress",
    title: "Progress Note - Anxiety Management",
    visitType: "mental-health",
    content: `Patient reports significantly improved anxiety symptoms with current SSRI regimen (Sertraline 50mg daily). Sleep quality has improved markedly. Anxiety self-rated 4/10 compared to baseline 8/10. Attending therapy sessions regularly, finding CBT techniques helpful.

No medication side effects reported. Patient expressing optimism about progress.

Continue Sertraline 50mg daily. Continue weekly therapy sessions. Next follow-up in 8 weeks.`,
    createdAt: new Date("2024-01-18"),
  },
  {
    id: "sum10",
    patientId: "p3",
    patientName: "Emily Rodriguez",
    type: "soap",
    title: "SOAP Note - Mental Health Assessment",
    content: `SUBJECTIVE:
Patient reports feeling much better on current medication. Anxiety level decreased from 8/10 baseline to 4/10. Sleep improved from 4-5 hours to 7-8 hours nightly. Attending therapy sessions regularly, practicing relaxation techniques.

OBJECTIVE:
Patient alert, oriented, cooperative, appropriate affect. No signs of acute distress. No evidence of depression or suicidal ideation.

ASSESSMENT:
Generalized Anxiety Disorder - well controlled on current regimen of Sertraline 50mg daily and weekly psychotherapy.

PLAN:
1. Continue Sertraline 50mg daily
2. Continue weekly therapy
3. Teach grounding techniques
4. Encourage regular exercise
5. Reassess in 6 weeks`,
    createdAt: new Date("2023-12-15"),
  },
  {
    id: "sum11",
    patientId: "p4",
    patientName: "James Thompson",
    type: "discharge",
    title: "Discharge Summary - COPD Exacerbation",
    visitType: "post-op",
    content: `PATIENT: James Thompson, 78-year-old male
ADMISSION DATE: [Date]
DISCHARGE DATE: [Date]
LENGTH OF STAY: 3 days

ADMITTING DIAGNOSIS: COPD exacerbation

HOSPITAL COURSE:
Patient admitted with acute shortness of breath and increased sputum production. Treated with IV methylprednisolone 40mg Q6H and nebulized albuterol/ipratropium. Chest X-ray showed no infiltrates. Blood cultures negative. Symptoms improved significantly.

DISCHARGE MEDICATIONS:
1. Prednisone 40mg daily x 5 days, then taper
2. Nebulized Albuterol/Ipratropium Q4H
3. Tiotropium daily
4. Salmeterol/Fluticasone daily
5. Continued home oxygen as needed

FOLLOW-UP:
Pulmonology appointment in 1 week. Primary care follow-up in 3-5 days.`,
    createdAt: new Date("2024-01-12"),
  },
  {
    id: "sum12",
    patientId: "p4",
    patientName: "James Thompson",
    type: "progress",
    title: "Progress Note - Post-hospitalization Follow-up",
    content: `Patient recovering well from recent hospitalization for COPD exacerbation. Shortness of breath improved significantly. Using prescribed inhalers as directed. Oxygen saturation stable at 94% on room air during day. Blood oxygen levels maintain 88-90% with activity.

Wife reports good compliance with medications and discharge instructions. Patient following up with pulmonology as scheduled.

Continue current regimen. Monitor for recurrence of symptoms. Patient instructed to seek immediate care if shortness of breath worsens or chest pain develops.`,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "sum13",
    patientId: "p5",
    patientName: "Lisa Park",
    type: "soap",
    title: "SOAP Note - Migraine Management",
    content: `SUBJECTIVE:
Patient presents with chronic migraine, occurring 2-3 times per week with significant functional impairment. Current triptans provide only partial relief and patients experiencing 2-3 hours of significant pain daily. Considering preventive therapy.

OBJECTIVE:
Neurological exam: Normal. No focal deficits. Pupils reactive and equal. No focal weakness or sensory deficits.
Brain MRI: Normal study

ASSESSMENT:
Chronic migraine, inadequately controlled on current acute therapy alone.

PLAN:
1. Start preventive therapy with Propranolol 40mg daily
2. Continue triptans (Sumatriptan) for acute episodes
3. Discuss trigger identification (stress, sleep, diet, hormonal)
4. Recommend regular exercise and sleep hygiene
5. Follow-up in 4 weeks to assess preventive therapy efficacy`,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "sum14",
    patientId: "p5",
    patientName: "Lisa Park",
    type: "progress",
    title: "Progress Note - Preventive Therapy Response",
    content: `Patient started on Propranolol one week ago. Tolerating well with no significant side effects. Migraine frequency already showing encouraging signs of improvement - patient reports only 1 migraine in past week compared to baseline 2-3 per week.

Patient optimistic about prognosis and motivated to continue therapy. Keeping migraine diary as recommended.

Continue Propranolol 40mg daily. Reassess in 3 weeks.`,
    createdAt: new Date("2024-01-17"),
  },
  {
    id: "sum15",
    patientId: "p6",
    patientName: "Robert Williams",
    type: "referral",
    title: "Referral Letter - Orthopedic Surgery",
    content: `Dear Dr. [Orthopedic Surgeon],

Re: Robert Williams, 55-year-old male with bilateral knee osteoarthritis

HISTORY:
Mr. Williams presents with a 2-year history of bilateral knee pain, progressive in nature. Pain worse with activity and prolonged standing. Morning stiffness lasting 30-45 minutes.

PHYSICAL EXAM:
Bilateral knee tenderness at joint line. Decreased range of motion bilaterally. Positive Lachman and anterior drawer tests bilaterally.

IMAGING:
Bilateral knee X-rays show moderate degenerative changes, particularly in medial compartments.

CONSERVATIVE TREATMENT TRIALS:
1. NSAIDs (Naproxen 500mg BID) - provided partial relief only
2. Physical therapy (6 weeks) - mild improvement in ROM but pain remains
3. Intra-articular steroid injection - temporary relief lasting 4 weeks

CURRENT STATUS:
Patient continues to have moderate-to-severe pain with significant functional limitation affecting daily activities and quality of life.

REQUEST FOR EVALUATION:
Requesting orthopedic evaluation for consideration of bilateral knee replacement surgery.

Best regards,
Dr. [Primary Care Physician]`,
    createdAt: new Date("2024-01-08"),
  },
  {
    id: "sum16",
    patientId: "p6",
    patientName: "Robert Williams",
    type: "progress",
    title: "Progress Note - Physical Therapy Follow-up",
    content: `Patient completed 6 weeks of intensive physical therapy for bilateral knee osteoarthritis. Range of motion improved slightly (knee flexion 115° to 125° bilaterally). Pain remained significant, particularly with prolonged walking (>30 minutes).

Patient attempted jogging - resulted in acute pain exacerbation requiring ice and elevation for 2 days. Conservative measures appear to have reached maximal benefit.

Surgical consultation recommended as discussed. Patient accepting of orthopedic referral.`,
    createdAt: new Date("2023-12-20"),
  },
];

// Mock Ambient Session
export const mockAmbientSession: AmbientSession = {
  id: "amb1",
  startTime: new Date(),
  isActive: true,
  clinicalMoments: [],
  segments: [],
  visitType: undefined,
  patientId: undefined,
};

// Mock Ambient Segments with clinical filtering
export const mockAmbientSegments: TranscriptSegment[] = [
  {
    id: "as1",
    startTime: 0,
    endTime: 5,
    text: "Good morning Mrs Johnson. How are you feeling today?",
    speaker: "Doctor",
    speakerRole: "clinician",
    isClinical: true,
    confidenceScore: 0.95,
  },
  {
    id: "as2",
    startTime: 5,
    endTime: 10,
    text: "Oh the weather is lovely today isn't it?",
    speaker: "Patient",
    speakerRole: "patient",
    isClinical: false,
    confidenceScore: 0.88,
    isRedacted: true,
    redactedReason: "Small talk detected",
  },
  {
    id: "as3",
    startTime: 10,
    endTime: 18,
    text: "I've been having this tingling in my feet for about two weeks now.",
    speaker: "Patient",
    speakerRole: "patient",
    isClinical: true,
    confidenceScore: 0.94,
  },
  {
    id: "as4",
    startTime: 18,
    endTime: 25,
    text: "Tell me more about that. Is it constant or does it come and go?",
    speaker: "Doctor",
    speakerRole: "clinician",
    isClinical: true,
    confidenceScore: 0.97,
  },
  {
    id: "as5",
    startTime: 25,
    endTime: 33,
    text: "It's worse at night, especially when I'm trying to sleep.",
    speaker: "Patient",
    speakerRole: "patient",
    isClinical: true,
    confidenceScore: 0.91,
  },
  {
    id: "as6",
    startTime: 33,
    endTime: 38,
    text: "My daughter says I should try those special socks she saw online.",
    speaker: "Patient",
    speakerRole: "patient",
    isClinical: false,
    confidenceScore: 0.72,
    isRedacted: true,
    redactedReason: "Non-clinical reference",
  },
];

// Mock Clinical Moments for Ambient Mode
export const mockClinicalMoments: ClinicalMoment[] = [
  {
    id: "cm1",
    timestamp: 10,
    type: "symptom",
    content: "Tingling in feet - 2 weeks duration",
    confidence: 0.94,
    segmentId: "as3",
  },
  {
    id: "cm2",
    timestamp: 25,
    type: "symptom",
    content: "Symptoms worse at night",
    confidence: 0.91,
    segmentId: "as5",
  },
  {
    id: "cm3",
    timestamp: 18,
    type: "question",
    content: "Clinician inquired about symptom pattern",
    confidence: 0.97,
    segmentId: "as4",
  },
];

// Mock Clinician Style Profile
export const mockStyleProfile: ClinicianStyleProfile = {
  id: "sp1",
  clinicianId: "dr1",
  noteLength: "moderate",
  tone: "clinical",
  formatting: "structured",
  preferredTerminology: ["bilateral", "presents with", "denies", "endorses"],
  abbreviationPreference: "mixed",
  editHistory: [
    {
      id: "se1",
      timestamp: new Date("2024-01-10"),
      originalText: "The patient said",
      editedText: "Patient reports",
      type: "tone",
    },
    {
      id: "se2",
      timestamp: new Date("2024-01-12"),
      originalText: "blood pressure was normal",
      editedText: "BP 120/80 mmHg",
      type: "formatting",
    },
  ],
  learningProgress: 68,
};

// Mock Refinement Versions
export const mockRefinementVersions: RefinementVersion[] = [
  {
    id: "rv1",
    version: 1,
    timestamp: new Date("2024-01-15T09:00:00"),
    content: mockPreviousSummaries[0].content,
    changes: [],
    author: "ai",
  },
  {
    id: "rv2",
    version: 2,
    timestamp: new Date("2024-01-15T09:15:00"),
    content: mockPreviousSummaries[0].content.replace(
      "peripheral neuropathy",
      "diabetic peripheral neuropathy (DPN)",
    ),
    changes: [
      {
        id: "rc1",
        type: "diagnosis-clarification",
        originalText: "peripheral neuropathy",
        newText: "diabetic peripheral neuropathy (DPN)",
        reason: "Clarified diagnosis classification",
      },
    ],
    author: "ai",
  },
  {
    id: "rv3",
    version: 3,
    timestamp: new Date("2024-01-15T09:30:00"),
    content: mockPreviousSummaries[0].content.replace(
      "Follow-up in 4 weeks",
      "Return visit in 4 weeks to review B12 results and assess neuropathy progression",
    ),
    changes: [
      {
        id: "rc2",
        type: "plan-rewording",
        originalText: "Follow-up in 4 weeks",
        newText:
          "Return visit in 4 weeks to review B12 results and assess neuropathy progression",
        reason: "Added specific follow-up objectives",
      },
    ],
    author: "clinician",
  },
];

// Mock Quality Warnings
export const mockQualityWarnings: QualityWarning[] = [
  {
    id: "qw1",
    type: "overlapping-speech",
    message: "Overlapping speech detected - transcript may be incomplete",
    severity: "medium",
    affectedSegmentIds: ["s4"],
    timestamp: 25,
  },
  {
    id: "qw2",
    type: "background-noise",
    message: "Background noise affected transcription quality",
    severity: "low",
    affectedSegmentIds: ["s6"],
    timestamp: 45,
  },
];

// Mock Quality Warnings for poor audio scenario
export const mockPoorAudioWarnings: QualityWarning[] = [
  {
    id: "qwp1",
    type: "poor-audio",
    message: "Audio quality is poor - some segments may be inaccurate",
    severity: "high",
    affectedSegmentIds: ["s2", "s3", "s4"],
  },
  {
    id: "qwp2",
    type: "unclear-segment",
    message: "Unable to confidently transcribe this segment",
    severity: "high",
    affectedSegmentIds: ["s5"],
    timestamp: 38,
  },
];

// Mock Recent Transcriptions (enhanced with patient linking)
export const mockRecentTranscriptions: RecentTranscription[] = [
  {
    id: "rt1",
    title: "Sarah Johnson - Diabetic Follow-up - Neuropathy Symptoms",
    patientId: "p1",
    patientName: "Sarah Johnson",
    visitType: "follow-up",
    timestamp: new Date("2024-01-15T09:30:00"),
    duration: 420,
    status: "completed",
    hasQualityIssues: false,
  },
  {
    id: "rt2",
    title: "Michael Chen - Cardiology Check - Stable Angina Review",
    patientId: "p2",
    patientName: "Michael Chen",
    visitType: "follow-up",
    timestamp: new Date("2024-01-14T14:15:00"),
    duration: 540,
    status: "completed",
    hasQualityIssues: false,
  },
  {
    id: "rt3",
    title: "Emily Rodriguez - Mental Health Session - Anxiety Follow-up",
    patientId: "p3",
    patientName: "Emily Rodriguez",
    visitType: "mental-health",
    timestamp: new Date("2024-01-13T11:00:00"),
    duration: 1800,
    status: "completed",
    hasQualityIssues: false,
  },
  {
    id: "rt4",
    title: "James Thompson - Post-Discharge - COPD Review",
    patientId: "p4",
    patientName: "James Thompson",
    visitType: "post-op",
    timestamp: new Date("2024-01-12T16:45:00"),
    duration: 360,
    status: "completed",
    hasQualityIssues: true,
  },
  {
    id: "rt5",
    title: "Unlinked Session - Initial Consultation",
    patientId: undefined,
    patientName: undefined,
    visitType: "new-patient",
    timestamp: new Date("2024-01-11T10:00:00"),
    duration: 900,
    status: "completed",
    hasQualityIssues: false,
  },
];

// Visit Type Templates
export const visitTypeTemplates: Record<
  VisitType,
  { sections: string[]; focusAreas: string[] }
> = {
  "new-patient": {
    sections: [
      "Chief Complaint",
      "History of Present Illness",
      "Past Medical History",
      "Social History",
      "Family History",
      "Review of Systems",
      "Physical Examination",
      "Assessment",
      "Plan",
    ],
    focusAreas: [
      "Complete history",
      "Baseline vitals",
      "Allergies",
      "Medications",
    ],
  },
  "follow-up": {
    sections: [
      "Interval History",
      "Current Medications",
      "Vital Signs",
      "Focused Examination",
      "Assessment",
      "Plan",
    ],
    focusAreas: ["Symptom changes", "Medication adherence", "Lab results"],
  },
  "post-op": {
    sections: [
      "Procedure Review",
      "Post-operative Course",
      "Current Status",
      "Wound Assessment",
      "Plan",
    ],
    focusAreas: ["Complications", "Pain management", "Recovery progress"],
  },
  "mental-health": {
    sections: [
      "Mood Assessment",
      "Sleep/Appetite",
      "Medication Review",
      "Safety Assessment",
      "Therapeutic Progress",
      "Plan",
    ],
    focusAreas: [
      "Suicidal ideation",
      "Medication side effects",
      "Functional status",
    ],
  },
  urgent: {
    sections: [
      "Chief Complaint",
      "History of Present Illness",
      "Vital Signs",
      "Focused Examination",
      "Immediate Assessment",
      "Urgent Plan",
    ],
    focusAreas: ["Red flags", "Immediate interventions", "Disposition"],
  },
  routine: {
    sections: [
      "Health Maintenance",
      "Vital Signs",
      "Screening Review",
      "Assessment",
      "Preventive Care Plan",
    ],
    focusAreas: ["Screenings due", "Immunizations", "Lifestyle counseling"],
  },
  telehealth: {
    sections: [
      "Chief Complaint",
      "Interval History",
      "Patient-Reported Vitals",
      "Visual Assessment",
      "Assessment",
      "Plan",
    ],
    focusAreas: ["Limitations noted", "In-person follow-up needs"],
  },
};

// Conservative Trust Language Rules
export const trustLanguageRules = {
  avoidPhrases: [
    "definitely",
    "certainly",
    "clearly",
    "obviously",
    "must be",
    "is definitely",
  ],
  preferredPhrases: [
    "may suggest",
    "is consistent with",
    "could indicate",
    "appears to be",
    "likely represents",
    "consider",
  ],
  probabilisticPhrasing: {
    high: "findings strongly suggest",
    medium: "findings are consistent with",
    low: "consider the possibility of",
  },
};

// Mock Summary with conservative language
export const mockSOAPNote = `SUBJECTIVE:
Mrs. Sarah Johnson, a 45-year-old female with a history of Type 2 Diabetes Mellitus, presents for follow-up. She reports new-onset tingling sensation in bilateral feet for approximately 2 weeks, described as "pins and needles" primarily affecting the toes with occasional extension to the ankles. Symptoms appear to be worse at night. She also notes intermittent numbness and a subjective cold sensation in the feet. The patient confirms good medication compliance with Metformin 1000mg twice daily with meals.

OBJECTIVE:
(To be completed after examination)
- Vital signs: Pending
- Foot examination: Pending
- Monofilament test: Pending

ASSESSMENT:
1. Type 2 Diabetes Mellitus - on Metformin
2. New-onset bilateral lower extremity paresthesias - findings are consistent with diabetic peripheral neuropathy

Differential Diagnosis:
- Diabetic peripheral neuropathy (most likely given presentation)
- Peripheral vascular disease (consider given cold sensation)
- B12 deficiency secondary to Metformin use (should be excluded)

PLAN:
1. Order HbA1c to assess glycemic control
2. Perform comprehensive foot examination including monofilament testing
3. Order serum B12 level given long-term Metformin use
4. Consider nerve conduction studies if symptoms persist
5. Diabetes foot care education
6. Refer to diabetic foot clinic for preventive care
7. Follow-up in 4 weeks to review results and symptom progression`;

// Confidence Suppression Mock Data
export const mockSuppressedInsights: ClinicalInsight[] = [
  {
    id: "si1",
    type: "diagnosis",
    title: "Possible Charcot Foot",
    content: "Early Charcot neuroarthropathy cannot be excluded",
    confidence: "low",
    isSuppressed: true,
    suppressionReason:
      "Confidence score (32%) below threshold. Insufficient clinical evidence in transcript.",
    linkedSegmentIds: ["s4"],
  },
  {
    id: "si2",
    type: "finding",
    title: "Possible Vitamin D Deficiency",
    content: "May contribute to neuropathy symptoms",
    confidence: "low",
    isSuppressed: true,
    suppressionReason:
      "Confidence score (28%) below threshold. No direct evidence in patient report.",
    linkedSegmentIds: [],
  },
];
