 
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      a.setAttribute("style","max-height:210px;overflow-y:scroll;");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}


var disease = ['Prevention of Dental Caries', 'Vaginal Yeast Infection', 'Pertussis', 'Iron Deficiency Anemia', 'Acute Lymphoblastic Leukemia', 'Hypertensive Emergency', 'Hypoparathyroidism', 'Oppositional Defiant Disorde', 'Anaplastic Astrocytoma', 'Neck Pain', 'Leukocytoclastic Vasculitis', 'COPD, Acute', 'Heart Attack', 'Gastroparesis', 'Tardive Dyskinesia', "Still's Disease", 'Auditory Processing Disorde', "Addison's Disease", 'Hepatic Tum', 'Cold Symptoms', 'Hyperthyroidism', 'Arrhythmia', 'llicular Lymphoma', 'Prevention of Thromboembolism in Atrial Fibrillation', 'Oral and Dental Conditions', 'Malaria', 'Aspiration Pneumonia', 'Ascariasis', '27</span> users found this comment helpful.', 'Hairy Cell Leukemia', "Raynaud's Syndrome", 'Dermatitis Herpetiformis', 'Nausea/Vomiting, Postoperative', 'Zollinger-Ellison Syndrome', '64</span> users found this comment helpful.', 'Alcohol Withdrawal', '45</span> users found this comment helpful.', 'Mucositis', 'Peritonitis', 'Cardiovascular Risk Reduction', 'Diarrhea, Acute', 'Uveitis', 'Gingivitis', 'Pancreatic Exocrine Dysfunction', '48</span> users found this comment helpful.', 'ungal Infection Prophylaxis', 'Herpes Zoster, Prophylaxis', '43</span> users found this comment helpful.', 'Endometrial Hyperplasia, Prophylaxis', '21</span> users found this comment helpful.', 'Strep Throat', 'Pe', 'Conjunctivitis, Bacterial', 'Cataplexy', 'Uterine Fibroids', 'Lactose Intolerance', 'ailure to Thrive', 'Pre-Exposure Prophylaxis', 'Pruritus of Partial Biliary Obstruction', 'Sore Throat', 'Intraabdominal Infection', 'Sunburn', 'Rhinorrhea', 'Giardiasis', 'Postoperative Increased Intraocular Pressure', 'Burns, External', 'Diverticulitis', 'Mumps Prophylaxis', 'm Pain Disorde', 'Aphthous Ulce', 'Basal Cell Carcinoma', 'Sedation', 'Anemia, Sickle Cell', 'Muscle Spasm', 'Hepatitis C', 'Hemorrhoids', 'Head and Neck Cance', 'Osteoporosis', 'Herpes Simplex, Suppression', 'Generalized Anxiety Disorde', '92</span> users found this comment helpful.', 'Plaque Psoriasis', '79</span> users found this comment helpful.', 'Cough and Nasal Congestion', 'Carcinoid Tum', 'Breakthrough Pain', 'Immunosuppression', 'Dermatological Disorders', 'lic Acid Deficiency', 'Herpes Simplex, Mucocutaneous/Immunocompromised Host', 'Tuberculosis, Active', 'Neutropenia Associated with Chemotherapy', 'Abnormal Uterine Bleeding', 'Cold Sores', "Parkinson's Disease", 'Meningitis', '74</span> users found this comment helpful.', 'Subarachnoid Hemorrhage', 'Inflammatory Conditions', 'Candida Urinary Tract Infection', 'Expectoration', 'Angioedema', 'Dermatophytosis', 'Anemia', 'Warts', 'Edema', 'Intraocular Hypertension', 'Systemic Candidiasis', '22</span> users found this comment helpful.', 'Organ Transplant, Rejection Prophylaxis', 'Portal Hypertension', 'Ehrlichiosis', 'Depression', 'Menstrual Disorders', 'Amebiasis', 'Alcohol Dependence', 'Leukemia', 'AIDS Related Wasting', 'Gastritis/Duodenitis', 'Shift Work Sleep Disorde', 'Cutaneous Candidiasis', 'Diabetic Kidney Disease', 'Vulvodynia', 'Cutaneous T-cell Lymphoma', 'Diagnostic Bronchograms', 'Body Imaging', 'Restless Legs Syndrome', '99</span> users found this comment helpful.', 'Hyperparathyroidism Secondary to Renal Impairment', 'Hypercalcemia', 'Trigeminal Neuralgia', 'Multiple Endocrine Adenomas', 'Chronic Myelogenous Leukemia', 'Anesthesia', 'Opiate Adjunct', 'Mononucleosis', 'Strongyloidiasis', 'Hypertriglyceridemia', 'Glaucoma', 'Pulmonary Embolism', 'Schistosoma japonicum', '2</span> users found this comment helpful.', 'Lipodystrophy', 'Intermittent Explosive Disorde', 'Atrophic Vaginitis', 'Labor Pain', 'Anxiety and Stress', 'Gastric Cance', 'Seizure Prevention', 'Skin and Structure Infection', 'COPD', '146</span> users found this comment helpful.', '5</span> users found this comment helpful.', 'Adult Human Growth Hormone Deficiency', 'Tuberculosis, Prophylaxis', 'Tic Disorde', 'Wound Cleansing', 'Systemic Lupus Erythematosus', 'Head Lice', 'Schizophrenia', 'B12 Nutritional Deficiency', 'Glioblastoma Multiforme', '85</span> users found this comment helpful.', 'Brain Tum', 'Dissociative Identity Disorde', 'Hypotension', 'emale Infertility', 'Herpes Simplex Dendritic Keratitis', 'Atopic Dermatitis', 'Campylobacter Gastroenteritis', 'Binge Eating Disorde', 'Dermatologic Lesion', 'Herbal Supplementation', 'Pemphigus', 'Obstructive Sleep Apnea/Hypopnea Syndrome', 'NSAID-Induced Gastric Ulce', 'Constipation', 'Precocious Puberty', 'Interstitial Cystitis', 'Antiphospholipid Syndrome', "Turner's Syndrome", 'Pain', 'Conjunctivitis, Allergic', 'Chlamydia Infection', '32</span> users found this comment helpful.', 'Melanoma', 'Herpes Simplex', 'Allergies', 'Xerostomia', 'Primary Ovarian Failure', 'New Daily Persistent Headache', 'ge (amlodipine / valsartan)', 'Esophageal Variceal Hemorrhage Prophylaxis', 'Keratitis', 'SIADH', 'Left Ventricular Dysfunction', 'Hiccups', 'Women (oxybutynin)', 'Menopausal Disorders', 'Gastric Ulcer Maintenance Treatment', 'Periodic Limb Movement Disorde', 'Percutaneous Coronary Intervention', 'Women (minoxidil)', 'Meningococcal Meningitis Prophylaxis', 'Tuberculosis, Latent', 'Chronic Idiopathic Constipation', 'Manscaping Pain', 'Hypopituitarism', '61</span> users found this comment helpful.', 'Sciatica', '72</span> users found this comment helpful.', 'Myasthenia Gravis', 'Migraine Prevention', 'Extrapyramidal Reaction', 'Rhinitis', 'Hot Flashes', 'Myelofibrosis', 'Ventricular Fibrillation', 'Pulmonary Hypertension', 'Hydrocephalus', 'Nephrotic Syndrome', 'Bladder Infection', 'Dysuria', 'Tinea Versicol', 'Social Anxiety Disorde', 'Tinea Corporis', 'Myelodysplastic Syndrome', 'ICU Agitation', "Meniere's Disease", 'Nausea/Vomiting of Pregnancy', 'cal Segmental Glomerulosclerosis', 'Sinusitis', 't Care', 'Anemia Associated with Chronic Renal Failure', 'Gastrointestinal Stromal Tum', 'Bacterial Endocarditis Prevention', 'Urinary Tract Stones', 'Anal Itching', 'Onychomycosis, Fingernail', 'Chronic Pancreatitis', 'Smoking Cessation', 'Hypogonadism, Male', 'Cystic Fibrosis', 'Rheumatoid Arthritis', 'Atrial Fibrillation', "Crohn's Disease, Acute", 'Glaucoma/Intraocular Hypertension', 'Bullous Pemphigoid', 'Head Injury', 'mist (', 'Night Terrors', 'Secondary Cutaneous Bacterial Infections', 'Primary Hyperaldosteronism Diagnosis', 'Skin Disinfection, Preoperative', 'Transient Ischemic Attack', 'Bacterial Vaginitis', 'Dermatomyositis', "Barrett's Esophagus", 'Period Pain', 'Stomach Cance', 'Performance Anxiety', 'Short Stature', 'acial Wrinkles', 'CNS Magnetic Resonance Imaging', 'Prostatitis', 'Dumping Syndrome', 'Alpha-1 Proteinase Inhibitor Deficiency', 'Pelvic Inflammatory Disease', 'Vitamin D Deficiency', 'Cyclitis', 'Prevention of Bladder infection', 'Hypodermoclysis', 'Endometrial Cance', 'Bartonellosis', 'Hypokalemic Periodic Paralysis', 'Nonalcoholic Fatty Liver Disease', 'Non-Small Cell Lung Cance', 'actor IX Deficiency', 'Amenorrhea', 'Gonococcal Infection, Uncomplicated', 'Skin Cance', "Tourette's Syndrome", 'Ischemic Stroke, Prophylaxis', 'Diabetes, Type 1', 'Post-Cholecystectomy Diarrhea', 'Ocular Rosacea', '9</span> users found this comment helpful.', 'Hemophilia A', 'Hyperekplexia', 'AV Heart Block', 'Schizoaffective Disorde', 'Tinea Capitis', 'Thrombocytopenia', 'Mixed Connective Tissue Disease', 'Polycystic Ovary Syndrome', '121</span> users found this comment helpful.', '98</span> users found this comment helpful.', 'Cholera', 'Lactation Augmentation', 'Pemphigoid', 'Obsessive Compulsive Disorde', 'Enterocolitis', '94</span> users found this comment helpful.', 'Asthma, acute', 'Renal Cell Carcinoma', 'Onychomycosis, Toenail', 'Tinea Cruris', 'Delayed Puberty, Male', 'Stress Ulcer Prophylaxis', 'Submental Fullness', 'Juvenile Idiopathic Arthritis', '110</span> users found this comment helpful.', 'Premenstrual Dysphoric Disorde', 'Reflex Sympathetic Dystrophy Syndrome', '3</span> users found this comment helpful.', 'Ulcerative Colitis, Active', 'Peripheral T-cell Lymphoma', 'Hyperlipoproteinemia Type IV, Elevated VLDL', 'Deep Neck Infection', 'Sarcoidosis', 'Lewy Body Dementia'];

