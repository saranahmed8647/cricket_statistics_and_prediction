import itertools
import math
# from PlayerInfoScraper import get_past_matches
import statistics
import pandas as pd
# FOr importing ML model from file
import pickle

import json

import sys
df_batsman = pd.read_excel("batsmen.xlsx")
df_bowler = pd.read_excel("bowler.xlsx")
df_recent = pd.read_csv("Temp.csv")

# Loaded Models
Decision_Tree = pickle.load(open("DecisionTree_model.sav", 'rb'))

Gaussian = pickle.load(open("Gaussian_model.sav", 'rb'))

Logistic_regression = pickle.load(open("LogisticRegression_model.sav", 'rb'))

SVM_model = pickle.load(open("SVM_model.sav", 'rb'))
SVM_model_probability = pickle.load(open("SVM_model_with_Probability.sav", 'rb'))

best_players = []

def bowlers_score(bowlers_list):
    for bowler in bowlers_list:
        name_index = df_bowler[(df_bowler["Name"] == bowler["Name"]) & (df_bowler["Country"] == bowler["Country"])]
        if(len(name_index) == 0):
            bowler["bowler_score"] = 0
        else:
            innings = name_index.iloc[0]["Innings"] 
            matches = name_index.iloc[0]["Matches"]
            if((innings == "-") or (matches == "-") or (innings == "0") or (matches == "0")):
                u = 0
            else:
                u = (int(innings) / int(matches) )
                u = math.sqrt(u)
            
            five_wickets = name_index.iloc[0]["5 wickets in an innings"] 
            wickets = name_index.iloc[0]["Wickets"]
            if((five_wickets == "-") and (wickets == "-")):
                v = 0
            elif(five_wickets == "-"):
                v = (10 * 0) + int(wickets)
            elif(wickets == "-"):
                v = (10 * int(five_wickets))
            else:

                v = (10 * int(five_wickets)) + int(wickets)

            bowling_average = name_index.iloc[0]["Bowling Average"] 
            Economy = name_index.iloc[0]["Economy"]

            if((bowling_average == "-") or ( Economy == "-")):
                w = (0)
            else:
                
                w = (int(bowling_average)) * (int(Economy))

            if(w == 0):

                bowler_score = 0
            else:
                bowler_score = ((u * v) / w)

            bowler["bowler_score"] = bowler_score

    return(bowlers_list)


def batsmen_score(BatsmenList):
    for batsman in BatsmenList:
        # Main row from which we get current batsman's data
        name_index = df_batsman[(df_batsman["Name"] == batsman["Name"]) & (df_batsman["Country"] == batsman["Country"])]
        if(len(name_index) == 0):
            batsman["career_score"] = 0
        else:

            innings = name_index.iloc[0]["Innings"] 
            matches = name_index.iloc[0]["Matches"]
            if((innings == "-") or (matches == "-") or (innings == "0") or (matches == "0")):
                u = 0
            
            else:
            # Formula variable
                u = (int(innings) / int(matches))
            
            hundreds = name_index.iloc[0]["Hundreds"] 
            fiftys = name_index.iloc[0]["Fiftys"] 
            if((hundreds == "-") and (fiftys == "-")):
                v = 0    
            elif((hundreds == "0") and (fiftys == "0")):
                v = 0
            elif((hundreds == "-")):    
                v = (20 * 0) + (5 * int(fiftys))
            elif((fiftys == "-")):    
                v = (20 * int(hundreds)) + (5 * 0)
            # Formula variable
            else:

                v = (20 * int(hundreds)) + (5 * int(fiftys))
            
            Average = name_index.iloc[0]["Average"] 
            if((Average == "0") or (Average == "-")):
                w = (0.3 * v) + (0.7 * 0)
            else:    
            # Formula variable
                w = (0.3 * v) + (0.7 * int(Average))
            batting_score = (u * w)
            batsman["career_score"] = batting_score
            
        # getting recent scores , Now from Temp.csv
        # getting recent scores 
        results_list = df_recent[(df_recent["name"] == batsman["Name"]) & (df_recent["team1_name"] == batsman["Country"])]
        # results_list.drop_duplicates()
        # Past matches rows
        past_matches_array = []
        # Runs of past matches
        temp_past_runs = []
        if(len(results_list) == 0):
            for i in range(0,4):
                past_matches_array.append({"batting_runs" : "0"})
        elif(len(results_list)< 4):
            for i in range(0,4):
                past_matches_array.append(results_list.iloc[0])
        else:            
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




