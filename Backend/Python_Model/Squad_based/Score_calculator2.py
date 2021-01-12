import math
from PlayerInfoScraper import get_past_matches
import statistics
import pandas as pd
# FOr importing ML model from file
import pickle

import json






df_batsman = pd.read_excel("batsmen.xlsx")
df_bowler = pd.read_excel("bowler.xlsx")
df_recent = pd.read_csv("Temp.csv")

# Loaded Models
Decision_Tree = pickle.load(open("DecisionTree_model.sav", 'rb'))

Gaussian = pickle.load(open("Gaussian_model.sav", 'rb'))

Logistic_regression = pickle.load(open("LogisticRegression_model.sav", 'rb'))

SVM_model = pickle.load(open("SVM_model.sav", 'rb'))
SVM_model_probability = pickle.load(open("SVM_model_with_Probability.sav", 'rb'))

def bowlers_score(bowlers_list):
    for bowler in bowlers_list:
        name_index = df_bowler[(df_bowler["Name"] == bowler["Name"]) & (df_bowler["Country"] == bowler["Country"])]
        innings = name_index.iloc[0]["Innings"] 
        matches = name_index.iloc[0]["Matches"]
        
        u = (int(innings) / int(matches) )
        u = math.sqrt(u)
        
        five_wickets = name_index.iloc[0]["5 wickets in an innings"] 
        wickets = name_index.iloc[0]["Wickets"]
        
        v = (10 * int(five_wickets)) + int(wickets)

        bowling_average = name_index.iloc[0]["Bowling Average"] 
        Economy = name_index.iloc[0]["Economy"]

        w = (int(bowling_average)) * (int(Economy))

        if(w == 0):

            bowler_score = 0
        else:
            bowler_score = ((u * v) / w)

        bowler["bowler_score"] = bowler_score

    return(bowlers_list)


def Team_strength(Team_A,Team_B):
    for batsman in Team_A:
        batsman_score = batsman["batsmen_score"] / max(map(lambda batsman: batsman["batsmen_score"], Team_A))

        batsman["final_batsmen_score"] = batsman_score
    
        bowler_score = batsman["bowler_score"] / max(map(lambda batsman: batsman["bowler_score"], Team_A))

        batsman["final_bowler_score"] = bowler_score
    
    for batsman in Team_B:
        batsman_score = batsman["batsmen_score"] / max(map(lambda batsman: batsman["batsmen_score"], Team_B))

        batsman["final_batsmen_score"] = batsman_score
    
        bowler_score = batsman["bowler_score"] / max(map(lambda batsman: batsman["bowler_score"], Team_B))

        batsman["final_bowler_score"] = bowler_score
    
    
    # Bat strength A 
    Bat_strengthA = sum(map(lambda player: player["final_batsmen_score"], Team_A))
    # Bowl strength A 
    Bowl_strengthA = sum(map(lambda player: player["final_bowler_score"], Team_A))
    # Bat strength B
    Bat_strengthB = sum(map(lambda player: player["final_batsmen_score"], Team_B))
    # Bowl strength B
    Bowl_strengthB = sum(map(lambda player: player["final_bowler_score"], Team_B))


    total_strength = (Bat_strengthA / Bowl_strengthB) - (Bat_strengthB / Bowl_strengthA)

    return(total_strength)

def batsmen_score(BatsmenList):
    for batsman in BatsmenList:
        # Main row from which we get current batsman's data
        name_index = df_batsman[(df_batsman["Name"] == batsman["Name"]) & (df_batsman["Country"] == batsman["Country"])]
        innings = name_index.iloc[0]["Innings"] 
        matches = name_index.iloc[0]["Matches"]
        # Formula variable
        u = (int(innings) / int(matches))
        
        hundreds = name_index.iloc[0]["Hundreds"] 
        fiftys = name_index.iloc[0]["Fiftys"] 
        # Formula variable
        v = (20 * int(hundreds)) + (5 * int(fiftys))
        
        Average = name_index.iloc[0]["Average"] 
        # Formula variable
        w = (0.3 * v) + (0.7 * int(Average))
        batting_score = (u * w)
        batsman["career_score"] = batting_score
        
        # getting recent scores , Now from Temp.csv
        # getting recent scores 
        results_list = df_recent[(df_recent["name"] == batsman["Name"]) & (df_recent["team1_name"] == batsman["Country"])]
        results_list.drop_duplicates()
        # Past matches rows
        past_matches_array = []
        # Runs of past matches
        temp_past_runs = []        
        for k in range(len(results_list) - 4 , len(results_list)):
            past_matches_array.append(results_list.iloc[k])

        for k in past_matches_array:
            if("*" in k["batting_runs"]):
                temp_2 = k["batting_runs"].split("*")[0]
                temp_past_runs.append(int(temp_2))
            elif("-" in k["batting_runs"]):
                temp_past_runs.append(0)
            else:
                temp_past_runs.append(int(k["batting_runs"]))
        
        batsman["recent_score"] = statistics.mean(temp_past_runs)
    for batsman in BatsmenList:
        
        career_score = batsman["career_score"] / max(map(lambda batsman: batsman["career_score"], BatsmenList))
        batsman["final_career_score"] = career_score
        
        # Recent score last calculation
        recent_score = batsman["recent_score"] / max(map(lambda batsman: batsman["recent_score"], BatsmenList))
        batsman["final_recent_score"] = recent_score
        
        # Final Batsmen Score
        batsmen_score = (0.35 * batsman["final_career_score"]) + (0.65 * batsman["final_recent_score"])
        batsman["batsmen_score"] = batsmen_score
    return(BatsmenList)


def Main(Team_A,Team_B,ground, toss):
    temp_list_1 = json.loads(Team_A)
    temp_list_2 = json.loads(Team_B)
    # Team A
    bowlers_list_A = bowlers_score(temp_list_1)
    
    final_list_A = batsmen_score(bowlers_list_A)
    # Team B
    bowlers_list_B = bowlers_score(temp_list_2)
    final_list_B = batsmen_score(bowlers_list_B)

    result = Team_strength( final_list_B ,final_list_A)
    
    # Making Prediction : 

    # Ground and toss Values : 

    #Toss : teamA 1 /teamB 0
    # Ground : #teamA 0/ teamB 1/ neutral 2
    # 
    # Winner : # teamA 1/ teamB 0 #target 
    # Prediction data order : 
    # column_train=['ground','toss','strength']
    data_array = [ground , toss , result]
    new_arr = [data_array]
    prediction = Decision_Tree.predict_proba(new_arr)
    prediction2 = Gaussian.predict_proba(new_arr)
    prediction3 = Logistic_regression.predict_proba(new_arr)
    prediction4 = SVM_model_probability.predict_proba(new_arr)
    
    
    # print("Decision Tree .. ")
    for k in prediction:
        temp = (max(k))
        print(temp * 100)
    
    
    
    
    # print("Gaussian .. ")
    for k in prediction2:
        temp = (max(k))
        print(temp * 100)
    
    
    
    
    # print("Logistic .. ")
    for k in prediction3:
        temp = (max(k))
        print(temp * 100)
    
    
    
    # print("SVM .. ")
    for k in prediction4:
        temp = (max(k))
        print(temp * 100)
    

# temp_list_1 = [

# {
#         "Name" : "Scott Boland",        "Country" : "Australia"
#     },    {        "Name" : "Ben Cutting",        "Country" : "Australia"
#     }
  
# ]
# temp_list_2 = [

# {
#         "Name" : "Josh Hazlewood",        "Country" : "Australia"
#     },    {        "Name" : "Aaron Finch",    "Country" : "Australia"
#     }        
 
# ]


Main()