var medicine=['Clove', 'Motofen', 'Hemin', 'Rifampin', 'Hydrocortisone', 'Lamictal XR', 'Nucynta', 'Diastat', 'Lactulose', 'Lysteda', 'Betaseron', 'Glucophage XR', 'Vitamin B12', 'Nasarel', 'Ergocalciferol', 'Aliskiren', 'Zipsor', 'Urecholine', 'Oxycodone', 'Saphris', 'Nitrolingual Pumpspray', 'Dextrostat', 'Aluminum hydroxide / magnesium trisilicate', 'Istodax', 'Amantadine', 'Armodafinil', 'Ogen', 'Hydroxyurea', 'Cetuximab', 'Rayaldee', 'Hydrochlorothiazide / valsartan', 'Capzasin-HP', 'Arixtra', 'Percocet', 'Stiolto Respimat', 'Lyza', 'Promethazine DM', 'Nor-QD', 'Vagistat-1', 'Brimonidine / brinzolamide', 'Dupilumab', 'M-End PE', 'Monistat 7', 'Fexofenadine', 'Fluticasone', 'Axiron', 'Beyaz', 'Insulin glulisine', 'Temodar', 'Verelan', 'Ropinirole', 'Varubi', 'Avinza', 'Dextromethorphan / promethazine', 'Magnesium gluconate', 'Amevive', 'Chlorpheniramine / hydrocodone / pseudoephedrine', 'Hytrin', 'Hydrochlorothiazide', 'Rocaltrol', 'Royal jelly', 'Taclonex', 'Acitretin', 'Epinephrine', 'Octagam', 'IncobotulinumtoxinA', 'Loratadine-D 24 Hour', 'Perindopril', 'Chlordiazepoxide / clidinium', 'Uristat', 'Delatestryl', 'Alpha 1-proteinase inhibitor', 'Diethylpropion', 'Cataflam', 'Valturna', 'Loperamide', 'Acamprosate', 'Zafirlukast', 'Clinoril', 'Cyred', 'ReliOn / Novolin 70 / 30', 'Dextromethorphan / guaifenesin / phenylephrine', 'Invega Sustenna', 'Emtricitabine / rilpivirine / tenofovir alafenamide', 'Sovaldi', 'Bacitracin / neomycin / polymyxin b / pramoxine', 'Nizatidine', 'Pravachol', 'Soma Compound', 'Penlac', 'Mirabegron', 'Cabozantinib', 'Divalproex sodium', 'Senna Plus', 'Nitro-Bid', 'Daypro', 'Phenylephrine / pyrilamine', 'Griseofulvin', 'Norinyl 1+35', 'Ursodiol', 'Cobicistat / elvitegravir / emtricitabine / tenofovir', 'Dutasteride / tamsulosin', 'Chorionic gonadotropin (hcg)', 'Cisplatin', 'Ansaid', 'Ezetimibe / simvastatin', 'Memantine', 'Bendamustine', 'Conestat alfa', 'DermaZinc Shampoo', 'Teriflunomide', 'Fleet Glycerin Suppositories Adult', 'Remodulin', 'Benemid', 'Cedax', 'Amlodipine', 'Ibrance', 'Ventolin HFA', 'Docetaxel', 'Ampyra', 'Dronedarone', 'Firazyr', 'Demerol', 'Cinryze', 'Pro-Den Rx', 'Tolterodine', 'Bydureon', 'Bactroban', 'Buprenex', 'Temsirolimus', 'Acetaminophen / hydrocodone', 'Enbrel', 'Farxiga', 'Felbatol', 'Simeprevir', 'Epivir', 'Tylenol Arthritis Pain', 'Mexiletine', 'Effient', 'Novolin N', 'Aspirin / diphenhydramine', 'Oxcarbazepine', 'Butabarbital', 'Zetran', 'Adapalene / benzoyl peroxide', 'Catapres-TTS', 'Daclatasvir', 'Cyclizine', 'Medi-Quik Spray', 'Linagliptin', 'Debrox', 'Amoxil', 'Synvisc-One', "Lotrimin AF Athlete's Foot Powder", 'Cortisone', 'Proglycem', 'Selexipag', 'Ludiomil', 'Chlorhexidine', 'Narcan Injection', 'Beclomethasone', 'Vicks QlearQuil Nighttime Allergy Relief', 'Micon 7', 'GaviLyte-C', 'Topicort', 'Robaxin', 'All Day Allergy', 'Amlodipine / olmesartan', 'Ferralet 90', 'Targretin', 'Aldara', 'Belviq', 'Voltaren', 'Dilaudid', 'Tretin-X', 'Sulfacetamide sodium / sulfur', 'Sprix', 'Nasonex', 'Lisdexamfetamine', 'Peginterferon alfa-2a', 'Dantrium', 'Aspirin / butalbital / caffeine / codeine', 'Avita', 'Iluvien', 'Rytary', 'Ergomar', 'Maxaron Forte', 'Ticagrelor', 'Feraheme', 'Strattera', 'Dasatinib', 'Abilify Maintena', 'Vitafol Ultra', 'Amnesteem', 'Medium chain triglycerides', 'Olanzapine', 'Generess Fe', 'Oruvail', 'Olux', 'Rayos', 'Meprobamate', 'Silver sulfadiazine', 'Ranibizumab', 'Diphenhydramine / pseudoephedrine', 'Salvax Duo', 'Activella', 'Benzoyl peroxide / clindamycin', 'Naprelan', 'Phenazopyridine', 'Imotil', 'Rheumatrex Dose Pack', 'Prednisolone', 'Savaysa', 'Altace', 'Alfuzosin', 'Sodium bicarbonate', 'Alprazolam Intensol', 'Primidone', 'Droperidol', 'Beconase AQ', 'Fanapt', 'Zoladex', 'Vaprisol', 'Enzalutamide', 'Phentride', 'Golimumab', 'Dalteparin', 'Mepivacaine', 'Dulaglutide', 'Acetohydroxamic acid', 'Terazosin', 'Hycodan', 'Nepafenac', 'Somatropin', 'Rogaine', 'Tenuate', 'Tribenzor', 'Piroxicam', 'Systane Ultra', 'Silodosin', 'Hysingla ER', 'Sharobel', 'Migranal', 'Brinzolamide', 'Treanda', 'Phrenilin', 'Cipro', 'Daptomycin', 'Celebrex', 'Hyoscyamine / methenamine / methylene blue / phenyl salicylate', 'Hydroxychloroquine', 'Jalyn', 'Dicloxacillin', 'Latuda', 'Sucroferric oxyhydroxide', 'Mirvaso', 'Mepron', 'Metformin / sitagliptin', 'Multivitamin, prenatal', 'Tarka', 'Citric acid / magnesium oxide / sodium picosulfate', 'Imodium', 'Altabax', 'Veramyst', 'Deplin', 'Caduet', 'Microgestin 1.5 / 30', 'Combivent', 'Nostrilla', 'Codimal DM', 'Conjugated estrogens', 'Nucynta ER', 'Risperdal M-Tab', 'Welchol', 'Rea Lo 40', 'Absorbine Jr.', 'Intermezzo', 'Mylanta', 'Benzalkonium chloride / lidocaine', 'Pramosone', 'Nimodipine', 'Etanercept', 'Maxitrol', 'Copper', 'Humalog', 'Vivaglobin', 'Clomiphene', 'Mepolizumab', 'Lanoxicaps', 'Atelvia', 'Avar LS Cleanser', 'Ecallantide', 'Azacitidine', 'Flonase', 'Tev-Tropin', 'Calcium carbonate', 'Toujeo Solostar', 'Muse', 'Chlorambucil', 'PhosLo', 'femhrt', 'Naftifine', 'Xanax', 'Aggrenox', 'MetroGel', 'Loestrin 21 1 / 20', 'Hizentra', 'Byetta', 'Myleran', 'Gemfibrozil', 'Sulfatrim', 'Ustekinumab', 'Cesamet', 'Stribild', 'Westcort', 'Climara', 'Flurandrenolide', 'Allegra', 'Wal-finate', 'Lunesta', 'Lo / Ovral-28', 'Slow Fe', 'Pentothal', 'Actemra', 'Butoconazole', 'Pylera', 'Drysol', 'Picato', 'Orap', 'Goserelin', 'Mandelamine', 'Tudorza Pressair', 'Fansidar', 'Clarinex', 'Hydrocodone / pseudoephedrine', 'Jentadueto', 'Adempas', 'Briellyn', 'Desmopressin', 'Natroba', 'Ruconest', 'Paromomycin', 'Montelukast', 'Belladonna Tincture', 'Granisetron', 'Co-trimoxazole', 'Oleptro', 'Pomalyst', 'Trihexyphenidyl', 'Ramelteon', 'Ovide', 'DDAVP', 'Adzenys XR-ODT', 'Vicodin', 'Azelex', 'Semprex-D', 'Cetirizine / pseudoephedrine', 'Secukinumab', 'Divigel', 'Lenalidomide', 'Duet DHA', 'BC Fast Pain Relief', 'Olodaterol', 'Junel 1.5 / 30', 'Nolvadex', 'Atorvastatin', 'Phentermine / topiramate', 'Duoplant', 'Fioricet with Codeine', 'Anastrozole', 'Sodium biphosphate / sodium phosphate', 'Raspberry', "St. john's wort", 'Edex', 'Latanoprost', 'Reslizumab', 'Acyclovir', 'Oxistat', 'KneeRelief', 'Pomalidomide', 'Everolimus', 'Visine Original', 'Lorazepam Intensol', 'Bactrim DS', 'Gefitinib', 'Acrivastine / pseudoephedrine', 'Pyridostigmine', 'Gelusil', 'Xylocaine Jelly', 'Dabigatran', 'Septra DS', 'Caziant', 'Streptokinase', 'Repaglinide', 'Abatacept', 'Colazal', 'Aspirin / caffeine / orphenadrine', 'Sildenafil', 'Limbitrol DS', 'Chloraseptic Sore Throat Spray', 'Fenofibrate', 'Bifidobacterium infantis / lactobacillus acidophilus', 'Kemadrin', 'Limbrel', 'Brompheniramine / pseudoephedrine', 'Pyrimethamine / sulfadoxine', 'Naproxen / pseudoephedrine', 'Mono-Linyah', 'Nivolumab', 'Colchicine', 'Tetrahydrozoline', 'Peridex', 'Niraparib', 'Robitussin Cold Cough and Flu', 'Undecylenic acid', 'Dimethyl sulfoxide', 'Psorcon', 'Lotensin', 'Capzasin-P', 'Nature-Throid', 'Aczone', 'Intuniv', 'Esomeprazole', 'Penicillin v potassium', 'Tofranil', 'Coricidin HBP Cold & Flu', 'NeutraSal', 'Hydromet', 'Botox', 'Lacrisert', 'Minipress', 'Ortho-Cept', 'Enoxaparin', 'Corn Huskers Lotion', 'Esomeprazole / naproxen', 'Nalbuphine', 'Biotin', 'Maxidone', 'Euflexxa', 'Duloxetine', 'Ropivacaine', 'MiraLax'];






/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("Disease"), disease);
autocomplete(document.getElementById("Medicine"), medicine);