def Main(Team_A_1,Team_B_1,  ground, toss):
    Team_A = json.loads(Team_A_1)
    Team_B = json.loads(Team_B_1)
    
    bowlers_list_A = bowlers_score(Team_A)

    final_list_A = batsmen_score(bowlers_list_A)

    
# 6 Batsmen with highest batting score
    batsmen_list = []
    for i in range(0,6):
        batsmen_list.append(final_list_A[i])

    for i in range(6,len(final_list_A)):
        # Scores of batsmen in batsmen_list
        temp_list = []
        for k in batsmen_list:
            temp_list.append(k["batsmen_score"])
        # Compare to this for each new coming 
        min_batting_value = min(temp_list)
        min_index = temp_list.index(min_batting_value)
        if(final_list_A[i]["batsmen_score"] < min_batting_value):
            pass
        else:
            batsmen_list[min_index] = final_list_A[i]

# 5 Bowlers with highest bowling score
    bowlers_list = []
    for i in range(0,5):
        bowlers_list.append(final_list_A[i])

    for i in range(5,len(final_list_A)):
        # Scores of batsmen in batsmen_list
        temp_list = []
        for k in bowlers_list:
            temp_list.append(k["bowler_score"])
        # Compare to this for each new coming 
        min_bowling_value = min(temp_list)
        min_index = temp_list.index(min_bowling_value)
        if(final_list_A[i]["bowler_score"] < min_bowling_value):
            pass
        else:
            bowlers_list[min_index] = final_list_A[i]


    final_players_array = []

    for k in batsmen_list:
        final_players_array.append(k)
    for k in bowlers_list:
        final_players_array.append(k)
    # FOr Team B
    bowlers_list_B = bowlers_score(Team_B)
    Team_b_List_final = batsmen_score(bowlers_list_B)


    # Getting Team strength of this combination

    result_1 = Team_strength(final_players_array,Team_b_List_final)
# ..........................................
    # NOW FOR 6 BOWLERS AND 5 BATSMEN
#
    # 6 Batsmen with highest batting score
    batsmen_list_2 = []
    for i in range(0,5):
        batsmen_list_2.append(final_list_A[i])

    for i in range(5,len(final_list_A)):
        # Scores of batsmen in batsmen_list
        temp_list = []
        for k in batsmen_list_2:
            temp_list.append(k["batsmen_score"])
        # Compare to this for each new coming 
        min_batting_value = min(temp_list)
        min_index = temp_list.index(min_batting_value)
        if(final_list_A[i]["batsmen_score"] < min_batting_value):
            pass
        else:
            batsmen_list_2[min_index] = final_list_A[i]

# 6 Bowlers with highest bowling score
    bowlers_list_2 = []
    for i in range(0,6):
        bowlers_list_2.append(final_list_A[i])

    for i in range(6,len(final_list_A)):
        # Scores of batsmen in batsmen_list
        temp_list = []
        for k in bowlers_list_2:
            temp_list.append(k["bowler_score"])
        # Compare to this for each new coming 
        min_bowling_value = min(temp_list)
        min_index = temp_list.index(min_bowling_value)
        if(final_list_A[i]["bowler_score"] < min_bowling_value):
            pass
        else:
            bowlers_list_2[min_index] = final_list_A[i]


    final_players_array_2 = []

    for k in batsmen_list_2:
        final_players_array_2.append(k)
    for k in bowlers_list_2:
        final_players_array_2.append(k)

    # Getting Team strength of this combination

    result_2 = Team_strength(final_players_array_2,Team_b_List_final)

    # Now Making predictions with both team strengths:

        # Making Prediction : 

    # Ground and toss Values : 

    #Toss : teamA 1 /teamB 0
    # Ground : #teamA 0/ teamB 1/ neutral 2
    # 
    # Winner : # teamA 1/ teamB 0 #target 
    # Prediction data order : 
    # column_train=['ground','toss','strength']

# Array 1 Prediction Results
    data_array = [int(ground) , int(toss) , float(result_1)]
    
    # data_array = map(lambda x: float(x),data_array)
    new_arr = [data_array]

    prediction_name = Decision_Tree.predict(new_arr)
    prediction2_name = Gaussian.predict(new_arr)
    prediction3_name = Logistic_regression.predict(new_arr)
    prediction4_name = SVM_model_probability.predict(new_arr)
    
    prediction = Decision_Tree.predict_proba(new_arr)
    prediction2 = Gaussian.predict_proba(new_arr)
    prediction3 = Logistic_regression.predict_proba(new_arr)
    prediction4 = SVM_model_probability.predict_proba(new_arr)
    
    Team_1_winning_percentage = 0
    
    
    temp_label_1 = prediction2_name[0]
    winning_percentage_1 = 0
    if(temp_label_1 == 1):
        for k in prediction2:
            temp = (max(k))
            winning_percentage_1 = temp
    else:
        for k in prediction2:
            temp = (min(k))
            winning_percentage_1 = temp

    
    temp_label_2 = prediction3_name[0]
    winning_percentage_2 = 0
    if(temp_label_2 == 1):
        for k in prediction3:
            temp = (max(k))
            winning_percentage_2 = temp
    else:
        for k in prediction3:
            temp = (min(k))
            winning_percentage_2 = temp
    

    if(winning_percentage_1 > winning_percentage_2):
        Team_1_winning_percentage = winning_percentage_1
    else:
        Team_1_winning_percentage = winning_percentage_2

    # 2nd type Array results : 

    data_array = [int(ground) , int(toss) , float(result_2)]
    
    # data_array = map(lambda x: float(x),data_array)
    new_arr = [data_array]

    
    prediction2_name_2 = Gaussian.predict(new_arr)
    prediction3_name_2 = Logistic_regression.predict(new_arr)
    
    
    
    prediction2_2 = Gaussian.predict_proba(new_arr)
    prediction3_2 = Logistic_regression.predict_proba(new_arr)
    
    
    Team_2_winning_percentage = 0
    
    temp_label_1 = prediction2_name_2[0]
    winning_percentage_1_2 = 0
    if(temp_label_1 == 1):
        for k in prediction2_2:
            temp = (max(k))
            winning_percentage_1_2 = temp
    else:
        for k in prediction2_2:
            temp = (min(k))
            winning_percentage_1_2 = temp

    
    temp_label_2_2 = prediction3_name_2[0]
    winning_percentage_2_2 = 0
    if(temp_label_2_2 == 1):
        for k in prediction3_2:
            temp = (max(k))
            winning_percentage_2_2 = temp
    else:
        for k in prediction3_2:
            temp = (min(k))
            winning_percentage_2_2 = temp
    
    
    if(winning_percentage_1_2 > winning_percentage_2_2):
        Team_2_winning_percentage = winning_percentage_1_2
    else:
        Team_2_winning_percentage = winning_percentage_2_2
    
    if(Team_1_winning_percentage > Team_2_winning_percentage):
        # 1st combination has higher percentage
        
        print("Winning percentage : " + str(Team_1_winning_percentage * 100))

        for i in range(0,len(final_players_array)):
            if(i <= 5):
                print(final_players_array[i]["Name"] + " - - " + "Batsman")
            else:
                print(final_players_array[i]["Name"] + " - - " + "Bowler")
    else:
        # 2nd combination has higher percentage
        
        print("Winning percentage : " + str(Team_2_winning_percentage * 100))

        for i in range(0,len(final_players_array_2)):
            if(i <= 4):
                print(final_players_array_2[i]["Name"] + " - - " + "Batsman")
            else:
                print(final_players_array_2[i]["Name"] + " - - " + "Bowler")


team_1_list = sys.argv[1]
team_2_list = sys.argv[2]
venue = sys.argv[3]
toss = sys.argv[4]


Main(team_1_list, team_2_list,venue,toss)